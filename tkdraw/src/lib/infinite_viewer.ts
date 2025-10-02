import InfiniteViewer from 'infinite-viewer';
import G from '../global';

export function initInfiniteView() {
  G.infinite_viewer = new InfiniteViewer(document.querySelector('#app')!, {
    displayHorizontalScroll: false,
    displayVerticalScroll: false,
    useAutoZoom: true
  });
}
