const renderDirections = ["nw", "ne", "sw", "se"];
function createNode(obj) {
    obj.classList.add('btn-selected')
    const element = document.createElement('div')
    document.querySelector('.root').addEventListener('click', function (e) {
        element.className = "target"
        element.style.left = `${e.clientX}px`
        element.style.top = `${e.clientY}px`
        element.style.transform = `translate(-50%, -50%)`
        element.innerHTML = "Target"
        element.addEventListener('dblclick', function (e) {
            e.stopPropagation();
            element.innerHTML = `<input type="text" value="${element.innerHTML}" />`;
            element.querySelector('input').focus();
            element.querySelector('input').addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    element.innerHTML = e.target.value;
                }
            })
            element.querySelector('input').addEventListener('blur', function (e) {
                element.innerHTML = e.target.value;
            })
        })
        document.querySelector(".container").appendChild(element)
        obj.classList.remove('btn-selected')
    }, { once: true });
};
const selectoRef = new Selecto({
    container: document.querySelector(`.select`),
    dragContainer: document.querySelector(`.root`),
    selectableTargets: [".target"],
    hitRate: 0,
    selectByClick: true,
    selectFromInside: false,
    toggleContinueSelect: ["shift"],
    ratio: 0
});
const moveable = new Moveable(document.querySelector(`.container`), {
    scalable: true,
    draggable: true,
    resizable: true,
    renderDirections: renderDirections,
    pinchable: true,
    useResizeObserver: true,
    origin: false,
    edge: true,
});
moveable.on("resize", ({ target, width, height, dist, delta, clientX, clientY }) => {
    // console.log("onResize", target);
    delta[0] && (target.style.width = `${width}px`);
    delta[1] && (target.style.height = `${height}px`);
    // target.style.fontSize = `${Math.min(width, height) / 4}px`;
    // console.log(target);

})


moveable.on("drag", e => {
    e.target.style.transform = e.transform;
})

moveable.on("clickGroup", e => {
    selectoRef.clickTarget(e.inputEvent, e.inputTarget);
});
moveable.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable.on("dragGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.transform = ev.transform;
    });
});
selectoRef.on("dragStart", e => {
    const target = e.inputEvent.target;
    if (moveable.isMoveableElement(target)) e.stop();
});
selectoRef.on("selectEnd", e => {
    if (e.isDragStart) {
        e.inputEvent.preventDefault();
        moveable.waitToChangeTarget().then(() => {
            moveable.dragStart(e.inputEvent);
        });
    }
    moveable.target = e.selected;
});