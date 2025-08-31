import G from "../global";
import type Skeleton from "../models/enities/Skeleton";
import Toolbar from "../models/Toolbar";

export default function createSkeletonFromToolbar(toolbarIndex: number, skeleton: Skeleton) {
    const toolbar = Toolbar.getInstance();
    toolbar.getChildAt(toolbarIndex).addEventListener('click', function () {
        this.classList.add('btn-selected')
        const _this = this
        // @ts-ignore
        document.querySelector('.root')!.addEventListener('click', function (e: MouseEvent) {
            let x = G.infiniteView.getScrollLeft()
            let y = G.infiniteView.getScrollTop()
            x += e.clientX / G.infiniteView.getZoomX()
            y += e.clientY / G.infiniteView.getZoomY()

            Object.assign(skeleton.getELement().style, {
                top: y + 'px',
                left: x + 'px',
                transform: 'translate(-50%, -50%)',
            })
            skeleton.render();
            _this.classList.remove('btn-selected')
        }, { once: true })

    })
}