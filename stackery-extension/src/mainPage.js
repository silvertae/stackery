export function initMain() {
  render();
  setEvent();
}

const mainStore = {
  categoryList: ['CS16', 'JS', 'CSS']
};

const categoryColors = ['#edede9', '#d6ccc2', '#f5ebe0', '#e3d5ca', '3d5bdaf'];

function render() {
  const mainElement = document.querySelector('#main');

  const mainTemplate = `
    <header class="main__header d-flex justify-content-end">
      <button type="button" class="btn"><i class="bi bi-three-dots"></i></button>
    </header>
    <section class="main__body">
      ${mainStore.categoryList
        .map((category, idx) => makeCategory(category, idx))
        .join('')}
    </section>
  `;

  mainElement.innerHTML = mainTemplate;
}

function makeCategory(category, idx) {
  const categoryColor = categoryColors[idx % 5];
  const categoryTemplate = `
    <div class="scrap__category mx-auto w-75 mt-3">
      <header class="category__header d-flex justify-content-between">
        <h3 class="category__title">${category}</h3>
        <button type="button" class="btn--close border rounded-pill invisible">접기</button>
      </header>
      <div class="category__container w-100 d-flex flex-column align-items-center">
        <div class="category__item border rounded" style="background-color: ${categoryColor}">브라우저는 어떻게 동작하는가?</div>
        <div class="category__item border rounded" style="background-color: ${categoryColor}">NAVER D2</div>
        <div class="category__item border rounded" style="background-color: ${categoryColor}">네트워크 동작 원리</div>
      </div>
    </div>
  `;
  return categoryTemplate;
}

function setEvent() {
  const categoryContainers = document.querySelectorAll('.category__container');
  const closeBtn = document.querySelectorAll('.btn--close');

  categoryContainers.forEach((container) => {
    container.addEventListener('click', spreadItems);
  });
  closeBtn.forEach((btn) => {
    btn.addEventListener('click', stackItems);
  });
}

function spreadItems(e) {
  const container = e.target.closest('.category__container');
  const items = container.querySelectorAll('.category__item');
  const closeBtn = e.target
    .closest('.scrap__category')
    .querySelector('.btn--close');

  let translatePx = 0;

  items.forEach((item) => {
    closeBtn.classList.remove('invisible');
    item.classList.remove('invisible');
    item.style.width = '266px';
    item.style.transform = `translateY(${translatePx}px)`;
    translatePx += 10;
  });
}

function stackItems(e) {
  const category = e.target.closest('.scrap__category');
  const container = category.querySelector('.category__container');
  const items = category.querySelectorAll('.category__item');
  const closeBtn = e.target;

  let width = 266;
  let translatePx = 0;

  items.forEach((item, idx) => {
    closeBtn.classList.add('invisible');
    if (idx >= 3) {
      item.classList.add('invisible');
    }
    item.style.width = `${width}px`;
    item.style.transform = `translateY(${translatePx}px)`;
    width -= 10;
    translatePx -= 40;
  });
}
