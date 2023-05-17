const mainElement = document.getElementById('main');
const state = {
  selectMode: false,
  scraps: [
    {
      title: '자바스크립트',
      items: [
        { title: '브라우저 렌더링1', url: '~' },
        { title: '브라우저 렌더링2', url: '~' },
        { title: '브라우저 렌더링3', url: '~' }
      ]
    },
    {
      title: '자바스크립트',
      items: [
        { title: '브라우저 렌더링1', url: '~' },
        { title: '브라우저 렌더링2', url: '~' },
        { title: '브라우저 렌더링3', url: '~' }
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
  ${createCategoriesTemplate(state.scraps)}
</section>`;

const createCategoriesTemplate = (categories) =>
  categories
    .map(
      (category) => `
  <div class="scrap__category">
    <header class="category__header d-flex justify-content-between">
    <h3 class="category__title">${category.title}</h3>
      <button type="button" class="btn">접기</button>
    </header>
    <div class="category__container">
      ${createItemsTemplate(category.items)}
    </div>
  </div>
`
    )
    .join('');

const createItemsTemplate = (items) =>
  items
    .map((item) => `<div class="category__item">${item.title}</div>`)
    .join('');

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
