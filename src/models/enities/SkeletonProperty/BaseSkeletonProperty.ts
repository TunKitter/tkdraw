import classes from '../../../css/module/skeleton_property/skeleton.property.base.module.css'
class BaseSkeletonProperty {
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
}
export default BaseSkeletonProperty