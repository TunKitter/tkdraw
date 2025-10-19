import type { SelectoEvents } from 'selecto';
import G from '../global';
import type Skeleton from '../model/Skeleton';
import type SkeletonProperty from '../model/SkeletonProperty';

export default function toggleShowPropertyPanelWithSkeleton(
  skeleton: Skeleton,
  prop: SkeletonProperty
) {
  function showProperty(e: SelectoEvents['selectEnd']) {
    if (e.selected.includes(skeleton.getELement()) && e.selected.length === 1) {
      prop.render();
    } else {
      window.getSelection()?.removeAllRanges();
      prop.remove();
    }
  }
  G.selecto.on('selectEnd', showProperty);
}
