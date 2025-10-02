import { initContainer, initHTML } from './bootstrap';
import { initInfiniteView } from './lib/infinite_viewer';
import { initMoveable } from './lib/moveable';
import { initSelecto } from './lib/selecto';
import { initToolbar } from './toolbar';
(async function () {
  initContainer();
  initToolbar();
  await initHTML();
  initMoveable();
  initSelecto();
  initInfiniteView();
})();
