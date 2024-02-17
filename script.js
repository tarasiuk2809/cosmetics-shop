const items = [
    {
      title: "Bioderma sensibio H2O",
      description: "Мицеллярная вода очищающая для чувствительной кожи флакон-помпа ",
      tags: ["new"],
      price: 91.16,
      img: './img/bioderma.webp',
      category: 'face',
    },
    {
      title: "EAU THERMALE AVENE Tolerance",
      description: "Мягкий очищающий лосьон",
      tags: [''],
      price: 51.20,
      img: './img/avene.webp',
      category: 'face',
    },
    {
      title: "L'Oreal Professionnel Shampoo Serie Expert Absolut Repair",
      description: "Шампунь для восстановления поврежденных волос ",
      tags: [""],
      price: 50.46,
      img: './img/loreal.webp',
      category: 'hair',
    },
    {
      title: " Ligne St. Barth ROUCOU TANNING OIL LOW PROTECTION",
      description: "Масло помадного дерева SPF 6 для тела",
      tags: ["new"],
      price: 219.58,
      img: './img/body-oil.webp',
      category: 'body',
    },
    {
      title: "La Sultane de Saba ROSE",
      description: "Бальзам для тела",
      tags: [""],
      price: 331.80,
      img: './img/la-sultan-de-saba-rose.webp',
      category: 'body',
    },
    {
      title: "NEEDLY Ampoule real active panthenol",
      description: "Увлажняющая сыворотка с пантенолом для лица ",
      tags: ["new"],
      price: 77.47,
      img: './img/needly-real-active.webp',
      category: 'face',
    },
    {
      title: "Matrix HIGH AMPLIFY",
      description: "Спрей для прикорневого объема ",
      tags: ['hit'],
      price: 65.40,
      img: './img/matrix.webp',
      category: 'hair',
    },
    {
      title: "L'Oreal Professionnel Conditioner Serie Expert Absolut Repair",
      description: "Кондиционер для восстановления поврежденных волос",
      tags: [""],
      price: 45.00,
      img: './img/loreal-conditioner.webp',
      category: 'hair',
    },
    {
      title: "Bioderma Atoderm Shower Oil",
      description: "Масло для душа",
      tags: ["hit"],
      price: 53.06,
      img: './img/bioderma-oil.webp',
      category: 'body',
    }
  ]
  
  const template = document.querySelector('#item-template');
  const shopItems = document.querySelector('#shop-items');
  const searchBtn = document.querySelector('#search-btn');
  const searchInput = document.querySelector('#search-input');
  const textNotFound = document.querySelector('#nothing-found');
  const sortControl = document.querySelector('#category-filtering');
  const filterControl = document.querySelector('#filtering');
  const logoLink = document.querySelector('.logo');
  
  function prepareTags(tag) {
    const element = document.createElement('span');
    element.classList.add('tag');
    element.textContent = tag;
    return element;
  }
  
  function prepareItem(item) {
    const clone = template.content.cloneNode(true);
    clone.querySelector('h1').textContent = item.title;
    clone.querySelector('p').textContent = item.description;
    clone.querySelector('span').textContent = `${item.price}Р`;
    clone.querySelector('img').src = item.img;
  
    const allTags = clone.querySelector('.tags');
  
    item.tags.forEach((tag) => {
      if (tag !== '') {
        allTags.append(prepareTags(tag));
      }
  
    });
  
    return clone;
  }
  
  
  function selectingCategory(selectedOption) {
    if (selectedOption == '') {
      shopItems.innerHTML = '';
      for (let item of items) {
        shopItems.append(prepareItem(item));
      }
    }
    else {
      shopItems.innerHTML = '';
      for (let item of currentState) {
        if (item.category == selectedOption) {
          shopItems.append(prepareItem(item));
        }
        currentState = currentState.filter((item) => item.category === selectedOption);
      }
    }
    if (currentState.length==0){
        textNotFound.textContent = 'Ничего не найдено';
      }
  }
  
  function searchItem(items, searchInput, textNotFound) {
    shopItems.innerHTML = '';
    textNotFound.textContent = '';
    currentState = [];
  
    let search = searchInput.value;
    search = search.trim().toLowerCase();
  
    for (let item of items) {
      let description = item.description;
      let title = item.title;
      description = description.toLowerCase().trim();
      title = title.toLowerCase().trim();
      if (description.includes(search) || title.includes(search)) {
        shopItems.append(prepareItem(item));
        currentState.push(item);
      }
    }
    if (shopItems.textContent == '') {
      textNotFound.textContent = 'Ничего не найдено';
    }
    searchInput.value = '';
  }
  
  function sortByAlphabet(a, b) {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  }
  
  
  function filteringItems(selectedFilter) {
    shopItems.innerHTML = '';
    textNotFound.textContent = '';
    switch (selectedFilter) {
      case 'expensive':
        currentState.sort((a, b) => b.price - a.price);
        break;
      case 'cheap':
        currentState.sort((a, b) => a.price - b.price);
        break;
      case 'alphabet':
        currentState.sort((a, b) => sortByAlphabet(a, b));
        break;
      case 'new':
        currentState = currentState.filter((item) => item.tags.includes('new'));
        if (currentState.length==0){
          textNotFound.textContent = 'Ничего не найдено';
        }
        break;
    }
    for (let item of currentState) {
      shopItems.append(prepareItem(item));
    }
  }
  
  function renewCatalog() {
    currentState = [];
    shopItems.innerHTML = '';
    for (let item of items) {
      shopItems.append(prepareItem(item));
      currentState = [...items];
    }
  }
  
  let currentState = [...items];
  renewCatalog();
  
  logoLink.addEventListener('click', () => renewCatalog());
  
  sortControl.addEventListener('change', (event) => selectingCategory(event.target.value));
  
  filterControl.addEventListener('change', (event) => filteringItems(event.target.value));
  
  
  searchBtn.addEventListener('click', () => searchItem(items, searchInput, textNotFound));
  
  searchInput.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
      searchItem(items, searchInput, textNotFound);
    }
  
  })
  
  