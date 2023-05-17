import { getContentBodyTemplate } from "./contentBody.js";
import { getHeaderTemplate } from "./header.js";

const mainElement = document.getElementById('main');
mainElement.innerHTML = getHeaderTemplate() + getContentBodyTemplate();