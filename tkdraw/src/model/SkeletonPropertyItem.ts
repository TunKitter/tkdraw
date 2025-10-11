import type Skeleton from './Skeleton';

abstract class SkeletonPropertyItem {
  protected element: HTMLElement;
  protected referenceElement: Skeleton;
  protected wrapper: HTMLElement;

  constructor(label: string, element: HTMLElement, referenceElement: Skeleton) {
    this.element = element;
    this.referenceElement = referenceElement;
    const wrapper = document.createElement('div');
    wrapper.classList.add('skeleton_property_item_wrapper');
    const labelElement = document.createElement('div');
    labelElement.className = 'skeleton_property_item_label';
    labelElement.textContent = label;
    wrapper.appendChild(labelElement);
    wrapper.appendChild(this.element);
    this.wrapper = wrapper;
  }

  abstract handleChange(
    callback: (value: any, referenceElement: Skeleton) => void
  ): void;

  getElement() {
    return this.element;
  }

  getReferenceElement() {
    return this.referenceElement;
  }

  getWrapper() {
    return this.wrapper;
  }
}
export default SkeletonPropertyItem;
