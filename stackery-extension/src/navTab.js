export function initNavTab() {
  setEvent();
}

function setEvent() {
  const scrapTab = document.querySelector('.scrap__tab');
  const mainTab = document.querySelector('.main__tab');

  scrapTab.addEventListener('click', showScrapPage);
  mainTab.addEventListener('click', showMainPage);
}

function showScrapPage() {
  const scrapTab = document.querySelector('.scrap__tab');
  const mainTab = document.querySelector('.main__tab');
  const scrapPage = document.querySelector('.scrap__body');
  const mainPage = document.querySelector('.main__body');
  const btnMore = document.querySelector('.btn--more');

  scrapTab.classList.add('active');
  mainTab.classList.remove('active');
  scrapPage.classList.remove('d-none');
  mainPage.classList.add('d-none');
  btnMore.classList.add('d-none');
}

function showMainPage() {
  const scrapTab = document.querySelector('.scrap__tab');
  const mainTab = document.querySelector('.main__tab');
  const scrapPage = document.querySelector('.scrap__body');
  const mainPage = document.querySelector('.main__body');
  const btnMore = document.querySelector('.btn--more');

  scrapTab.classList.remove('active');
  mainTab.classList.add('active');
  scrapPage.classList.add('d-none');
  mainPage.classList.remove('d-none');
  btnMore.classList.remove('d-none');
}
