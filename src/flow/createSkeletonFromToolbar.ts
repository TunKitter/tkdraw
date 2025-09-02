import G from "../global";
import type Skeleton from "../models/enities/Skeleton";
import type SkeletonProperty from "../models/enities/SkeletonProperty";
import Toolbar from "../models/Toolbar";
import type { SelectoEvents } from "selecto";

export default function createSkeletonFromToolbarAndProperty(toolbarIndex: number, skeleton: () => Skeleton, property: SkeletonProperty) {
    const toolbar = Toolbar.getInstance();
    toolbar.getChildAt(toolbarIndex).addEventListener('click', function () {
        this.classList.add('btn-selected')
        const _this = this
        // @ts-ignore
        document.querySelector('.root')!.addEventListener('click', function (e: MouseEvent) {
            const _skeleton = skeleton()
            _skeleton.doubleClickToEdit()
            _skeleton.renderAtCursor(e)
            _this.classList.remove('btn-selected')
            function showProperty(e: SelectoEvents['selectEnd']) {
                if (e.selected.length > 0) {
                    property.render()
                    property.show()
                } else {
                    property.hide()
                    property.remove()
                    // G.selecto.off('selectEnd', showProperty)
                }
            }
            G.selecto.on('selectEnd', showProperty)
        }, { once: true })

    })
}