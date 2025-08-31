export default class Toolbar {
    private static instance: Toolbar;
    private html: HTMLElement;
    private constructor() {
        const element = document.createElement('div');
        element.className = 'toolbar';
        this.html = element
    }
    public static getInstance(): Toolbar {
        if (!Toolbar.instance) Toolbar.instance = new Toolbar();
        return Toolbar.instance;
    }
    add(text: string): void {
        const btn = document.createElement('button');
        btn.innerText = text;
        this.html.appendChild(btn);
    }
    getElement() {
        return this.html;
    }
    getChildAt(index: number) {
        return this.html.children[index] as HTMLElement;
    }
    render() {
        document.body.appendChild(this.html);
    }
}

export function initToolbar() {
    const toolbar = Toolbar.getInstance();
    toolbar.add('Text');
    toolbar.add('Image');
    toolbar.add('Shape');
    toolbar.add('Shape');
    toolbar.add('Shape');
    toolbar.add('Shape');
    toolbar.add('Shape');
    toolbar.render()
}