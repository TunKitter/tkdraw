import { getPropertyItem } from "../../../utilities";
import SkeletonPropertyItem from "../SkeletonPropertyItem";
import '../../../css/module/skeleton_property_item/selector.css'
class SelectorPropertyItem extends SkeletonPropertyItem {
    constructor(label: string, referenceElement: HTMLElement) {
        super(label, getPropertyItem('.selector'), referenceElement);
    }
    addOption(text: string, value: string = text): void {
        const select = this.getElement() as HTMLSelectElement;
        const option = document.createElement('option');
        option.value = value;
        option.text = text;
        select.add(option);
    }
    handleChange(callback: (value: any, referenceElement: HTMLElement) => void): void {
        this.getElement().addEventListener('change', e => {
            // @ts-ignore
            callback(e.target.value, this.getReferenceElement())
        })
    }

}
export default SelectorPropertyItem