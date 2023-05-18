export function initMain() {
  render();
  setEvent();
}

const state = {
  selectMode: false,
  selectionPurpose: '',
  scraps: [
    {
      title: '카테고리1',
      items: [
        {
          id: 1,
          title: 'Start Bootstrap',
          url: 'https://getbootstrap.com/docs/5.3/getting-started/introduction/',
          checked: false
        },
        {
          id: 2,
          title: 'Chrome.storage API',
          url: 'https://developer.chrome.com/docs/extensions/reference/storage/',
          checked: false
        },
        {
          id: 3,
          title: 'Youtube music',
          url: 'https://www.youtube.com/watch?v=sMivc3RIrFs',
          checked: false
        },
        {
          id: 4,
          title: '4',
          url: 'https://www.youtube.com/watch?v=sMivc3RIrFs',
          checked: false
        },
        {
          id: 5,
          title: '5',
          url: 'https://www.youtube.com/watch?v=sMivc3RIrFs',
          checked: false
        },
        {
          id: 6,
          title: '6',
          url: 'https://www.youtube.com/watch?v=sMivc3RIrFs',
          checked: false
        }
      ]
    },
    {
      title: '카테고리2',
      items: [
        {
          id: 7,
          title: '스크랩 제목1',
          url: 'https://developer.mozilla.org/ko/docs/Web/API/Event/bubbles',
          checked: false
        },
        {
          id: 8,
          title: '스크랩 제목2',
          url: 'https://www.naver.com/',
          checked: false
        },
        {
          id: 9,
          title: '스크랩 제목3',
          url: 'https://www.google.com/',
          checked: false
        }
      ]
    }
  ]
};

const categoryColors = ['#edede9', '#d6ccc2', '#f5ebe0', '#e3d5ca', '3d5bdaf'];

function render() {
  const mainBody = document.querySelector('.main__body');

  const mainTemplate = `
    <div class="category__wrapper">
      ${state.scraps
        .map((category, idx) => makeCategory(category, idx))
        .join('')}
    </div>
  `;

  const footerTemplate = createFooterTemplate();

  mainBody.innerHTML = mainTemplate + footerTemplate;
}

function makeCategory(category, idx) {
  const categoryColor = categoryColors[idx % 5];

  const categoryTemplate = `
    <div class="scrap__category mx-auto w-75 mt-3" data-category-index="${idx}">
      <header class="category__header d-flex justify-content-between">
        <h3 class="category__title fs-5">${category.title}</h3>
        <button type="button" class="btn--close border rounded-pill invisible">접기</button>
      </header>
      <div class="category__container w-100 d-flex flex-column align-items-center" data-category-index="${idx}">
        ${createItemsTemplate(category.items, categoryColor)}
      </div>
    </div>
  `;
  return categoryTemplate;
}

function createFooterTemplate() {
  return `
    <footer class="main__footer d-flex justify-content-between bg-primary-subtle d-none">
      <button type="button" class="main__cancle-button btn"><i class="bi bi-x-lg"></i></button>
      <h3 class="main__footer--state"></h3>
      <button type="button" class="main__complete-button btn"><i class="bi bi-check-lg"></i></button>
    </footer>`;
}

function createItemsTemplate(items, categoryColor) {
  return items
    .map((item, index) => {
      const faviconUrl = new URL('/favicon.ico', item.url).href;
      const visibility = index > 2 ? 'invisible' : '';
      const checked = item.checked ? 'checked' : '';

      return `
        <div class="category__item border rounded d-flex align-items-center px-2 ${visibility}" style="background-color: ${categoryColor}" 
        data-url="${item.url}"
        data-item-index="${index}">
          <img class="favicon-img" src="${faviconUrl}" alt="" />
          <p class="item__title mx-1 mb-0 flex-grow-1">${item.title}</p>
          <input class="item__checkbox form-check-input mt-0 d-none" type="checkbox" ${checked} />
        </div>
        `;
    })
    .join('');
}

function setEvent() {
  const categoryContainers = document.querySelectorAll('.category__container');
  const closeBtn = document.querySelectorAll('.btn--close');
  const items = document.querySelectorAll('.category__item');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const cancleButton = document.querySelector('.main__cancle-button');
  const completeButton = document.querySelector('.main__complete-button');
  const categories = document.querySelectorAll('.scrap__category');
  const footer = document.querySelector('.main__footer');
  const footerState = document.querySelector('.main__footer--state');
  const checkboxes = document.querySelectorAll('.item__checkbox');

  categoryContainers.forEach((container) => {
    container.addEventListener('click', spreadItems);
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener('click', stackItems);
  });

  items.forEach((item) => {
    item.addEventListener('click', openUrl.bind(this, item.dataset.url));
  });

  dropdownMenu.addEventListener('click', (event) => {
    turnOnSelectModeWithPurpose(event, { footer, checkboxes, footerState });
  });

  cancleButton.addEventListener(
    'click',
    turnOffSelectMode.bind(this, [footer, ...checkboxes])
  );

  completeButton.addEventListener(
    'click',
    completeSelectMode.bind(this, [footer, ...checkboxes])
  );

  categories.forEach((category) => {
    category.addEventListener('click', (event) => {
      const item = event.target.closest('.category__item');
      if (item === null) {
        event.stopPropagation();
        return;
      }
      const { categoryIndex } = category.dataset;
      const { itemIndex } = item.dataset;
      changeCheckedForItem(categoryIndex, itemIndex);
      const itemCheckBox = item.querySelector('.item__checkbox');
      if (event.target === itemCheckBox) {
        return;
      }
      itemCheckBox.checked = !itemCheckBox.checked;
    });
  });
}

