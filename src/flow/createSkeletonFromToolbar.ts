import type Skeleton from "../models/enities/Skeleton";
import Toolbar from "../models/Toolbar";

export default function createSkeletonFromToolbar(toolbarIndex: number, skeleton: () => Skeleton) {
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
        }, { once: true })

    })
}