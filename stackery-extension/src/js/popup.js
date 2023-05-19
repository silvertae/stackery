import { initMain } from './mainPage.js';
import { initNavTab } from './navTab.js';
import { initScrapPage } from './scrapPage.js';

export function initPopup() {
  initNavTab();
  initMain();
  initScrapPage();
} 

initPopup();
