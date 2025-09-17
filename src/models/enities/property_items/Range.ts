import { getPropertyItem } from "../../../utilities";
import SkeletonPropertyItem from "../SkeletonPropertyItem";
import '../../../css/module/skeleton_property_item/range.css'

class RangePropertyItem extends SkeletonPropertyItem {
    constructor(label: string, min: number, max: number, referenceElement: HTMLElement) {
        super(label, getPropertyItem('.range-container'), referenceElement);
        const rangeInput = this.getElement().querySelector('#handDrawnRange');
        rangeInput!.setAttribute('type', 'range');
        rangeInput!.setAttribute('min', min.toString());
        rangeInput!.setAttribute('max', max.toString());
        // @ts-ignore
        this.getElement().querySelector('#rangeThumb').style.left = min + '%';
        const _this = this
        this.handleChange(function (value) {
            _this.setValue(value)
        })
    }
    setDisplay(is_display: boolean) {
        // @ts-ignore
        this.getElement().querySelector('#valueDisplay')!.style.display = is_display ? 'flex' : 'none'
    }
    setValue(value: number) {
        const rangeInput = this.getElement().querySelector('#handDrawnRange') as HTMLInputElement;
        rangeInput.value = value.toString();
        const percentage = (value - parseInt(rangeInput.min)) / (parseInt(rangeInput.max) - parseInt(rangeInput.min)) * 100;
        const rangeThumb = this.getElement().querySelector('#rangeThumb') as HTMLElement;
        rangeThumb.style.left = percentage + '%';
        const valueDisplay = this.getElement().querySelector('#valueDisplay') as HTMLElement;
        valueDisplay.textContent = value.toString();
    }
    handleChange(callback: (value: any, referenceElement: HTMLElement) => void): void {
        this.getElement().addEventListener('input', e => {
            // @ts-ignore
            callback(e.target.value, this.getReferenceElement())
        })
    }

}
export default RangePropertyItem