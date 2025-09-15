import Skeleton from "../enities/Skeleton";
import '../../css/skeleton/text.css'
import SkeletonProperty from "../enities/SkeletonProperty";
import createSkeletonFromToolbarAndProperty from "../../flow/createSkeletonFromToolbar";
import SelectorPropertyItem from "../enities/property_items/Selector";
export default function createTextSkeletonAndPropertyFlow() {
    createSkeletonFromToolbarAndProperty(0, () => {
        const prop = new SkeletonProperty()
        const text_ = createTextSkeleton('Hello')
        const item = new SelectorPropertyItem('Font', text_.getELement())
        item.addOption('Times New Roman', 'times-new-roman')
        item.addOption('Arial', 'arial')
        item.addOption('Courier New', 'courier-new')
        item.addOption('Georgia', 'georgia')
        item.addOption('Verdana', 'verdana')
        item.handleChange((value, referenceElement) => {
            // @ts-ignore
            referenceElement.style.fontFamily = value;
        })
        prop.addItem(item)
        text_.doubleClickToEdit()
        return [text_, prop]
    })
}
function createTextSkeleton(text: string, wrapper: HTMLElement = document.querySelector('.container')!) {
    const html = document.createElement('div');
    html.classList.add('text_skeleton', 'skeleton');
    html.innerText = text;
    return new Skeleton(html, wrapper);
}