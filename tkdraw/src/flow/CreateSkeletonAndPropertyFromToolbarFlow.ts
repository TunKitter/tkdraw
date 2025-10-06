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
  const toolbar = Toolbar.getInstance();
  toolbar.getChildAt(toolbarIndex).addEventListener('click', function () {
    this.classList.add('btn-selected');
    const _data = data();
    callback(_data[0], _data[1], () => endMe(this));
    function endMe(_this: HTMLElement) {
      _this.classList.remove('btn-selected');
      G.moveable.target = _data[0].getELement();
      function showProperty(e: SelectoEvents['selectEnd']) {
        if (
          e.selected.includes(_data[0].getELement()) &&
          e.selected.length === 1
        ) {
          _data[1].render();
        } else {
          window.getSelection()?.removeAllRanges();
          _data[1].remove();
        }
      }
      G.selecto.on('selectEnd', showProperty);
    }
  });
}
