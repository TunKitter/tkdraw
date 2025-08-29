import ElementNode from "../../core/ElementNode";

export default function createTextNode() {
    const element = document.createElement('div');
    element.innerText = 'This is a text';
    return new ElementNode(element)
}