import type Skeleton from '../model/Skeleton';
import SkeletonPropertyItem from '../model/SkeletonPropertyItem';
import { getHTML } from '../utility';

class SelectorPropertyItem extends SkeletonPropertyItem {
  constructor(label: string, referenceElement: Skeleton) {
    super(label, getHTML('.selector'), referenceElement);
  }
  addOption(text: string, value: string = text): void {
    const select = this.getElement() as HTMLSelectElement;
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    select.add(option);
  }
  handleChange(
    callback: (value: any, referenceElement: Skeleton) => void
  ): void {
    this.getElement().addEventListener('change', e => {
      // @ts-ignore
      callback(e.target.value, this.getReferenceElement());
    });
  }
}
export default SelectorPropertyItem;
