async function getTabUrl() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const { url } = tab;
  return url;
}

async function getH1() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) {
    return null;
  }
  const tabId = tab.id;
  const result = await chrome.scripting.executeScript({
    target: { tabId },
    function: () => {
      const h1Tag = document.querySelector('h1');
      if (!h1Tag) {
        return null;
      }
      const h1Text = h1Tag.textContent;
      return h1Text;
    }
  });
  return result[0].result;
}

async function writeTitle() {
  const h1Tags = await getH1();
  const url = await getTabUrl();
  const titleInput = document.querySelector('#title__input');
  if (h1Tags === null) {
    titleInput.value = url;
  } else {
    titleInput.value = h1Tags.replace(/\s+/g, ' ').trim();
  }
}

async function saveData() {
  const saveBtn = document.querySelector('.save__btn');
  saveBtn.addEventListener('click', (e) => {
    const categoryInput = document.querySelector('.category__input');
    const categoryText = categoryInput.value;
    const key1 = '1';
    chrome.storage.local.set({ key1: categoryText }).then(() => {});
  });
}

async function init() {
  writeTitle();
  saveData();
}

document.addEventListener('DOMContentLoaded', init);
