const renderDirections = ["nw", "ne", "sw", "se"];
const parent = document.querySelector(`.container`);
const children = document.querySelectorAll(`.target`);
let zoom = panzoom(parent, { maxZoom: 2, minZoom: 0.1 })
children.forEach(child => {

    child.onclick = function (e) {
        e.stopPropagation()
        zoom && zoom.pause()
        const moveable = new Moveable(parent, {
            target: child,
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
            console.log("onResize", target);
            delta[0] && (target.style.width = `${width}px`);
            delta[1] && (target.style.height = `${height}px`);
            target.style.fontSize = `${Math.min(width, height) / 4}px`;
        })

        moveable.on("drag", e => {
            e.target.style.transform = e.transform;
        })
        document.body.onclick = function () {
            moveable.destroy()
            zoom.resume()
        }

    }

})