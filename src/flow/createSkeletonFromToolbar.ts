import G from "../global";
import type Skeleton from "../models/enities/Skeleton";
import type SkeletonProperty from "../models/enities/SkeletonProperty";
import Toolbar from "../models/Toolbar";
import type { SelectoEvents } from "selecto";

export default function createSkeletonFromToolbarAndProperty(toolbarIndex: number, data: () => [Skeleton, SkeletonProperty]) {
    const toolbar = Toolbar.getInstance();
    toolbar.getChildAt(toolbarIndex).addEventListener('click', function () {
        this.classList.add('btn-selected')
        const _this = this
        // @ts-ignore
        document.querySelector('.root')!.addEventListener('click', function (e: MouseEvent) {
            const new_data = data()

            new_data[0].renderAtCursor(e)
            // _skeleton.doubleClickToEdit()
            // _skeleton.renderAtCursor(e)
            _this.classList.remove('btn-selected')
            function showProperty(e: SelectoEvents['selectEnd']) {
                if (e.selected.includes(new_data[0].getELement())) {
                    new_data[1].render()
                    new_data[1].show()
                } else {
                    new_data[1].hide()
                    new_data[1].remove()
                    // G.selecto.off('selectEnd', showProperty)
                }
            }
            G.selecto.on('selectEnd', showProperty)
        }, { once: true })

    })
}