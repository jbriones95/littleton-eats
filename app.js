const categories = [
  { title: 'Coffee & Tea', type: 'drink', note: 'Your daily ritual', places: [
    ['Copper Door Coffee Roasters', '7301 S. Santa Fe Dr.'], ['Lost Coffee Café & Coffee Roastery', '1190 W. Littleton Blvd.'], ['Enchanted Grounds Coffeehouse', '3615 W. Bowles Ave.'], ['Nixon\'s Coffee House', '6399 S. Santa Fe Dr.'], ['Wild Goose Coffee in Denver Seminary', '6399 S. Santa Fe Dr.'], ['Black Rock Coffee Bar - Broadway', '7961 S. Broadway'], ['iN-TEA', '2440 W. Main St.'], ['DIRT Coffee Bar', '2506 W. Alamo Ave.']
  ], tag: 'Most loved' },
  { title: 'Mexican', type: 'food', note: 'Big flavor, made close to home', places: [
    ['Los Portales Mexican Restaurant', '5350 S. Santa Fe Dr.'], ['El Lucero Salvadoran & Mexican Restaurant', '1500 W. Littleton Blvd. #110 A'], ['Don Juan\'s Mexican Grill', '3625 W. Bowles Ave.'], ['Cencalli Taqueria', 'Littleton, CO 80120'], ['Harley\'s: A Hot Dog Revolution', '1500 W. Littleton Blvd.'], ['Mi Cocina Express - Broadway', '137 W. County Line Road'], ['Old Santa Fe Express Mexican Grille', '1500 W. Littleton Blvd.'], ['Mama Sol Cafe', '6439 S. Broadway'], ['4G\'s at Columbine', '5950 S. Platte Canyon Road'], ['The Alley: Mountain Mexican', '2420 W. Main St.'], ['Pàlenque Cocina Y Agaveria', '2609 W. Main St.'], ['Taco House', '1390 W. Littleton Blvd.']
  ], tag: 'Hot category' },
  { title: 'Pizza & Italian', type: 'food', note: 'A slice of the good life', places: [
    ['Old Fashioned Italian Deli', '395 W. Littleton Blvd.'], ['The Garlic Knot Pizza & Pasta', '1621 W. Canal Circle'], ['Big Daddy\'s Pizza', '5829 S. Broadway'], ['Piccino Wood Oven Pizza', '5350 S. Santa Fe Dr.'], ['Romano\'s Italian Restaurant & Pizzeria', '5666 S. Windermere St.'], ['Walter\'s 303 Pizzeria & Publik House', '5194 S. Lowell Blvd.'], ['Anthony\'s Pizza & Pasta', '2610 W. Belleview Ave.'], ['Angelo\'s Taverna', '6685 S. Santa Fe Dr.'], ['Colore Italian', '5950 S. Platte Canyon Rd. # A1']
  ], tag: '' },
  { title: 'Bars & Burgers', type: 'experience', note: 'Good food, good company', places: [
    ['Olde Towne Tavern', '2410 W. Main St.'], ['Black+Haus Tavern Littleton', '2439 W. Main St.'], ['Manning\'s Steaks and Spirits', '51 W. Dry Creek Ct.'], ['Grande Station: A Social Bistro', '2299 W. Main St.'], ['Colorado Pinball Pub', '6209 S. Santa Fe Dr.'], ['Alibi\'s Bar & Grill', '7983 S. Broadway'], ['Celly\'s Bar and Grill in the Ice Ranch', '841 Southpark Dr.'], ['Cherry Cricket - Littleton', '819 W. Littleton Blvd.'], ['The Castle Bar & Grill', '6657 S. Broadway'], ['The 49th Food & Spirits - Littleton', '5350 S. Santa Fe Dr.'], ['Breckenridge Brewery', '2890 Brewery Lane']
  ], tag: '' },
  { title: 'American Style', type: 'food', note: 'Classic American plates', places: [
    ['The Rusty Tapp Colorado BBQ & Catering', '311 E. County Line Road'], ['Brad\'s Pit BBQ', '5950 S. Platte Canyon Road'], ['Ted\'s Montana Grill', '7301 S. Santa Fe Dr.'], ['ViewHouse Littleton', '2680 W. Main St.'], ['The Melting Pot', '2707 W. Main St.'], ['Bistro 36 Drinkery and Eatery', '2620 W. Belleview Ave.']
  ], tag: '' },
  { title: 'Asian', type: 'food', note: 'Take your taste buds somewhere new', places: [
    ['Zaika Indian Cuisine', '151 W. Mineral Ave.'], ['Haveli Indian Cuisine', '301 E. County Line Road'], ['PokeCo', '151 W. Mineral Ave.'], ['Wang\'s Gourmet', '12 E. Arapahoe Road'], ['Sunflower Asian Café', '91 W. Mineral Ave.'], ['Wild Ginger Thai Restaurant', '399 W. Littleton Blvd.'], ['Yummy Station', '1140 W. Littleton Blvd.']
  ], tag: '' },
  { title: 'Seafood & Japanese', type: 'food', note: 'Sushi, hibachi, and more', places: [
    ['Hibachi V Express', '7961B S. Broadway'], ['Sushi Basho', '2700 W. Bowles Ave.'], ['Makizushico', '5950 S. Platte Canyon Rd. D23'], ['JP Nori Sushi & Asian Cuisine', '5302 S. Federal Circle'], ['Ninja Sushi', '7923 S. Broadway'], ['Smokin Fins - Littleton', '2575 W. Main St.']
  ], tag: '' },
  { title: 'Breakfast', type: 'food', note: 'Start the day right', places: [
    ['Latke Love', '699 W. Littleton Blvd.'], ['Momma\'s Kitchen', '1409 W. Littleton Blvd.'], ['Blend Nutrition', '191 W. Mineral Ave.'], ['Toast Fine Food & Coffee', '2630 W. Belleview Ave.'], ['NoNo\'s Cafe', '3005 W. County Line Road'], ['Bacon Social House', '2100 W. Littleton Blvd.'], ["Louis' Diner", '1500 W. Littleton Blvd.'], ['Chez Lizeth Creperie', '5856 S. Lowell Blvd. #28']
  ], tag: '' },
  { title: 'Bakeries and Sweets', type: 'food', note: 'A little something sweet', places: [
    ['Manna Bakery & Deli', '6905 S. Broadway'], ['The Chocolate Therapist', '2560 W. Main St.'], ['Playa Bowls', '2490 W. Main St.'], ['Café Terracotta', '5649 S. Curtice St.'], ['Butterscotch Grove Bakery', '7301 S. Santa Fe Dr. #625'], ['Hearth Bakery', '5610 S. Curtice St'], ['Born2Bake', '2540 W. Main St.']
  ], tag: '' },
  { title: 'Ice Cream', type: 'food', note: 'Cold, sweet, and local', places: [
    ['Little Man Ice Cream', '2449 W. Main St.'], ['Inside Scoop Creamery', '5654 S. Prince St.']
  ], tag: '' },
  { title: 'Fast-casual', type: 'experience', note: 'Quick, easy, and worth the stop', places: [
    ['The Rusty Tapp Colorado BBQ & Catering', '311 E. County Line Road'], ['Brad\'s Pit BBQ', '5950 S. Platte Canyon Road'], ['Ted\'s Montana Grill', '7301 S. Santa Fe Dr.'], ['Port of Subs', '40 W. Littleton Blvd. #204A'], ['Vibe Foods Superfood Bar', '7301 S. Santa Fe Dr.'], ["Snarf's Sandwiches", '2700 W. Bowles Ave. Suite B']
  ], tag: '' },
  { title: 'Vietnamese', type: 'food', note: 'Comfort in a bowl', places: [
    ['Pho Real', '2399 W. Main St.'], ['Pho Littleton', '389 W. Littleton Blvd.'], ['Pho 99 Vietnamese Noodles & Grill', '211 E. County Line Road'], ['Pho Broadway', '6645 S. Broadway'], ['VinaMeals', '1500 W. Littleton Blvd. #110 A']
  ], tag: '' },
  { title: 'Mediterranean', type: 'food', note: 'Grilled, herby, and bright', places: [
    ['Hujra Kebab & Gyros', '2897 W. Belleview Ave. A'], ['Gyros Town Grill', '1399 W. Littleton Blvd.'], ['Fresh Market & Community Kitchen', '1500 W. Littleton Blvd.']
  ], tag: '' }
];

