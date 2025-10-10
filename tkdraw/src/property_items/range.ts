import type Skeleton from '../model/Skeleton';
import SkeletonPropertyItem from '../model/SkeletonPropertyItem';
import { getHTML } from '../utility';

class RangePropertyItem extends SkeletonPropertyItem {
  constructor(
    label: string,
    min: number,
    max: number,
    referenceElement: Skeleton
  ) {
    super(label, getHTML('.range-container'), referenceElement);
    const rangeInput = this.getElement().querySelector('#handDrawnRange');
    rangeInput!.setAttribute('min', min.toString());
    rangeInput!.setAttribute('max', max.toString());
    // @ts-ignore
    this.getElement().querySelector('#rangeThumb').style.left = max + '%';
    const _this = this;
    this.handleChange(function (value) {
      _this.setValue(value);
    });
  }
  setDisplay(is_display: boolean) {
    // @ts-ignore
    this.getElement().querySelector('#valueDisplay')!.style.display = is_display
      ? 'flex'
      : 'none';
  }
  setValue(value: number) {
    const rangeInput = this.getElement().querySelector(
      '#handDrawnRange'
    ) as HTMLInputElement;
    rangeInput.value = value.toString();
    const percentage =
      ((value - parseInt(rangeInput.min)) /
        (parseInt(rangeInput.max) - parseInt(rangeInput.min))) *
      100;
    const rangeThumb = this.getElement().querySelector(
      '#rangeThumb'
    ) as HTMLElement;
    rangeThumb.style.left = percentage + '%';
    const valueDisplay = this.getElement().querySelector(
      '#valueDisplay'
    ) as HTMLElement;
    valueDisplay.textContent = value.toString();
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
export default RangePropertyItem;
