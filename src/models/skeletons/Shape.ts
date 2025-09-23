import '../../css/skeleton/skeleton.css'
import '../../css/skeleton/shape.css'
import Skeleton from "../enities/Skeleton";
import SkeletonProperty from "../enities/SkeletonProperty";
import { handleCreateBackground, handleCreateCustomCss, handleCreateOpacity } from "./Text";
import VariantPropertyItem from "../enities/property_items/Variant";
import { getSelectionElement } from "../enities/Selecto";
import G from "../../global";
import Toolbar from "../Toolbar";
import type { SelectoEvents } from "selecto";
import { setResizeable, setScalable } from "../enities/Moveable";
function createShapeSkeleton() {
    const wrapper: HTMLElement = document.querySelector('.container')!
    const html = document.createElement('div');
    html.classList.add('shape_skeleton', 'skeleton');
    return new Skeleton(html, wrapper);
}
function handleCreateShape(prop: SkeletonProperty, text_: Skeleton) {
    const div = document.createElement('div')
    Object.assign(div.style, {
        width: '1.4em',
        height: '1.4em',
        margin: '5px',
        borderRadius: '4px'
    })
    const item = new VariantPropertyItem('Shape', div, ['clipPath', 'background'], text_.getELement())
    item.addVariant('none', '#6F00FF')
    item.addVariant('circle(49% at 50% 50%)', '#F4991A')
    item.addVariant('polygon(-1% 0%, 50% 86.6%, 100% 0%)', '#E45A92')
    item.addVariant('polygon(49% 0, 100% 50%, 50% 100%, 0 50%)', '#19183B')
    item.handleChange((value, referenceElement) => {
        handleBehaviorMoveableShapeSkeletonSelect(referenceElement, value[0])
        referenceElement.style.clipPath = value[0]
    })
    prop.addItem(item)
}
function handleBehaviorMoveableShapeSkeletonSelect(referenceElement: HTMLElement, _value: string = referenceElement.style.clipPath) {
    if (_value.indexOf('circle') == 0) {
        setScalable()
        // @ts-ignore
        const radius = Math.min(referenceElement.style.width.replace('px', ''), referenceElement.style.height.replace('px', ''))
        referenceElement.style.width = radius + 'px';
        referenceElement.style.height = radius + 'px'
    } else setResizeable()
}
function handleBehaviorMoveableShapeSkeleton() {
    G.moveable.on('click', e => {
        e.target.classList.contains('shape_skeleton') && handleBehaviorMoveableShapeSkeletonSelect(e.target as HTMLElement)
    })
}

export default function createShapeSkeletonAndPropertyFlow() {
    handleBehaviorMoveableShapeSkeleton()
    Toolbar.getInstance().getChildAt(1).addEventListener('click', function () {
        this.classList.add('btn-selected')
        const _this = this
        getSelectionElement()?.classList.add('select_selection_shape')
        G.selecto.on('selectEnd', handleGenerateShape)
        function handleGenerateShape(e: SelectoEvents['selectEnd']) {
            if (e.rect.width === 0 || e.rect.height === 0) return
            getSelectionElement()?.classList.remove('select_selection_shape')
            const div = createShapeSkeleton()
            _this.classList.remove('btn-selected')
            div.render();
            Object.keys(e.rect).forEach(ee => div.getELement().style[ee] = `${e.rect[ee]}px`);
            const prop = new SkeletonProperty()
            const text_ = div
            handleCreateShape(prop, text_)
            handleCreateBackground(prop, text_)
            handleCreateOpacity(prop, text_)
            handleCreateCustomCss(prop, text_)
            G.selecto.off('selectEnd', handleGenerateShape)
            function showProperty(e: SelectoEvents['selectEnd']) {
                if (e.selected.includes(div.getELement())) {
                    prop.render()
                    prop.show()
                } else {
                    prop.hide()
                    prop.remove()
                }
            }
            G.selecto.on('selectEnd', showProperty)
        }
    })
}