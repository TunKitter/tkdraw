import type { SelectoEvents } from 'selecto';
import G from '../global';
import type Skeleton from '../model/Skeleton';
import type SkeletonProperty from '../model/SkeletonProperty';
import Toolbar from '../toolbar';

export default function createSkeletonFromToolbarAndProperty(
  toolbarIndex: number,
  data: () => [Skeleton, SkeletonProperty],
  callback: (
    skeleton: Skeleton,
    property: SkeletonProperty,
    callMe: () => void
  ) => void
) {
  Toolbar.getInstance()
    .getChildAt(toolbarIndex)
    .addEventListener(
      'click',
      function vaii() {
        console.log(this);
        this.classList.add('btn-selected');
        const _data = data();
        callback(_data[0], _data[1], () => callMe(this));
        function callMe(_this: HTMLElement) {
          _this.classList.remove('btn-selected');
          function showProperty(e: SelectoEvents['selectEnd']) {
            if (
              e.selected.includes(_data[0].getELement()) &&
              e.selected.length === 1
            ) {
              _data[1].render();
            } else {
              _data[1].remove();
            }
          }
          G.selecto.on('selectEnd', showProperty);
        }
      },
      { once: true }
    );
}
