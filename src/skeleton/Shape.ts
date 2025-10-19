import type { SelectoEvents } from 'selecto';
import G from '../global';
import { setResizeable, setScalable } from '../lib/moveable';
import { getSelectionElement } from '../lib/selecto';
import Skeleton from '../model/Skeleton';
import SkeletonProperty from '../model/SkeletonProperty';
import Toolbar, { _toolbar } from '../toolbar';
import toggleShowPropertyPanelWithSkeleton from '../flow/ToggleShowPropertyPanelWithSkeleton';
import VariantPropertyItem from '../property_items/variant';
import {
  handleCreateBackground,
  handleCreateCustomCss,
  handleCreateLayer,
  handleCreateOpacity
} from './Text';
function handleCreateShape(prop: SkeletonProperty, text_: Skeleton) {
  const div = document.createElement('div');
  Object.assign(div.style, {
    width: '1.4em',
    height: '1.4em',
    margin: '5px',
    borderRadius: '4px'
  });
  const item = new VariantPropertyItem('Shape', div, text_);
  item.addVariant({ clipPath: 'none', background: '#6F00FF' }, 'none');

  item.addVariant(
    { clipPath: 'circle(50% at 50% 50%)', background: '#F4991A' },
    'circle(50% at 50% 50%)'
  );

  item.addVariant(
    { clipPath: 'polygon(-1% 0%, 50% 86.6%, 100% 0%)', background: '#E45A92' },
    'polygon(-1% 0%, 50% 86.6%, 100% 0%)'
  );

  item.addVariant(
    {
      clipPath: 'polygon(49% 0, 100% 50%, 50% 100%, 0 50%)',
      background: '#19183B'
    },
    'polygon(49% 0, 100% 50%, 50% 100%, 0 50%)'
  );

  item.handleChange((value, referenceElement) => {
    handleBehaviorMoveableShapeSkeletonSelect(
      referenceElement.getELement(),
      value
    );
    referenceElement.getELement().style.clipPath = value;
  });
  prop.addItem(item);
}
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
  handleCreateShape(prop, skeleton);
  handleCreateBackground(prop, skeleton);
  handleCreateOpacity(prop, skeleton);
  handleCreateLayer(prop, skeleton);
  handleCreateCustomCss(prop, skeleton);
  return [skeleton, prop] as [Skeleton, SkeletonProperty];
}

export default function createShapeSkeletonAndPropertyFlow() {
  handleBehaviorMoveableShapeSkeleton();
  Toolbar.getInstance()
    .getChildAt(1)
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
        setResizeable();
        toggleShowPropertyPanelWithSkeleton(elements[0], elements[1]);
        //@ts-ignore
        toobar_btn.target!.classList.remove('btn-selected');
        _toolbar.removeListener();
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
