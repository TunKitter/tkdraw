export default class ItemProperty {
    private _nodeItem: HTMLElement;
    private _element: HTMLElement;
    _callback: (element: HTMLElement) => void = () => { throw new Error("Callback not set") };
    constructor(element: HTMLElement, nodeItem: HTMLElement) {
        this._element = element;
        this._nodeItem = nodeItem;
    }
    get nodeItem() {
        return this._nodeItem;
    }
    get element() {
        return this._element;
    }
    get callback() {
        return () => this._callback(this._element);
    }
    set callback(cb: (element: HTMLElement) => void) {
        this._callback = cb;
    }
}