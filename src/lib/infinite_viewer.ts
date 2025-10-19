import InfiniteViewer from 'infinite-viewer';
import G from '../global';

export function initInfiniteView() {
  G.infinite_viewer = new InfiniteViewer(G.app_element, {
    displayHorizontalScroll: false,
    displayVerticalScroll: false,
    useAutoZoom: true
  });
}
