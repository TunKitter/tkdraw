import type Skeleton from '../model/Skeleton';
import SkeletonPropertyItem from '../model/SkeletonPropertyItem';
import { getHTML } from '../utility';

class EditorPropertyItem extends SkeletonPropertyItem {
  constructor(label: string, referenceElement: Skeleton) {
    super(label, getHTML('.editor_property_item'), referenceElement);
  }
  handleChange(
    callback: (value: any, referenceElement: Skeleton) => void
  ): void {
    this.getElement().addEventListener('input', e => {
      // @ts-ignore
      callback(e.target.value, this.getReferenceElement());
    });
  }
}
export default EditorPropertyItem;
