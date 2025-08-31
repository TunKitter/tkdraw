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
    remove() {
        this.html.remove();
    }
}
export default Skeleton;