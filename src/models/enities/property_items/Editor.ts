import { getPropertyItem } from "../../../utilities";
import SkeletonPropertyItem from "../SkeletonPropertyItem";
import '../../../css/module/skeleton_property_item/editor.css'
class EditorPropertyItem extends SkeletonPropertyItem {
    constructor(label: string, referenceElement: HTMLElement) {
        super(label, getPropertyItem('.editor_property_item'), referenceElement);
    }
    handleChange(callback: (value: any, referenceElement: HTMLElement) => void): void {
        this.getElement().addEventListener('input', e => {
            // @ts-ignore
            callback(e.target.value, this.getReferenceElement())
        })
    }

}
export default EditorPropertyItem