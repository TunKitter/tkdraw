import ItemProperty from "../../core/ItemProperty";

export default function RoundNodeProperty() {
    const item = new ItemProperty(document.createElement('div'), document.createElement('div'))
    item.callback = (element) => {
        element.style.borderRadius = '50%';
    }
    return item;
}