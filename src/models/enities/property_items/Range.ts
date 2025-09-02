import SkeletonPropertyItem from "../SkeletonPropertyItem";

class RangePropertyItem extends SkeletonPropertyItem {
    constructor(label: string) {
        super(label, document.createElement('div'), document.createElement('div'));
    }
    handleChange(callback: (value: any, referenceElement: HTMLElement) => void): void {
        // this.getElement().addEventListener('input', e => {

        //     function updateRange() {
        //         const value = rangeInput.value;
        //         const percentage = (value - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100;
        //         rangeThumb.style.left = percentage + '%';
        //         valueDisplay.textContent = value;
        //     }

        //     rangeInput.addEventListener('input', updateRange);
        //     updateRange();
        //     callback(this.getElement().value, this.getReferenceElement())
        // })
    }

}
export default RangePropertyItem