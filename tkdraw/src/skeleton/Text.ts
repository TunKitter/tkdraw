import createSkeletonFromToolbarAndProperty from '../flow/CreateSkeletonAndPropertyFromToolbarFlow';
import G from '../global';
import { setScalable } from '../lib/moveable';
import Skeleton from '../model/Skeleton';
import SkeletonProperty from '../model/SkeletonProperty';
import SelectorPropertyItem from '../property_items/select';
import { doubleClickToEdit, setPositionAtCursor } from '../utility';

function handleCreateFont(prop: SkeletonProperty, text_: Skeleton) {
  const item = new SelectorPropertyItem('Font', text_);
  item.addOption('Times New Roman', 'times-new-roman');
  item.addOption('Arial', 'arial');
  item.addOption('Courier New', 'courier-new');
  item.addOption('Georgia', 'georgia');
  item.addOption('Verdana', 'verdana');
  item.handleChange((value, referenceElement) => {
    // @ts-ignore
    referenceElement.getELement().style.fontFamily = value;
  });
  prop.addItem(item);
}
// function handleCreateColor(prop: SkeletonProperty, text_: Skeleton) {
//   const div = document.createElement('div');
//   div.className = 'color_picker_item';
//   const item = new VariantPropertyItem(
//     'Color',
//     div,
//     ['background'],
//     text_.getELement()
//   );
//   item.addVariant('black');
//   const white_div = div.cloneNode(true);
//   Object.assign(white_div.style, {
//     background: 'white',
//     border: '2px solid black'
//   });
//   item.getElement().appendChild(white_div);
//   item.addVariant('#FFD93D');
//   item.addVariant('#E4004B');
//   item.addVariant('#33A1E0');
//   const picker = createColorPickerElement(value => {
//     text_.getELement().style.color = value;
//   });
//   item.getElement().appendChild(picker);
//   item.handleChange((value, referenceElement) =>
//     item
//       .getVariant()
//       .forEach(() => (referenceElement.style.color = value.shift()))
//   );
//   prop.addItem(item);
// }
// export function handleCreateBackground(
//   prop: SkeletonProperty,
//   text_: Skeleton
// ) {
//   const div = document.createElement('div');
//   div.className = 'color_picker_item';
//   const item = new VariantPropertyItem(
//     'Background',
//     div,
//     ['background'],
//     text_.getELement()
//   );
//   item.addVariant('black');
//   const white_div = div.cloneNode(true);
//   Object.assign(white_div.style, {
//     background: 'white',
//     border: '2px solid black'
//   });
//   item.getElement().appendChild(white_div);
//   item.addVariant('#FFD93D');
//   item.addVariant('#E4004B');
//   item.addVariant('#33A1E0');
//   const picker = createColorPickerElement(value => {
//     text_.getELement().style.background = value;
//   });
//   item.getElement().appendChild(picker);
//   item.handleChange((value, referenceElement) =>
//     item
//       .getVariant()
//       .forEach((e, i) => (referenceElement.style.background = value[i]))
//   );
//   prop.addItem(item);
// }
// export function handleCreateOpacity(prop: SkeletonProperty, text_: Skeleton) {
//   const item = new RangePropertyItem('Opacity', 0, 100, text_.getELement());
//   item.setValue(100);
//   item.handleChange((value, referenceElement) => {
//     referenceElement.style.opacity = value + '%';
//   });
//   prop.addItem(item);
// }
// export function handleCreateCustomCss(prop: SkeletonProperty, text_: Skeleton) {
//   const item = new EditorPropertyItem('Custom Css', text_.getELement());
//   const description = document.createElement('p');
//   description.innerHTML =
//     "Add <span style='color: #ff73ea;font-size: 1em;'>!important</span> to the end of your css property to make it override above properties.";
//   Object.assign(description.style, { color: 'gray', fontSize: '0.8em' });
//   item
//     .getWrapper()
//     .querySelector('h1')!
//     .insertAdjacentElement('afterend', description);
//   let temp_styles = document.createElement('style');
//   const className = getRandomString();
//   text_.getELement().classList.add(className);
//   item.handleChange(function (value) {
//     value = `div.${className}.skeleton {${value}}`;
//     temp_styles.remove();
//     const style = document.createElement('style');
//     style.type = 'text/css';
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
//   const item = new VariantPropertyItem(
//     'Layer',
//     div,
//     ['box-shadow', 'zindex'],
//     text_.getELement()
//   );
//   item.addVariant('2px 2px #ff73ea', 'min');
//   item.addVariant('4px 4px #ff73ea', '-1');
//   item.addVariant('3px 3px black', '1').style.background = '#ff73ea';
//   item.addVariant('3px 5px black', 'max').style.background = '#ff73ea';

//   item.handleChange((value, referenceElement) => {
//     let zIndex = 0;
//     switch (value[1]) {
//       case 'min':
//         zIndex = --G.min_z_index;
//         break;
//       case 'max':
//         zIndex = ++G.max_z_index;
//         break;
//       default:
//         zIndex =
//           (parseInt(referenceElement.style.zIndex) || 0) +
//           parseInt(value[1] || 0);
//         break;
//     }
//     if (zIndex > G.max_z_index) G.max_z_index = ++zIndex;
//     else if (zIndex < G.min_z_index) G.min_z_index = --zIndex;
//     referenceElement.style.zIndex = zIndex;
//   });
//   prop.addItem(item);
// }
function handleBehaviorMoveableTextSkeleton() {
  G.moveable.on(
    'click',
    e => e.target.classList.contains('text_skeleton') && setScalable()
  );
}
function generateTextSkeletonAndItsProperty() {
  const text = document.createElement('div');
  text.className = 'text_skeleton';
  text.textContent = 'Enter your text';
  const skeleton = new Skeleton(text);
  const prop = new SkeletonProperty();
  handleCreateFont(prop, skeleton);
  return [skeleton, prop] as [Skeleton, SkeletonProperty];
}

export default function createTextSkeletonAndPropertyFlow() {
  handleBehaviorMoveableTextSkeleton();
  createSkeletonFromToolbarAndProperty(
    0,
    generateTextSkeletonAndItsProperty,
    function (skeleton, prop, callback) {
      G.app_element.addEventListener(
        'click',
        function (e) {
          skeleton.render();
          prop.render();
          setPositionAtCursor(skeleton.getELement(), e);
          doubleClickToEdit(skeleton.getELement());
          // console.log(G.moveable.target);
          callback();
          setScalable();
        },
        { once: true }
      );
    }
  );
  //   createSkeletonFromToolbarAndProperty(0, () => {
  //     const prop = new SkeletonProperty();
  //     const text_ = createTextSkeleton('Enter your text');
  //     handleCreateFont(prop, text_);
  //     handleCreateColor(prop, text_);
  //     handleCreateBackground(prop, text_);
  //     handleCreateLayer(prop, text_);
  //     handleCreateOpacity(prop, text_);
  //     handleCreateCustomCss(prop, text_);
  //     text_.doubleClickToEdit();
  //     return [text_, prop];
  //   });
}
