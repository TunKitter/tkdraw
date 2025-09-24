//@ts-nocheck
import type InfiniteViewer from "infinite-viewer"
import type Moveable from "moveable"
import type Selecto from "selecto"

const G = {
    moveable: null as Moveable,
    selecto: null as Selecto,
    infiniteView: null as InfiniteViewer,
    html: { skeleton_property: null as HTMLElement },
    min_z_index: '-1',
    max_z_index: '1'
}
export default G