const grid = document.querySelector('#categoryGrid');
const orders = new Map();
const rankedCategories = new Set();
let draggedRestaurant = null;
const storageKey = 'littleton-eats-rankings-v1';
const apiUrl = window.LITTLETON_EATS_API || '';

try {
  const savedOrders = JSON.parse(localStorage.getItem(storageKey) || '{}');
  Object.entries(savedOrders).forEach(([category, order]) => {
    const categoryData = categories.find(item => item.title === category);
    if (!categoryData || !Array.isArray(order)) return;
    const available = new Set(categoryData.places.map(([name]) => name));
    const validOrder = order.filter(name => available.has(name));
    const missing = categoryData.places.map(([name]) => name).filter(name => !validOrder.includes(name));
    const normalizedOrder = [...validOrder, ...missing];
    if (normalizedOrder.length) {
      orders.set(category, normalizedOrder);
      rankedCategories.add(category);
    }
  });
} catch {
  // Local storage can be unavailable in private browsing.
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.lastChild.textContent = ` ${message}`;
  toast.classList.add('show');
  window.clearTimeout(window.toastTimer);
  window.toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1800);
}

function render() {
  grid.innerHTML = categories.slice().sort((a, b) => b.places.length - a.places.length).map(category => {
    const originalPlaces = category.places.map(([name]) => name);
    const orderedNames = orders.get(category.title) || originalPlaces;
    const places = orderedNames.map(name => category.places.find(([place]) => place === name));
    return `
    <article class="category-card">
      <h3>${category.title}</h3>
      <div class="restaurant-list">
        ${places.map(([name, address], index) => `<div class="restaurant-option" draggable="true" data-category="${category.title}" data-place="${name}" data-index="${index}">
          <span class="drag-handle" aria-hidden="true">☷</span>
          <span class="rank-number">${index + 1}</span>
          <span class="restaurant-name"><b>${name}</b><small>${address}, Littleton, CO</small></span>
        </div>`).join('')}
      </div>
    </article>`;
  }).join('');
  document.querySelector('#voteCount').textContent = `${rankedCategories.size} of ${categories.length}`;
  document.querySelector('#progressBar').style.width = `${(rankedCategories.size / categories.length) * 100}%`;
  grid.querySelectorAll('.restaurant-option').forEach(row => {
    row.addEventListener('dragstart', event => {
      draggedRestaurant = { category: row.dataset.category, name: row.dataset.place };
      row.classList.add('dragging');
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', row.dataset.place);
    });
    row.addEventListener('dragover', event => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      row.classList.add('drag-over');
    });
    row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
    row.addEventListener('dragend', () => {
      row.classList.remove('dragging');
      grid.querySelectorAll('.restaurant-option').forEach(item => item.classList.remove('drag-over'));
      draggedRestaurant = null;
    });
    row.addEventListener('drop', event => {
      event.preventDefault();
      if (!draggedRestaurant || draggedRestaurant.category !== row.dataset.category || draggedRestaurant.name === row.dataset.place) return;
      const category = categories.find(item => item.title === row.dataset.category);
      const order = orders.get(category.title) || category.places.map(([name]) => name);
      const fromIndex = order.indexOf(draggedRestaurant.name);
      const toIndex = order.indexOf(row.dataset.place);
      order.splice(fromIndex, 1);
      order.splice(fromIndex < toIndex ? toIndex - 1 : toIndex, 0, draggedRestaurant.name);
      orders.set(category.title, order);
      rankedCategories.add(category.title);
      render();
      showToast('Order updated');
    });
  });
}

document.querySelector('#headerVote').addEventListener('click', () => document.querySelector('#categories').scrollIntoView({ behavior: 'smooth' }));
document.querySelector('#saveRankings').addEventListener('click', async () => {
  if (!orders.size) return showToast('Drag restaurants into order first');
  orders.forEach((_, category) => rankedCategories.add(category));
  const payload = Object.fromEntries(orders);
  try {
    localStorage.setItem(storageKey, JSON.stringify(payload));
  } catch {
    // The ranking still works for this session if storage is unavailable.
  }
  if (!apiUrl) return showToast('Rankings saved on this device');
  try {
    const response = await fetch(`${apiUrl}/api/rankings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rankings: payload })
    });
    if (response.status === 409) return showToast('A ranking was already submitted here');
    if (!response.ok) throw new Error('Vote submission failed');
    showToast('Ranking submitted');
  } catch {
    showToast('Could not submit ranking');
  }
  render();
});
render();
