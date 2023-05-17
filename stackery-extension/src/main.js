const mainElement = document.getElementById('main');
const state = {
  selectMode: false,
  scraps: [
    {
      title: '카테고리1',
      items: [
        { title: '스크랩 제목1', url: '~' },
        { title: '스크랩 제목2', url: '~' },
        { title: '스크랩 제목3', url: '~' }
      ]
    },
    {
      title: '카테고리2',
      items: [
        { title: '스크랩 제목1', url: '~' },
        { title: '스크랩 제목2', url: '~' },
        { title: '스크랩 제목3', url: '~' }
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
      (category) => `
  <div class="scrap__category">
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
      (item) => `
    <div class="item__wrapper d-flex">
      <div class="category__item">${item.title}</div>
      ${getSelectBoxForItem(isSelectMode)}
    </div>
    `
    )
    .join('');

const getSelectBoxForItem = (isSelectMode) =>
  isSelectMode ? '<input class="form-check-input" type="checkbox" >' : '';

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
    completeButton.addEventListener('click', turnOffSelectMode);
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

render();
