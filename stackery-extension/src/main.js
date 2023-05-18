const mainElement = document.getElementById('main');
const state = {
  selectMode: false,
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
        }
      ]
    },
    {
      title: '카테고리2',
      items: [
        {
          id: 4,
          title: '스크랩 제목1',
          url: 'https://developer.mozilla.org/ko/docs/Web/API/Event/bubbles',
          checked: false
        },
        {
          id: 5,
          title: '스크랩 제목2',
          url: 'https://www.naver.com/',
          checked: false
        },
        {
          id: 6,
          title: '스크랩 제목3',
          url: 'https://www.google.com/',
          checked: false
        }
      ]
    }
  ]
};

const getHeaderTemplate = (state) => {
  const headerTemplate = state.selectMode
    ? `<header class="main__header d-flex justify-content-between">
    <button type="button" class="main__cancle-button btn"><i class="bi bi-x-lg"></i></button>
    <button type="button" class="main__complete-button btn"><i class="bi bi-check-lg"></i></button>
  </header>`
    : `<header class="main__header d-flex justify-content-end">
      <div class="dropdown">
        <button type="button" class="main__more-button btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots"></i></button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li class="dropdown-item" data-purpose="share"><a class="dropdown-item" href="#">공유하기</a></li>
          <li class="dropdown-item" data-purpose="remove"><a class="dropdown-item" href="#">삭제하기</a></li>
          <li class="dropdown-item" data-purpose="open"><a class="dropdown-item" href="#">모두 열기</a></li>
        </ul>
      </div>
    </header>`;
  return headerTemplate;
};

const getContentBodyTemplate = (state) => `<section class="main__body">
  ${createCategoriesTemplate(state)}
</section>`;

const createCategoriesTemplate = (state) =>
  state.scraps
    .map(
      (category, index) => `
  <div class="scrap__category" data-category-index="${index}">
    <header class="category__header d-flex justify-content-between">
      <h3 class="category__title">${category.title}</h3>
      <button type="button" class="btn">접기</button>
    </header>
    <div class="category__container">
      ${createItemsTemplate(category.items, state.selectMode)}
    </div>
  </div>
`
    )
    .join('');

const createItemsTemplate = (items, isSelectMode) =>
  items
    .map(
      (item, index) => `
        <div class="item__wrapper d-flex">
          <div class="item__title">
            <p>${item.title}</p>
          </div>
          ${getSelectBoxForItem(item.checked, isSelectMode, index)}
        </div>
        `
    )
    .join('');

const getSelectBoxForItem = (checked, isSelectMode, index) =>
  isSelectMode
    ? `<input class="item__checkbox form-check-input" type="checkbox" ${
        checked ? 'checked' : ''
      } data-item-index="${index}" >`
    : '';

const setEvent = () => {
  const dropdownItems = mainElement.querySelectorAll('.dropdown-item');
  if (dropdownItems) {
    dropdownItems.forEach((dropdownItem) => {
      dropdownItem.addEventListener('click', (event) => {
        const item = event.currentTarget;
        setSelectionPurpose(item.dataset.purpose);
        turnOnSelectMode();
      });
    });
  }
  const cancleButton = mainElement.querySelector('.main__cancle-button');
  if (cancleButton) {
    cancleButton.addEventListener('click', turnOffSelectMode);
  }
  const completeButton = mainElement.querySelector('.main__complete-button');
  if (completeButton) {
    completeButton.addEventListener('click', completeSelectMode);
  }
  const categories = mainElement.querySelectorAll('.scrap__category');
  if (categories) {
    categories.forEach((category) => {
      category.addEventListener('click', (event) => {
        const checkbox = event.target.closest('.item__checkbox');
        if (checkbox === null) {
          event.stopPropagation();
          return;
        }
        const { categoryIndex } = category.dataset;
        const { itemIndex } = checkbox.dataset;
        changeCheckedForItem(categoryIndex, itemIndex);
      });
    });
  }
};

const render = () => {
  mainElement.innerHTML =
    getHeaderTemplate(state) + getContentBodyTemplate(state);
  setEvent();
};

const turnOnSelectMode = () => {
  state.selectMode = true;
  render();
};

const turnOffSelectMode = () => {
  state.selectMode = false;
  resetSelectionStates();
  render();
};

const setSelectionPurpose = (purpose) => {
  state.selectionPurpose = purpose;
};

const completeSelectMode = () => {
  const selectedItems = state.scraps
    .map((scrap) => scrap.items.filter((item) => item.checked))
    .reduce((p, n) => [...p, ...n], []);
  handleSelectedItemsWithPurpose(selectedItems);
  turnOffSelectMode();
};

const handleSelectedItemsWithPurpose = (selectedItems) => {
  switch (state.selectionPurpose) {
    case 'share':
      navigator.clipboard.writeText(
        selectedItems.map((item) => item.url).join('\n')
      );
      break;
    case 'remove':
      const itemIds = selectedItems.map((selectedItem) => selectedItem.id);
      state.scraps = state.scraps.map((scrap) => {
        scrap.items = scrap.items.filter((item) => itemIds.includes(item.id));
        return scrap;
      });
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
  delete state.selectionPurpose;
  state.scraps = state.scraps.map((scrap) => {
    scrap.items.forEach((item) => {
      item.checked = false;
    });
    return scrap;
  });
};

const changeCheckedForItem = (categoryIndex, itemIndex) => {
  const item = state.scraps[categoryIndex].items[itemIndex];
  state.scraps[categoryIndex].items[itemIndex].checked = !item.checked;
  render();
};

render();
