import type SkeletonPropertyItem from './SkeletonPropertyItem';

class SkeletonProperty {
  private wrapper: HTMLElement;
  constructor() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'skeleton_property';
  }
  render() {
    document.body.appendChild(this.wrapper);
  }
  hide() {
    this.wrapper.style.display = 'none';
  }
  show() {
    this.wrapper.style.display = 'block';
  }
  remove() {
    this.wrapper.remove();
  }
  addItem(item: SkeletonPropertyItem) {
    this.wrapper.appendChild(item.getWrapper());
  }
}
export default SkeletonProperty;
