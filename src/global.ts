// @ts-nocheck
import type InfiniteViewer from 'infinite-viewer';
import Moveable from 'moveable';
import type Selecto from 'selecto';

const G = {
  html: document.createElement('div'),
  moveable: null as Moveable,
  selecto: null as Selecto,
  infinite_viewer: null as InfiniteViewer,
  app_element: null as HTMLElement,
  wrapper_element: null as HTMLElement,
  min_z_index: -1,
  max_z_index: 1
};
export default G;
