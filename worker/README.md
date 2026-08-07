# Littleton Eats vote API

This Worker stores one complete ranking per hashed Cloudflare IP address. It does not store raw IP addresses. The D1 database stores the ranking rows and a salted SHA-256 IP hash.

## Deploy

1. Install Wrangler with `npm install --save-dev wrangler`.
2. Run `npx wrangler login`.
3. Create the database with `npx wrangler d1 create littleton-eats-votes`.
4. Copy the returned database ID into `wrangler.toml`.
5. Apply the schema with `npx wrangler d1 execute littleton-eats-votes --remote --file=schema.sql`.
6. Replace `IP_HASH_SECRET` with a long random value. For production, use `npx wrangler secret put IP_HASH_SECRET` and remove the value from `wrangler.toml`.
7. Deploy with `npx wrangler deploy`.
8. Set `window.LITTLETON_EATS_API` in the Pages site to the deployed Worker URL.

IP-based protection is a rate limit, not identity verification. People on the same network may share an IP, and VPNs or mobile networks can change it. For stronger protection, add email verification or Turnstile before accepting a ranking.
