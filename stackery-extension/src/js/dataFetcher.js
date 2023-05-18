export async function fetchAllData() {
  const scraps = await chrome.storage.local.get(null);
  return classifyByCategory(Object.values(scraps));
}

function classifyByCategory(items) {
  return items.reduce((acc, item) => {
    const existingCategory = acc.find((obj) => obj.title === item.category);
    if (existingCategory) {
      existingCategory.items.push(item);
    } else {
      acc.push({ title: item.category, items: [item] });
    }
    return acc;
  }, []);
}

export function saveData(obj) {
  const generatedId = generateUniqueId();
  obj.id = generatedId;

  const storageObj = {};
  storageObj[generatedId] = obj;
  chrome.storage.local.set(storageObj);
}

function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 5);

  return timestamp + randomString;
}

export async function findDataByUrl(url) {
  const scraps = await chrome.storage.local.get(null);
  return Object.values(scraps).find((scrap) => scrap.url === url) ?? null;
}

export async function removeDataByIds(ids) {
  console.log(ids);
  await chrome.storage.local.remove(ids);
}
