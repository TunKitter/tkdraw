import { initContainer, initHTML, initWrapperAndAppElement } from './bootstrap';
import { initInfiniteView } from './lib/infinite_viewer';
import { initMoveable } from './lib/moveable';
import { initSelecto } from './lib/selecto';
import { handleRemoveSkeletonByDeleteKey } from './model/Skeleton';
import createShapeSkeletonAndPropertyFlow from './skeleton/Shape';
import createTextSkeletonAndPropertyFlow from './skeleton/Text';
import createWebviewSkeletonAndPropertyFlow from './skeleton/Webview';
import createYoutubeFrameSkeletonAndPropertyFlow from './skeleton/YoutubeFrame';
import { initToolbar } from './toolbar';
(async function () {
  initWrapperAndAppElement();
  initContainer();
  initToolbar();
  await initHTML();
  initMoveable();
  initSelecto();
  initInfiniteView();
  handleRemoveSkeletonByDeleteKey();
  createTextSkeletonAndPropertyFlow();
  createShapeSkeletonAndPropertyFlow();
  createYoutubeFrameSkeletonAndPropertyFlow()
  createWebviewSkeletonAndPropertyFlow()
})();
