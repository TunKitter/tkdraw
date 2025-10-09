import G from '../global';

class Skeleton {
  private html: HTMLElement;
  constructor(html: HTMLElement) {
    html.classList.add('skeleton');
    this.html = html;
  }
  getELement() {
    return this.html;
  }
  render() {
    G.wrapper_element.appendChild(this.html);
  }
  remove() {
    this.html.remove();
  }
}
export default Skeleton;

export function handleRemoveSkeletonByDeleteKey() {
  document.body.addEventListener('keyup', e => {
    let targets = G.moveable.getTargets();
    if (e.key == 'Delete' && targets.length > 0) {
      G.moveable.target = null;
      targets.map(e => e.remove());
      document.querySelector('.skeleton_property')?.remove();
    }
  });
}