function spreadItems(e) {
  const container = e.target.closest('.category__container');
  const items = container.querySelectorAll('.category__item');
  const closeBtn = e.target
    .closest('.scrap__category')
    .querySelector('.btn--close');

  let translatePx = 0;
  let itemCount = 0;

  items.forEach((item) => {
    closeBtn.classList.remove('invisible');
    item.classList.remove('invisible');
    item.classList.add('spread');
    item.style.width = '266px';
    item.style.transform = `translateY(${translatePx}px)`;

    translatePx += 10;
    itemCount += 1;
  });

  const containerHeight = 50 * itemCount + translatePx;
  container.style.height = `${containerHeight}px`;
}

function stackItems(e) {
  const category = e.target.closest('.scrap__category');
  const container = category.querySelector('.category__container');
  const items = category.querySelectorAll('.category__item');
  const closeBtn = e.target;

  let width = 266;
  let translatePx = 0;

  container.removeAttribute('style');
  items.forEach((item, idx) => {
    closeBtn.classList.add('invisible');
    if (idx >= 3) {
      item.classList.add('invisible');
    }
    item.classList.remove('spread');
    item.style.width = `${width}px`;
    item.style.transform = `translateY(${translatePx}px)`;
    width -= 10;
    translatePx -= 40;
  });
}

function openUrl(url) {
  if (state.selectMode) {
    return;
  }
  chrome.tabs.create({ url });
}

function turnOnSelectModeWithPurpose(
  event,
  { footer, checkboxes, footerState }
) {
  const dropdownItem = event.target.closest('.dropdown-item__wrapper');
  if (!dropdownItem) {
    event.preventDefault();
    return;
  }
  state.selectMode = true;
  setSelectionPurpose(dropdownItem.dataset.purpose);
  footerState.textContent = getFooterStateWithPurpose();
  const categoryItems = state.scraps
    .map((scrap) => scrap.items)
    .reduce((prev, next) => [...prev, ...next], []);
  categoryItems.forEach((categoryItem, index) => {
    checkboxes[index].checked = categoryItem.checked;
  });
  showElements([footer, ...checkboxes]);
}

function getFooterStateWithPurpose() {
  switch (state.selectionPurpose) {
    case 'copy':
      return '링크 복사';
    case 'remove':
      return '삭제하기';
    case 'open':
      return '모두 열기';
    default:
      return '';
  }
}

function showElements(elements) {
  elements.forEach((element) => element.classList.remove('d-none'));
}

function hideElements(elements) {
  elements.forEach((element) => element.classList.add('d-none'));
}

const turnOffSelectMode = (visibleElements) => {
  state.selectMode = false;
  resetSelectionStates();
  hideElements(visibleElements);
};

const setSelectionPurpose = (purpose) => {
  state.selectionPurpose = purpose;
};

const completeSelectMode = (visibleElements) => {
  const selectedItems = state.scraps
    .map((scrap) => scrap.items.filter((item) => item.checked))
    .reduce((p, n) => [...p, ...n], []);
  handleSelectedItemsWithPurpose(selectedItems);
  turnOffSelectMode(visibleElements);
};

const handleSelectedItemsWithPurpose = (selectedItems) => {
  switch (state.selectionPurpose) {
    case 'copy':
      navigator.clipboard.writeText(
        selectedItems.map((item) => item.url).join('\n')
      );
      break;
    case 'remove':
      const itemIds = selectedItems.map((selectedItem) => selectedItem.id);
      state.scraps = state.scraps.map((scrap) => {
        scrap.items = scrap.items.filter((item) => !itemIds.includes(item.id));
        return scrap;
      });
      reRender();
      break;
    case 'open':
      selectedItems.forEach((selectedItem) => {
        chrome.tabs.create({ url: selectedItem.url, active: false });
      });
      break;
    default:
      break;
  }
};

const resetSelectionStates = () => {
  setSelectionPurpose('');
  state.scraps.forEach((scrap) => {
    scrap.items.forEach((item) => {
      item.checked = false;
    });
  });
};

const changeCheckedForItem = (categoryIndex, itemIndex) => {
  const item = state.scraps[categoryIndex].items[itemIndex];
  state.scraps[categoryIndex].items[itemIndex].checked = !item.checked;
};

function reRender() {
  render();
  setEvent();
}
