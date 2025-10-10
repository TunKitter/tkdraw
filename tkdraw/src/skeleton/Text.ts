import toggleShowPropertyPanelWithSkeleton from '../flow/ToggleShowPropertyPanelWithSkeleton';
import G from '../global';
import { setScalable } from '../lib/moveable';
import Skeleton from '../model/Skeleton';
import SkeletonProperty from '../model/SkeletonProperty';
import RangePropertyItem from '../property_items/range';
import SelectorPropertyItem from '../property_items/select';
import VariantPropertyItem from '../property_items/variant';
import Toolbar, { _toolbar } from '../toolbar';
import {
  doubleClickToEdit,
  listenerToggle,
  setPositionAtCursor
} from '../utility';

function createColorPickerElement(
  callback: (value: string) => void
): HTMLInputElement {
  const picker = document.createElement('input');
  picker.type = 'color';
  Object.assign(picker.style, {
    border: 'none',
    background: 'transparent',
    width: '2em',
    height: '2em',
    transform: 'translateX(0.5em)'
  });

  // @ts-ignore
  picker.addEventListener('input', e => callback(e.target!.value));
  return picker;
}

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
function handleCreateColor(prop: SkeletonProperty, text_: Skeleton) {
  const div = document.createElement('div');
  Object.assign(div.style, {
    width: '2em',
    height: '2em',
    borderRadius: '50%'
  });
  const item = new VariantPropertyItem('Color', div, text_);
  item.addVariant({ background: 'white', border: '2px solid black' }, 'white');
  item.addVariant({ background: 'black' }, 'black');
  item.addVariant({ background: '#FFD93D' }, '#FFD93D');
  item.addVariant({ background: '#E4004B' }, '#E4004B');
  item.addVariant({ background: '#33A1E0' }, '#33A1E0');
  const picker = createColorPickerElement(value => {
    text_.getELement().style.color = value;
  });
  item.getElement().appendChild(picker);
  item.handleChange((value, referenceElement) => {
    referenceElement.getELement().style.color = value;
  });
  prop.addItem(item);
}
export function handleCreateBackground(
  prop: SkeletonProperty,
  text_: Skeleton
) {
  const div = document.createElement('div');
  Object.assign(div.style, {
    width: '2em',
    height: '2em',
    borderRadius: '50%'
  });
  const item = new VariantPropertyItem('Background', div, text_);
  item.addVariant({ background: 'white', border: '2px solid black' }, 'white');
  item.addVariant({ background: 'black' }, 'black');
  item.addVariant({ background: '#FFD93D' }, '#FFD93D');
  item.addVariant({ background: '#E4004B' }, '#E4004B');
  item.addVariant({ background: '#33A1E0' }, '#33A1E0');
  const picker = createColorPickerElement(value => {
    text_.getELement().style.backgroundColor = value;
  });
  item.getElement().appendChild(picker);
  item.handleChange((value, referenceElement) => {
    referenceElement.getELement().style.backgroundColor = value;
  });
  prop.addItem(item);
}
export function handleCreateOpacity(prop: SkeletonProperty, text_: Skeleton) {
  const item = new RangePropertyItem('Opacity', 0, 100, text_);
  item.setValue(100);
  item.setDisplay(true);
  item.handleChange((value, referenceElement) => {
    referenceElement.getELement().style.opacity = value + '%';
  });
  prop.addItem(item);
}
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
export function handleCreateLayer(prop: SkeletonProperty, text_: Skeleton) {
  const div = document.createElement('div');
  Object.assign(div.style, {
    width: '1.4em',
    height: '1.4em',
    margin: '5px',
    borderRadius: '4px',
    background: 'black'
  });
  const item = new VariantPropertyItem('Layer', div, text_);
  item.addVariant({ boxShadow: '2px 2px #ff73ea' }, 'min');
  item.addVariant({ boxShadow: '4px 4px #ff73ea' }, '-1');
  item.addVariant({ boxShadow: '3px 3px black', background: '#ff73ea' }, '1');
  item.addVariant({ boxShadow: '3px 5px black', background: '#ff73ea' }, 'max');
  item.getElement().style.justifyContent = 'flex-start';
  item.handleChange((value, referenceElement) => {
    let zIndex = 0;
    switch (value) {
      case 'min':
        zIndex = --G.min_z_index;
        break;
      case 'max':
        zIndex = ++G.max_z_index;
        break;
      default:
        zIndex =
          (parseInt(referenceElement.getELement().style.zIndex) || 0) +
          parseInt(value || 0);
        break;
    }
    if (zIndex > G.max_z_index) G.max_z_index = ++zIndex;
    else if (zIndex < G.min_z_index) G.min_z_index = --zIndex;
    referenceElement.getELement().style.zIndex = zIndex.toString();
  });
  prop.addItem(item);
}
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
  handleCreateColor(prop, skeleton);
  handleCreateBackground(prop, skeleton);
  handleCreateOpacity(prop, skeleton);
  handleCreateLayer(prop, skeleton);
  return [skeleton, prop] as [Skeleton, SkeletonProperty];
}

export default function createTextSkeletonAndPropertyFlow() {
  handleBehaviorMoveableTextSkeleton();
  Toolbar.getInstance()
    .getChildAt(0)
    .addEventListener('click', function (toobar_btn) {
      const listener = listenerToggle(
        G.app_element,
        function (e: PointerEvent) {
          const [skeleton, prop] = generateTextSkeletonAndItsProperty();
          skeleton.render();
          prop.render();
          setPositionAtCursor(skeleton.getELement(), e);
          doubleClickToEdit(skeleton.getELement());
          G.moveable.target = skeleton.getELement();
          setScalable();
          toggleShowPropertyPanelWithSkeleton(skeleton, prop);
          //@ts-ignore
          toobar_btn.target.classList.remove('btn-selected');
        },
        true
      );
      listener[0]();
      _toolbar.removeListener = () => {
        listener[1]();
        _toolbar.removeListener = () => {};
      };
    });
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
