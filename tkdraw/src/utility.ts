import G from './global';

export function setPositionAtCursor(element: HTMLElement, mouse: MouseEvent) {
  let x = G.infinite_viewer.getScrollLeft();
  let y = G.infinite_viewer.getScrollTop();
  x += mouse.clientX / G.infinite_viewer.getZoomX();
  y += mouse.clientY / G.infinite_viewer.getZoomY();
  Object.assign(element.style, {
    position: 'absolute',
    top: y + 'px',
    left: x + 'px',
    transform: 'translate(-50%, -50%)'
  });
}

export function doubleClickToEdit(element: HTMLElement) {
  //   element.oncontextmenu = e => e.preventDefault();
  element.ondblclick = event => {
    event.stopPropagation();
    element.setAttribute('contenteditable', 'true');
    element.focus();
  };
  element.onkeydown = event => {
    if (event.key === 'Enter') {
      if (event.shiftKey) return;
      event.preventDefault();
      element.setAttribute('contenteditable', 'false');
    }
  };
}
