import type { SelectoEvents } from 'selecto';
import G from '../global';
import { setResizeable } from '../lib/moveable';
import { getSelectionElement } from '../lib/selecto';
import Skeleton from '../model/Skeleton';
import SkeletonProperty from '../model/SkeletonProperty';
import Toolbar, { _toolbar } from '../toolbar';
import toggleShowPropertyPanelWithSkeleton from '../flow/ToggleShowPropertyPanelWithSkeleton';
import VariantPropertyItem from '../property_items/variant';
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
    { clipPath: 'circle(49% at 50% 50%)', background: '#F4991A' },
    'circle(49% at 50% 50%)'
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
    // handleBehaviorMoveableShapeSkeletonSelect(referenceElement, value[0]);
    referenceElement.getELement().style.clipPath = value;
  });
  prop.addItem(item);
}
// function handleCreateColor(prop: SkeletonProperty, text_: Skeleton) {
//   const div = document.createElement('div');
//   Object.assign(div.style, {
//     width: '2em',
//     height: '2em',
//     borderRadius: '50%'
//   });
//   const item = new VariantPropertyItem('Color', div, text_);
//   item.addVariant({ background: 'white', border: '2px solid black' }, 'white');
//   item.addVariant({ background: 'black' }, 'black');
//   item.addVariant({ background: '#FFD93D' }, '#FFD93D');
//   item.addVariant({ background: '#E4004B' }, '#E4004B');
//   item.addVariant({ background: '#33A1E0' }, '#33A1E0');
//   const picker = createColorPickerElement(value => {
//     text_.getELement().style.color = value;
//   });
//   item.getElement().appendChild(picker);
//   item.handleChange((value, referenceElement) => {
//     referenceElement.getELement().style.color = value;
//   });
//   prop.addItem(item);
// }
// export function handleCreateBackground(
//   prop: SkeletonProperty,
//   text_: Skeleton
// ) {
//   const div = document.createElement('div');
//   Object.assign(div.style, {
//     width: '2em',
//     height: '2em',
//     borderRadius: '50%'
//   });
//   const item = new VariantPropertyItem('Background', div, text_);
//   item.addVariant({ background: 'white', border: '2px solid black' }, 'white');
//   item.addVariant({ background: 'black' }, 'black');
//   item.addVariant({ background: '#FFD93D' }, '#FFD93D');
//   item.addVariant({ background: '#E4004B' }, '#E4004B');
//   item.addVariant({ background: '#33A1E0' }, '#33A1E0');
//   const picker = createColorPickerElement(value => {
//     text_.getELement().style.backgroundColor = value;
//   });
//   item.getElement().appendChild(picker);
//   item.handleChange((value, referenceElement) => {
//     referenceElement.getELement().style.backgroundColor = value;
//   });
//   prop.addItem(item);
// }
// export function handleCreateOpacity(prop: SkeletonProperty, text_: Skeleton) {
//   const item = new RangePropertyItem('Opacity', 0, 100, text_);
//   item.setValue(100);
//   item.setDisplay(true);
//   item.handleChange((value, referenceElement) => {
//     referenceElement.getELement().style.opacity = value + '%';
//   });
//   prop.addItem(item);
// }
// export function handleCreateCustomCss(prop: SkeletonProperty, text_: Skeleton) {
//   const item = new EditorPropertyItem('Custom Css', text_);
//   const description = document.createElement('p');
//   description.innerHTML =
//     "Add <span style='color: #ff73ea;font-size: 1em;'>!important</span> to the end of your css property to make it override above properties.";
//   Object.assign(description.style, { color: 'gray', fontSize: '0.8em' });
//   item
//     .getWrapper()
//     .querySelector('.skeleton_property_item_label')!
//     .insertAdjacentElement('afterend', description);
//   let temp_styles = document.createElement('style');
//   const className = getRandomString();
//   text_.getELement().classList.add(className);
//   item.handleChange(function (value) {
//     value = `div.${className}.skeleton {${value}}`;
//     temp_styles.remove();
//     const style = document.createElement('style');
//     style.type = 'text/css';
//     //@ts-ignore
//     if (style.styleSheet) style.styleSheet.cssText = value;
//     else style.appendChild(document.createTextNode(value));
//     document.head.appendChild(style);
//     temp_styles = style;
//   });
//   prop.addItem(item);
// }
// export function handleCreateLayer(prop: SkeletonProperty, text_: Skeleton) {
//   const div = document.createElement('div');
//   Object.assign(div.style, {
//     width: '1.4em',
//     height: '1.4em',
//     margin: '5px',
//     borderRadius: '4px',
//     background: 'black'
//   });
//   const item = new VariantPropertyItem('Layer', div, text_);
//   item.addVariant({ boxShadow: '2px 2px #ff73ea' }, 'min');
//   item.addVariant({ boxShadow: '4px 4px #ff73ea' }, '-1');
//   item.addVariant({ boxShadow: '3px 3px black', background: '#ff73ea' }, '1');
//   item.addVariant({ boxShadow: '3px 5px black', background: '#ff73ea' }, 'max');
//   item.getElement().style.justifyContent = 'flex-start';
//   item.handleChange((value, referenceElement) => {
//     let zIndex = 0;
//     switch (value) {
//       case 'min':
//         zIndex = --G.min_z_index;
//         break;
//       case 'max':
//         zIndex = ++G.max_z_index;
//         break;
//       default:
//         zIndex =
//           (parseInt(referenceElement.getELement().style.zIndex) || 0) +
//           parseInt(value || 0);
//         break;
//     }
//     if (zIndex > G.max_z_index) G.max_z_index = ++zIndex;
//     else if (zIndex < G.min_z_index) G.min_z_index = --zIndex;
//     referenceElement.getELement().style.zIndex = zIndex.toString();
//   });
//   prop.addItem(item);
// }
function handleBehaviorMoveableShapeSkeleton() {
  G.moveable.on(
    'click',
    e => e.target.classList.contains('shape_skeleton') && setResizeable()
  );
}
function generateShapeSkeletonAndItsProperty() {
  const text = document.createElement('div');
  text.className = 'shape_skeleton';
  const skeleton = new Skeleton(text);
  const prop = new SkeletonProperty();
  handleCreateShape(prop, skeleton);
  // handleCreateFont(prop, skeleton);
  // handleCreateColor(prop, skeleton);
  // handleCreateBackground(prop, skeleton);
  // handleCreateOpacity(prop, skeleton);
  // handleCreateLayer(prop, skeleton);
  // handleCreateCustomCss(prop, skeleton);
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
      // const listener = listenerToggle(
      //   G.app_element,
      //   'click',
      //   function (e: PointerEvent) {
      //     const [skeleton, prop] = generateShapeSkeletonAndItsProperty();
      //     skeleton.render();
      //     prop.render();
      //     setPositionAtCursor(skeleton.getELement(), e);
      //     // doubleClickToEdit(skeleton.getELement());
      //     G.moveable.target = skeleton.getELement();
      //     // setScalable();
      //     // toggleShowPropertyPanelWithSkeleton(skeleton, prop);
      //     //@ts-ignore
      //     toobar_btn.target.classList.remove('btn-selected');
      //   },
      //   true
      // );
      // listener[0]();
      // _toolbar.removeListener = () => {
      //   listener[1]();
      //   _toolbar.removeListener = () => {};
      // };
    });
}
