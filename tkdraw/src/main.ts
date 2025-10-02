import { initContainer, initHTML } from './bootstrap';
import { initMoveable } from './lib/moveable';
import { initToolbar } from './toolbar';
(async function () {
  initContainer();
  initToolbar();
  await initHTML();
  initMoveable();
})();
