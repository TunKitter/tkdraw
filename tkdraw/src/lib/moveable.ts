import Moveable from 'moveable';
import G from '../global';
export function initMoveable() {
  G.moveable = new Moveable(G.wrapper_element, {
    // scalable: true,
    draggable: true,
    resizable: true,
    renderDirections: ['nw', 'ne', 'sw', 'se'],
    // pinchable: true,
    // roundable: true,
    // keepRatio: true,
    // checkInput: true,
    rotatable: true,
    useResizeObserver: true,
    origin: false,
    edge: true,
    padding: { top: 6, right: 7, bottom: 8, left: 8 }
  });

  G.moveable.on('resize', ({ target, width, height, delta }) => {
    delta[0] && (target.style.width = `${width}px`);
    delta[1] && (target.style.height = `${height}px`);
  });

  G.moveable.on('scale', e => {
    e.target.style.transform = e.afterTransform;
  });
  G.moveable.on('rotate', e => {
    e.target.style.transform = e.afterTransform;
  });
  // G.moveable.on("round", (e) => {
  // e.target.style.borderRadius = e.borderRadius;
  // });

  G.moveable.on('drag', e => {
    e.target.style.transform = e.transform;
  });

  //   G.moveable.on('clickGroup', e => {
  // G.selecto.clickTarget(e.inputEvent, e.inputTarget);
  //   });

  //   G.moveable.on('dragGroup', e => {
  //     e.events.forEach(ev => {
  //       ev.target.style.transform = ev.transform;
  //     });
  //   });

  //   G.moveable.on('resizeGroup', ({ events }) => {
  //     events.forEach(ev => {
  //       ev.target.style.width = `${ev.width}px`;
  //       ev.target.style.height = `${ev.height}px`;
  //       ev.target.style.transform = ev.drag.transform;
  //     });
  //   });
}
export function setResizeable() {
  G.moveable.resizable = false;
  G.moveable.scalable = true;
  G.moveable.keepRatio = false;
  // G.moveable.pinchable = true;
  // G.moveable.pinchOutside = true;
  // G.moveable.rotatable = true;
}
export function setScalable() {
  G.moveable.resizable = false;
  G.moveable.scalable = true;
  G.moveable.keepRatio = true;
}
