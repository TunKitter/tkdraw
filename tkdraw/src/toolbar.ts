export default class Toolbar {
  private static instance: Toolbar;
  private element: HTMLElement;
  private constructor() {
    const element = document.createElement('div');
    element.id = 'toolbar';
    element.className = 'center non_selectable';
    this.element = element;
  }
  public static getInstance(): Toolbar {
    if (!Toolbar.instance) Toolbar.instance = new Toolbar();
    return Toolbar.instance;
  }
  add(text: string): void {
    const btn = document.createElement('button');
    btn.appendChild(document.createTextNode(text));
    this.element.appendChild(btn);
  }
  getElement() {
    return this.element;
  }
  getChildAt(index: number) {
    return this.element.children[index] as HTMLElement;
  }
}

export function initToolbar() {
  const toolbar = Toolbar.getInstance();
  toolbar.add('Text');
  toolbar.add('Shape');
  toolbar.add('Shape');
  toolbar.add('Shape');
  toolbar.add('Shape');
  toolbar.add('Shape');
  document.body.appendChild(toolbar.getElement());
}
