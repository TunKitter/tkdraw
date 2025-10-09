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
  getSelectedChild() {
    return this.element.querySelector('.btn-selected');
  }
  cancelSelectedChild() {
    const btn_selected = this.element.querySelector('btn-selected');
    btn_selected && btn_selected.classList.remove('btn-selected');
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
  toolbar
    .getElement()
    .querySelectorAll('button')
    .forEach(e => {
      e.addEventListener('click', ee => {
        const btn_selected = toolbar.getSelectedChild();
        if (btn_selected) {
          _toolbar.removeListener();
          btn_selected.classList.remove('btn-selected');
        }
        if (btn_selected === e) ee.stopImmediatePropagation();
        else e.classList.add('btn-selected');
      });
    });
  document.body.appendChild(toolbar.getElement());
}
export const _toolbar = { removeListener: () => {} };
