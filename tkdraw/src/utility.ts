import G from './global';

export function getHTML(selector: string, isRemove = false) {
  const item = G.html.querySelector(selector) as HTMLElement;
  if (isRemove) item.remove();
  return item.cloneNode(true) as HTMLElement;
}

export function getRandomString(length: number = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    if (i === 0) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    } else {
      result +=
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
          Math.floor(
            Math.random() *
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                .length
          )
        );
    }
  }
  return result;
}

export function setPositionAtCursor(element: HTMLElement, mouse: MouseEvent) {
  let x = G.infinite_viewer.getScrollLeft();
  let y = G.infinite_viewer.getScrollTop();
  x += mouse.clientX / G.infinite_viewer.getZoomX();
  y += mouse.clientY / G.infinite_viewer.getZoomY();
  Object.assign(element.style, {
    position: 'fixed',
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

export function listenerToggle(
  element: HTMLElement,
  callback: (e: any) => void,
  isOnce: boolean = false
) {
  return [
    () => {
      element.addEventListener('click', callback, { once: isOnce });
    },
    () => {
      element.removeEventListener('click', callback);
    }
  ];
}
