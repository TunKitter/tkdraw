import classes from '../../css/module/skeleton_property/skeleton.property.module.css'
import type SkeletonPropertyItem from './SkeletonPropertyItem';
class SkeletonProperty {
    private wrapper: HTMLElement;
    constructor() {
        this.wrapper = document.createElement('div');
        this.wrapper.innerHTML = 'sdad1232'
        this.wrapper.classList.add(classes.base_skeleton_property);
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
        this.wrapper.appendChild(item.getElement());
    }
}
export default SkeletonProperty