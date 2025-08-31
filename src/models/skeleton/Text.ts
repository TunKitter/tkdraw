import Skeleton from "../enities/Skeleton";
import text_style from '../../css/module/skeleton/text.module.css'
import G from "../../global";
export default function createTextSkeleton(text: string, wrapper: HTMLElement) {
    const html = document.createElement('div');
    html.classList.add(text_style.text_skeleton, 'skeleton');
    html.innerText = text;
    html.setAttribute('contenteditable', 'true');
    html.addEventListener('contextmenu', event => event.preventDefault());
    html.addEventListener('dblclick', event => {
        event.stopPropagation();
        html.focus();
    });
    html.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            G.moveable.target = null
            html.blur();
        }
    });
    return new Skeleton(html, wrapper);
}