import type Skeleton from '../model/Skeleton';
import SkeletonPropertyItem from '../model/SkeletonPropertyItem';

class VariantPropertyItem extends SkeletonPropertyItem {
  private styles: [{ [key: string]: string }, string][] = [];
  private variantElement: HTMLElement;
  constructor(
    label: string,
    variantElement: HTMLElement,
    referenceElement: Skeleton
  ) {
    const wrapper = document.createElement('div');
    wrapper.className = 'variant_container';
    super(label, wrapper, referenceElement);
    this.variantElement = variantElement;
  }
  getVariant() {
    return this.styles;
  }
  addVariant(style: { [key: string]: string }, _value: string) {
    const cloneNode = this.variantElement.cloneNode(true);
    Object.keys(style).forEach(e => {
      // @ts-ignore
      cloneNode.style[e] = style[e];
    });
    this.getElement().appendChild(cloneNode);
    this.styles.push([style, _value]);
    return cloneNode;
  }

  handleChange(
    callback: (value: any, referenceElement: Skeleton) => void
  ): void {
    console.log(this.styles);

    this.getElement().childNodes.forEach((e, i) => {
      // @ts-ignore
      e.onclick = () => callback(this.styles[i][1], this.getReferenceElement());
    });
  }
}
export default VariantPropertyItem;
