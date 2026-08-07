const allowedOrigin = 'https://jbriones95.github.io';

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin === allowedOrigin ? origin : allowedOrigin,
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };
}

function response(body, status, origin) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(origin) });
}

async function hashIp(ip, secret) {
  const bytes = new TextEncoder().encode(`${secret}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function aggregateRankings(rows) {
  const submissionTotals = new Map();
  rows.forEach(row => {
    const key = `${row.submission_id}:${row.category}`;
    submissionTotals.set(key, Math.max(submissionTotals.get(key) || 0, row.rank));
  });

  const categories = new Map();
  rows.forEach(row => {
    const total = submissionTotals.get(`${row.submission_id}:${row.category}`) || 1;
    let category = categories.get(row.category);
    if (!category) {
      category = { voters: new Set(), restaurants: new Map() };
      categories.set(row.category, category);
    }
    category.voters.add(row.submission_id);
    let restaurant = category.restaurants.get(row.restaurant);
    if (!restaurant) {
      restaurant = { votes: 0, rankTotal: 0, score: 0 };
      category.restaurants.set(row.restaurant, restaurant);
    }
    restaurant.votes += 1;
    restaurant.rankTotal += row.rank;
    restaurant.score += total === 1 ? 1 : (total - row.rank + 1) / total;
  });

  return [...categories.entries()].map(([category, data]) => ({
    category,
    voters: data.voters.size,
    restaurants: [...data.restaurants.entries()]
      .sort(([, left], [, right]) => right.score - left.score || left.rankTotal / left.votes - right.rankTotal / right.votes)
      .map(([name, restaurant]) => ({
        name,
        votes: restaurant.votes,
        averageRank: Math.round((restaurant.rankTotal / restaurant.votes) * 10) / 10
      }))
  }));
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (origin && origin !== allowedOrigin) return response({ error: 'Origin not allowed' }, 403, origin);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(origin) });
    if (new URL(request.url).pathname !== '/api/rankings') return response({ error: 'Not found' }, 404, origin);
    if (request.method === 'GET') {
      const { results } = await env.DB.prepare('SELECT submission_id, category, restaurant, rank FROM rankings ORDER BY category, rank').all();
      return response({ categories: aggregateRankings(results || []) }, 200, origin);
    }
    if (request.method !== 'POST') return response({ error: 'Not found' }, 404, origin);

    const ip = request.headers.get('CF-Connecting-IP');
    if (!ip) return response({ error: 'Unable to identify request' }, 400, origin);
    if (!env.IP_HASH_SECRET) return response({ error: 'Vote service is not configured' }, 503, origin);

    let body;
    try {
      body = await request.json();
    } catch {
      return response({ error: 'Invalid JSON' }, 400, origin);
    }

    const rankings = body?.rankings;
    if (!rankings || typeof rankings !== 'object' || Array.isArray(rankings)) return response({ error: 'Rankings are required' }, 400, origin);
    const entries = Object.entries(rankings);
    if (!entries.length || entries.length > 20) return response({ error: 'Invalid ranking categories' }, 400, origin);
    for (const [category, restaurants] of entries) {
      if (typeof category !== 'string' || !Array.isArray(restaurants) || !restaurants.length || restaurants.length > 100) return response({ error: 'Invalid ranking order' }, 400, origin);
      if (restaurants.some(restaurant => typeof restaurant !== 'string' || restaurant.length > 200) || new Set(restaurants).size !== restaurants.length) return response({ error: 'Invalid restaurant order' }, 400, origin);
    }

    const ipHash = await hashIp(ip, env.IP_HASH_SECRET);
    const existing = await env.DB.prepare('SELECT id FROM vote_submissions WHERE ip_hash = ?').bind(ipHash).first();
    if (existing) return response({ error: 'A ranking has already been submitted from this network' }, 409, origin);

    const submissionId = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const statements = [env.DB.prepare('INSERT INTO vote_submissions (id, ip_hash, created_at) VALUES (?, ?, ?)').bind(submissionId, ipHash, createdAt)];
    for (const [category, restaurants] of entries) {
      restaurants.forEach((restaurant, index) => {
        statements.push(env.DB.prepare('INSERT INTO rankings (submission_id, category, restaurant, rank) VALUES (?, ?, ?, ?)').bind(submissionId, category, restaurant, index + 1));
      });
    }
    await env.DB.batch(statements);
    return response({ ok: true }, 201, origin);
  }
};
