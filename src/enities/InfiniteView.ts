import InfiniteViewer from "infinite-viewer";
import G from "../global";


export function initInfiniteView() {

    G.infiniteView = new InfiniteViewer(document.querySelector('.root')!, {
        displayHorizontalScroll: false,
        displayVerticalScroll: false,
        useAutoZoom: true,
    });

    // inf.on('pinch', (e) => {
    //     document.querySelector('.zoom-level').innerHTML = String(Math.floor(e.zoom * 100)) + '%';
    // })
}