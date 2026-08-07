const categories = [
  { title: 'Best coffee', type: 'drink', note: 'Your daily ritual', places: [
    ['Copper Door Coffee Roasters', '7301 S. Santa Fe Dr.'], ['Lost Coffee Café & Coffee Roastery', '1190 W. Littleton Blvd.'], ['Enchanted Grounds Coffeehouse', '3615 W. Bowles Ave.'], ['Nixon\'s Coffee House', '6399 S. Santa Fe Dr.'], ['Wild Goose Coffee in Denver Seminary', '6399 S. Santa Fe Dr.'], ['Black Rock Coffee Bar – Broadway', '7961 S. Broadway'], ['iN-TEA', '2440 W. Main St.']
  ], tag: 'Most loved' },
  { title: 'Best Mexican & Latin', type: 'food', note: 'Big flavor, made close to home', places: [
    ['Los Portales Mexican Restaurant', '5350 S. Santa Fe Dr.'], ['El Lucero Salvadoran & Mexican Restaurant', '1500 W. Littleton Blvd. #110 A'], ['Don Juan\'s Mexican Grill', '3625 W. Bowles Ave.'], ['Cencalli Taqueria', 'Littleton, CO 80120'], ['Harley\'s: A Hot Dog Revolution', '1500 W. Littleton Blvd.'], ['Mi Cocina Express – Broadway', '137 W. County Line Road'], ['Old Santa Fe Express Mexican Grille', '1500 W. Littleton Blvd.'], ['Mama Sol Cafe', '6439 S. Broadway']
  ], tag: 'Hot category' },
  { title: 'Best pizza & Italian', type: 'food', note: 'A slice of the good life', places: [
    ['Old Fashioned Italian Deli', '395 W. Littleton Blvd.'], ['The Garlic Knot Pizza & Pasta', '1621 W. Canal Circle'], ['Jet\'s Pizza', '7935 S. Broadway'], ['Big Daddy\'s Pizza', '5829 S. Broadway'], ['Piccino Wood Oven Pizza', '5350 S. Santa Fe Dr.'], ['Romano\'s Italian Restaurant & Pizzeria', '5666 S. Windermere St.'], ['Walter\'s 303 Pizzeria & Publik House', '5194 S. Lowell Blvd.'], ['Angelo\'s Taverna', '6685 S. Santa Fe Dr.']
  ], tag: '' },
  { title: 'Best bar & grill', type: 'experience', note: 'Good food, good company', places: [
    ['Olde Towne Tavern', '2410 W. Main St.'], ['Black+Haus Tavern Littleton', '2439 W. Main St.'], ['Manning\'s Steaks and Spirits', '51 W. Dry Creek Ct.'], ['ViewHouse Littleton', '2680 W. Main St.'], ['Grande Station: A Social Bistro', '2299 W. Main St.'], ['Colorado Pinball Pub', '6209 S. Santa Fe Dr.'], ['Alibi\'s Bar & Grill', '7983 S. Broadway'], ['Celly\'s Bar and Grill in the Ice Ranch', '841 Southpark Dr.'], ['Cherry Cricket – Littleton', '819 W. Littleton Blvd.'], ['The Castle Bar & Grill', '6657 S. Broadway'], ['The 49th Food & Spirits – Littleton', '5350 S. Santa Fe Dr.']
  ], tag: '' },
  { title: 'Best global flavors', type: 'food', note: 'Take your taste buds somewhere new', places: [
    ['Zaika Indian Cuisine', '151 W. Mineral Ave.'], ['Haveli Indian Cuisine', '301 E. County Line Road'], ['PokeCo', '151 W. Mineral Ave.'], ['Wang\'s Gourmet', '12 E. Arapahoe Road'], ['Hibachi V Express', '7961B S. Broadway'], ['Pho Real', '2399 W. Main St.'], ['Sunflower Asian Café', '91 W. Mineral Ave.'], ['Sushi Basho', '2700 W. Bowles Ave.'], ['Smokin Fins – Littleton', '2575 W. Main St.']
  ], tag: '' },
  { title: 'Best neighborhood favorite', type: 'experience', note: 'The spots that feel like yours', places: [
    ['VinaMeals', '1500 W. Littleton Blvd. #110 A'], ['The Rusty Tapp Colorado BBQ & Catering', '311 E. County Line Road'], ['Fresh Market & Community Kitchen', '1500 W. Littleton Blvd.'], ['Breckenridge Brewery', '2890 Brewery Lane'], ['Brad\'s Pit BBQ', '5950 S. Platte Canyon Road'], ['Ted\'s Montana Grill', '7301 S. Santa Fe Dr.'], ['Latke Love', '699 W. Littleton Blvd.'], ['Momma\'s Kitchen', '1409 W. Littleton Blvd.'], ['Daddy\'s Chicken Shack®', '7330 S. Broadway'], ['Manna Bakery & Deli', '6905 S. Broadway'], ['The Chocolate Therapist', '2560 W. Main St.'], ['Playa Bowls', '2490 W. Main St.'], ['Café Terracotta', '5649 S. Curtice St.'], ['4G\'s at Columbine', '5950 S. Platte Canyon Road']
  ], tag: '' }
];

const grid = document.querySelector('#categoryGrid');
const search = document.querySelector('#searchInput');
const filters = document.querySelectorAll('.filter');
const voted = new Map();

function render() {
  const query = search.value.toLowerCase().trim();
  const active = document.querySelector('.filter.active').dataset.filter;
  grid.innerHTML = categories.filter(category => {
    const matchesType = active === 'all' || category.type === active;
    const matchesSearch = !query || `${category.title} ${category.places.flat().join(' ')}`.toLowerCase().includes(query);
    return matchesType && matchesSearch;
  }).map((category, index) => `
    <article class="category-card">
      <span class="category-type">${category.type}</span><span class="card-tag">${category.tag}</span>
      <h3>${category.title}</h3><p>${category.note}</p>
      <div class="restaurant-list">
        ${category.places.map(([name, address]) => `<button class="restaurant-option ${voted.get(category.title) === name ? 'voted' : ''}" data-category="${category.title}" data-place="${name}"><span><b>${name}</b><small>${address}, Littleton, CO</small></span><i class="vote-dot">${voted.get(category.title) === name ? '✓' : ''}</i></button>`).join('')}
      </div>
    </article>`).join('');
  document.querySelector('#voteCount').textContent = `${voted.size} of ${categories.length}`;
  document.querySelector('#progressBar').style.width = `${(voted.size / categories.length) * 100}%`;
  grid.querySelectorAll('.restaurant-option').forEach(button => button.addEventListener('click', () => {
    voted.set(button.dataset.category, button.dataset.place);
    render();
    const toast = document.querySelector('#toast');
    toast.classList.add('show');
    window.clearTimeout(window.toastTimer);
    window.toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1800);
  }));
}

filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
  render();
}));
search.addEventListener('input', render);
document.querySelector('#headerVote').addEventListener('click', () => document.querySelector('#categories').scrollIntoView({ behavior: 'smooth' }));
render();
