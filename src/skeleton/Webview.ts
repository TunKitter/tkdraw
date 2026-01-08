import type { SelectoEvents } from 'selecto';
import G from '../global';
import { setResizeable, setScalable } from '../lib/moveable';
import { getSelectionElement } from '../lib/selecto';
import Skeleton from '../model/Skeleton';
import SkeletonProperty from '../model/SkeletonProperty';
import Toolbar, { _toolbar } from '../toolbar';
import toggleShowPropertyPanelWithSkeleton from '../flow/ToggleShowPropertyPanelWithSkeleton';
import {
  handleCreateCustomCss,
  handleCreateLayer,
  handleCreateOpacity
} from './Text';
import { isValidHttpUrl } from '../utility';

function handleBehaviorMoveableShapeSkeletonSelect(
  referenceElement: HTMLElement,
  _value: string
) {
  if (!referenceElement.classList.contains('shape_skeleton')) return;
  if (_value.indexOf('circle') == 0) {
    // @ts-ignore
    let ori_scale = referenceElement.style.transform;
    let _scale = ori_scale
      .substring(
        ori_scale.indexOf('scale('),
        ori_scale.indexOf(')', ori_scale.indexOf('scale')) + 1
      )
      .replace('scale(', '')
      .replace(')', '')
      .replaceAll(' ', '')
      .split(',');
    if (
      isNaN(parseInt(_scale[0]) + parseInt(_scale[1])) ||
      typeof (parseInt(_scale[0]) + parseInt(_scale[1])) !== 'number' ||
      _scale.length !== 2
    )
      _scale = [1, 1];
    const radius = Math.min(
      parseFloat(referenceElement.style.width.replace('px', '')) * _scale[0],
      parseFloat(referenceElement.style.height.replace('px', '')) * _scale[1]
    );

    referenceElement.style.width = radius + 'px';
    referenceElement.style.height = radius + 'px';
    referenceElement.style.transform = ori_scale.replace(
      `scale(${_scale[0]}, ${_scale[1]})`,
      'scale(1,1)'
    );
    setScalable();
    G.moveable.rotatable = false;
  } else setResizeable();
}
function handleBehaviorMoveableShapeSkeleton() {
  G.moveable.on('click', e => {
    if (e.target.classList.contains('shape_skeleton')) {
      setResizeable();
      handleBehaviorMoveableShapeSkeletonSelect(
        e.target as HTMLElement,
        e.target.style.clipPath
      );
    }
  });
}
function generateShapeSkeletonAndItsProperty() {
  const text = document.createElement('div');
  text.className = 'shape_skeleton';
  const skeleton = new Skeleton(text);
  const prop = new SkeletonProperty();
  handleCreateOpacity(prop, skeleton);
  handleCreateLayer(prop, skeleton);
  handleCreateCustomCss(prop, skeleton);
  return [skeleton, prop] as [Skeleton, SkeletonProperty];
}

export default function createWebviewSkeletonAndPropertyFlow() {
  handleBehaviorMoveableShapeSkeleton();
  Toolbar.getInstance()
    .getChildAt(3)
    .addEventListener('click', function (toobar_btn) {
      function prepareCreatingShape() {
        getSelectionElement()?.classList.add('select_selection_shape');
      }
      function finishCreatingShape(e: SelectoEvents['selectEnd']) {
        if (e.rect.width === 0 || e.rect.height === 0) return;
        const elements = generateShapeSkeletonAndItsProperty();
        const div = elements[0].getELement();
        div.style.position = 'fixed';
        let x = G.infinite_viewer.getScrollLeft();
        let y = G.infinite_viewer.getScrollTop();
        x += e.rect.left / G.infinite_viewer.getZoomX();
        y += e.rect.top / G.infinite_viewer.getZoomY();
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.style.width = `${e.rect.width / G.infinite_viewer.getZoomX()}px`;
        div.style.height = `${e.rect.height / G.infinite_viewer.getZoomY()}px`;
        elements[0].render();
        elements[1].render();
        G.moveable.target = elements[0].getELement();
        // setResizeable();
        // setScalable()
        toggleShowPropertyPanelWithSkeleton(elements[0], elements[1]);
        //@ts-ignore
        toobar_btn.target!.classList.remove('btn-selected');
        _toolbar.removeListener();
        const url = prompt('Enter an URL (some websites might not work):') as string;
        if(!isValidHttpUrl(url)) {
          alert('Invalid Youtube URL')
          div.remove()
          document.querySelector('.skeleton_property')!.remove()
          G.moveable.target = null
          return
        }
        const overlay = document.createElement('div')
        Object.assign(overlay.style,{
          position:'absolute',
          top:0,
          left:0,
          right:0,
          bottom:0,
          zIndex:9999,
          background:'#000000b5',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          color:'white',
          cursor:'pointer'
        });
        overlay.textContent ='Double click to interact'
        overlay.ondblclick = () => {
          overlay.style.zIndex = '-9999'
          G.selecto.on('selectEnd', () => overlay.style.zIndex = '9999');
        }
        div.innerHTML = `<iframe src="${url}" width="100%" height="100%"></iframe>`
        div.appendChild(overlay)
      }

      G.selecto.on('selectStart', prepareCreatingShape);
      G.selecto.on('selectEnd', finishCreatingShape);

      _toolbar.removeListener = () => {
        G.selecto.off('selectStart', prepareCreatingShape);
        G.selecto.off('selectEnd', finishCreatingShape);
        getSelectionElement()?.classList.remove('select_selection_shape');
      };
    });
}
