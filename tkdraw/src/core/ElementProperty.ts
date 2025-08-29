import ItemProperty from "./ItemProperty";

export default class ElementProperty {
    wrapper: HTMLElement;
    items: ItemProperty[];
    constructor(items: ItemProperty[]) {
        this.wrapper = document.createElement('div');
        this.wrapper.innerHTML = '<h1>This is a property</h1>';
        this.items = items
        this.items.forEach(item => this.wrapper.appendChild(item.element));
    }
    render() { document.body.appendChild(this.wrapper) }
    show() { this.wrapper.style.display = 'block' }
    hide() { this.wrapper.style.display = 'none' }
}