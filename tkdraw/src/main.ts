import { initContainer, initHTML } from './bootstrap';
import { initToolbar } from './toolbar';
(async function () {
  initContainer();
  initToolbar();
  await initHTML();
})();
