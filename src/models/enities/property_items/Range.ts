import { getPropertyItem } from "../../../utilities";
import SkeletonPropertyItem from "../SkeletonPropertyItem";
import '../../../css/module/skeleton_property_item/range.css'

class RangePropertyItem extends SkeletonPropertyItem {
    constructor(label: string, referenceElement: HTMLElement) {
        super(label, getPropertyItem('.range-container'), referenceElement);
        const rangeInput = this.getElement().querySelector('#handDrawnRange');
        const rangeThumb = this.getElement().querySelector('#rangeThumb');
        const valueDisplay = this.getElement().querySelector('#valueDisplay');
        this.handleChange(function () {
            // @ts-ignore
            const value = parseInt((rangeInput as HTMLInputElement).value);
            // @ts-ignore
            const percentage = (value - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100;
            // @ts-ignore
            rangeThumb!.style.left = percentage + '%';
            valueDisplay!.textContent = value.toString();
        })
    }
    handleChange(callback: (value: any, referenceElement: HTMLElement) => void): void {
        this.getElement().addEventListener('input', e => {
            // @ts-ignore
            callback(e.target.value, this.getReferenceElement())
        })
    }

}
export default RangePropertyItem