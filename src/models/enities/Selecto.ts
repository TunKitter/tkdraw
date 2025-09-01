import Selecto from "selecto";
import G from "../../global";
export function initSelecto() {
    G.selecto = new Selecto({
        dragContainer: document.querySelector(`.root`),
        selectableTargets: [".skeleton"],
        hitRate: 0,
        selectByClick: true,
        selectFromInside: false,
        toggleContinueSelect: ["shift"],
        ratio: 0
    });

    G.selecto.on("dragStart", e => {
        const target = e.inputEvent.target;
        if (G.moveable.isMoveableElement(target)) e.stop();
    });
    G.selecto.on("selectEnd", e => {
        document.querySelector('.tools')!.style.display = e.selected.length ? 'block' : 'none';
        if (e.isDragStart) {
            e.inputEvent.preventDefault();
            G.moveable.waitToChangeTarget().then(() => {
                G.moveable.dragStart(e.inputEvent);
            });
        }
        G.moveable.target = e.selected;
    });
}