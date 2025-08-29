export default class ElementNode {
    private _element: HTMLElement;
    constructor(element: HTMLElement) {
        this._element = element;
    }
    render() {
        document.body.appendChild(this._element);
    }
    remove() {
        this._element.remove();
    }
    get element() {
        return this._element;
    }
}