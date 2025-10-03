import { initContainer, initHTML, initWrapperAndAppElement } from './bootstrap';
import { initInfiniteView } from './lib/infinite_viewer';
import { initMoveable } from './lib/moveable';
import { initSelecto } from './lib/selecto';
import { initToolbar } from './toolbar';
(async function () {
  initWrapperAndAppElement();
  initContainer();
  initToolbar();
  await initHTML();
  initMoveable();
  initSelecto();
  initInfiniteView();
})();
