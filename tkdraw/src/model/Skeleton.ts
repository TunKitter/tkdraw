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
