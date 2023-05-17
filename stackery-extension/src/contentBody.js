export const getContentBodyTemplate = () => `<section class="main__body">
  ${createCategoriesTemplate(scraps)}
</section>`;

const scraps = [
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
];

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
