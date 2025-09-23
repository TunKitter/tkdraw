import Skeleton from "../enities/Skeleton";
import '../../css/skeleton/skeleton.css'
import SkeletonProperty from "../enities/SkeletonProperty";
import createSkeletonFromToolbarAndProperty from "../../flow/createSkeletonFromToolbar";
import SelectorPropertyItem from "../enities/property_items/Selector";
import VariantPropertyItem from "../enities/property_items/Variant";
import RangePropertyItem from "../enities/property_items/Range";
import createColorPickerElement from "../base/picker";
import EditorPropertyItem from "../enities/property_items/Editor";
import G from "../../global";
import { getRandomString } from "../../utilities";
import { setResizeable } from "../enities/Moveable";
function createTextSkeleton(text: string, wrapper: HTMLElement = document.querySelector('.container')!) {
    const html = document.createElement('span');
    html.classList.add('text_skeleton', 'skeleton');
    html.innerText = text;
    return new Skeleton(html, wrapper);
}
function handleCreateFont(prop: SkeletonProperty, text_: Skeleton) {
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
}
function handleCreateColor(prop: SkeletonProperty, text_: Skeleton) {
    const div = document.createElement('div')
    div.className = 'color_picker_item'
    const item = new VariantPropertyItem('Color', div, ['background'], text_.getELement())
    item.addVariant('black')
    const white_div = div.cloneNode(true)
    Object.assign(white_div.style, {
        background: 'white',
        border: '2px solid black'
    })
    item.getElement().appendChild(white_div)
    item.addVariant('#FFD93D')
    item.addVariant('#E4004B')
    item.addVariant('#33A1E0')
    const picker = createColorPickerElement(value => {
        text_.getELement().style.color = value
    })
    item.getElement().appendChild(picker)
    item.handleChange((value, referenceElement) => item.getVariant().forEach(() => referenceElement.style.color = value.shift()))
    prop.addItem(item)

}
export function handleCreateBackground(prop: SkeletonProperty, text_: Skeleton) {
    const div = document.createElement('div')
    div.className = 'color_picker_item'
    const item = new VariantPropertyItem('Background', div, ['background'], text_.getELement())
    item.addVariant('black')
    const white_div = div.cloneNode(true)
    Object.assign(white_div.style, {
        background: 'white',
        border: '2px solid black'
    })
    item.getElement().appendChild(white_div)
    item.addVariant('#FFD93D')
    item.addVariant('#E4004B')
    item.addVariant('#33A1E0')
    const picker = createColorPickerElement(value => {
        text_.getELement().style.background = value
    })
    item.getElement().appendChild(picker)
    item.handleChange((value, referenceElement) => item.getVariant().forEach((e, i) => referenceElement.style.background = value[i]))
    prop.addItem(item)
}
export function handleCreateOpacity(prop: SkeletonProperty, text_: Skeleton) {
    const item = new RangePropertyItem('Opacity', 0, 100, text_.getELement())
    item.setValue(100)
    item.handleChange((value, referenceElement) => {
        referenceElement.style.opacity = value + '%'
    })
    prop.addItem(item)
}
export function handleCreateCustomCss(prop: SkeletonProperty, text_: Skeleton) {
    const item = new EditorPropertyItem('Custom Css', text_.getELement())
    const description = document.createElement('p')
    description.innerHTML = "Add <span style='color: #ff73ea;font-size: 1em;'>!important</span> to the end of your css property to make it override above properties.";
    Object.assign(description.style, {
        color: 'gray',
        fontSize: '0.8em'
    })
    item.getWrapper().querySelector('h1')!.insertAdjacentElement('afterend', description)
    let temp_styles = document.createElement('style');
    const className = getRandomString()
    text_.getELement().classList.add(className)
    item.handleChange(function (value) {
        value = `div.${className}.skeleton {${value}}`
        temp_styles.remove()
        const style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) style.styleSheet.cssText = value;
        else style.appendChild(document.createTextNode(value));
        document.head.appendChild(style);
        temp_styles = style
    })
    prop.addItem(item)
}
function handleBehaviorMoveableTextSkeleton() {
    G.moveable.on('click', e => e.target.classList.contains('text_skeleton') && setResizeable())
}
export default function createTextSkeletonAndPropertyFlow() {
    handleBehaviorMoveableTextSkeleton()
    createSkeletonFromToolbarAndProperty(0, () => {
        const prop = new SkeletonProperty()
        const text_ = createTextSkeleton('Enter your text')
        handleCreateFont(prop, text_)
        handleCreateColor(prop, text_)
        handleCreateBackground(prop, text_)
        handleCreateOpacity(prop, text_)
        handleCreateCustomCss(prop, text_)
        text_.doubleClickToEdit()
        return [text_, prop]
    })
}