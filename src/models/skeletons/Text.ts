import Skeleton from "../enities/Skeleton";
import '../../css/skeleton/text.css'
import SkeletonProperty from "../enities/SkeletonProperty";
import RangePropertyItem from "../enities/property_items/Range";
import createSkeletonFromToolbarAndProperty from "../../flow/createSkeletonFromToolbar";
export default function createTextSkeletonAndPropertyFlow() {
    createSkeletonFromToolbarAndProperty(0, () => {
        const prop = new SkeletonProperty()
        const text_ = createTextSkeleton('Hello')
        const item = new RangePropertyItem('Font size', text_.getELement())
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