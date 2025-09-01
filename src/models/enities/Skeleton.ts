import G from "../../global";

class Skeleton {
    private html: HTMLElement;
    private wrapper?: HTMLElement;
    constructor(html: HTMLElement, wrapper: HTMLElement) {
        this.html = html;
        this.wrapper = wrapper;
    }
    getELement() {
        return this.html;
    }
    render() {
        this.wrapper!.appendChild(this.html);
    }
    renderAtCursor(e: MouseEvent) {
        let x = G.infiniteView.getScrollLeft()
        let y = G.infiniteView.getScrollTop()
        x += e.clientX / G.infiniteView.getZoomX()
        y += e.clientY / G.infiniteView.getZoomY()
        Object.assign(this.getELement().style, {
            top: y + 'px',
            left: x + 'px',
            transform: 'translate(-50%, -50%)',
        })
        this.render();
    }
    remove() {
        this.html.remove();
    }
    doubleClickToEdit() {
        this.getELement().oncontextmenu = e => e.preventDefault();
        this.getELement().ondblclick = event => {
            event.stopPropagation();
            this.getELement().setAttribute('contenteditable', 'true');
            this.getELement().focus();
        };
        this.getELement().onkeydown = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.getELement().setAttribute('contenteditable', 'false');
                // G.moveable.target = null
            }
        }
    }
}
export default Skeleton;