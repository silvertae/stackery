const mainElement = document.getElementById('main');
const state = {
  selectMode: false,
  scraps: [
    {
      title: '카테고리1',
      items: [
        { title: '스크랩 제목1', url: '~', checked: false },
        { title: '스크랩 제목2', url: '~', checked: false },
        { title: '스크랩 제목3', url: '~', checked: false }
      ]
    },
    {
      title: '카테고리2',
      items: [
        { title: '스크랩 제목1', url: '~', checked: false },
        { title: '스크랩 제목2', url: '~', checked: false },
        { title: '스크랩 제목3', url: '~', checked: false }
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
      <button type="button" class="main__more-button btn"><i class="bi bi-three-dots"></i></button>
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
      <div class="item__title">${item.title}</div>
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
  const moreButton = mainElement.querySelector('.main__more-button');
  if (moreButton) {
    moreButton.addEventListener('click', turnOnSelectMode);
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
        const categoryIndex = category.dataset.categoryIndex;
        const itemIndex = checkbox.dataset.itemIndex;
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
  render();
};

const completeSelectMode = () => {
  const selectedItems = [];
  state.scraps.forEach((scrap) => {
    selectedItems.push(...scrap.items.filter((item) => item.checked));
  })
  turnOffSelectMode();
}

const changeCheckedForItem = (categoryIndex, itemIndex) => {
  const item = state.scraps[categoryIndex].items[itemIndex];
  state.scraps[categoryIndex].items[itemIndex].checked = !item.checked;
  render();
}

render();
