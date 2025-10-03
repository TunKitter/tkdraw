import Selecto from 'selecto';
import G from '../global';

export function initSelecto() {
  G.selecto = new Selecto({
    dragContainer: G.app_element,
    selectableTargets: ['.skeleton'],
    // hitRate: 0,
    selectByClick: true,
    selectFromInside: false,
    toggleContinueSelect: ['shift'],
    ratio: 0
  });

  G.selecto.on('dragStart', e => {
    const target = e.inputEvent.target;
    if (G.moveable.isMoveableElement(target)) e.stop();
  });

  G.selecto.on('selectEnd', e => {
    if (e.isDragStart) {
      e.inputEvent.preventDefault();
      G.moveable.waitToChangeTarget().then(() => {
        G.moveable.dragStart(e.inputEvent);
      });
    }
    G.moveable.target = e.selected;
  });
}

export function getSelectionElement() {
  return document.querySelector('.selecto-selection');
}
