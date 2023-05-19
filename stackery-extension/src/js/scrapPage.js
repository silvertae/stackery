import { saveData } from './dataFetcher.js';

export async function getTabUrl() {
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
  const titleInput = document.querySelector('.input__title');

  if (h1Tags) {
    titleInput.value = h1Tags.replace(/\s+/g, ' ').trim();
  } else {
    titleInput.value = url;
  }
}

function saveScrapData() {
  const saveBtn = document.querySelector('.save__btn');
  saveBtn.addEventListener('click', async () => {
    const categoryInput = document.querySelector('.input__category');
    const categoryText = categoryInput.value;
    const scrapTitle = document.querySelector('.input__title');
    const scrapUrl = await getTabUrl();
    const scrapObj = {
      title: scrapTitle.value,
      url: scrapUrl,
      category: categoryText
    };
    saveData(scrapObj);
  });
}

function validateForm() {
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      },
      false
    );
  });
}

function selectInputValue() {
  const scrapInput = document.querySelector('.input__title');
  scrapInput.focus();
  scrapInput.setSelectionRange(0, scrapInput.value.length);
}

export async function initScrapPage() {
  await writeTitle();
  saveScrapData();
  validateForm();
  selectInputValue();
}
