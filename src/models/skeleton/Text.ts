import Skeleton from "../enities/Skeleton";
import text_style from '../../css/module/skeleton/text.module.css'
export default function createTextSkeleton(text: string, wrapper: HTMLElement = document.querySelector('.container')!) {
    const html = document.createElement('div');
    html.classList.add(text_style.text_skeleton, 'skeleton');
    html.innerText = text;
    return new Skeleton(html, wrapper);
}