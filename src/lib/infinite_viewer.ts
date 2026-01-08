import InfiniteViewer from 'infinite-viewer';
import G from '../global';

export function initInfiniteView() {
  G.infinite_viewer = new InfiniteViewer(G.app_element, {
    displayHorizontalScroll: false,
    displayVerticalScroll: false,
    zoomRange: [0.01, 3],
    useAutoZoom: true,
    wheelScale:0.002
  });
  const info = document.querySelector('#zoom p')!;
  G.infinite_viewer.on('scroll', e => {
    info.textContent = Math.round(e.zoomX * 100) + '%';
  });
  document.querySelector('#zoom')!.addEventListener('dblclick', e => {
    e.preventDefault();
    G.infinite_viewer.setZoom(1);
    info.textContent = '100%';
  });
}
