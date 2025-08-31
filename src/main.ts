import './css/main.css'
import { initMoveable } from './models/enities/Moveable'
import { initSelecto } from './models/enities/Selecto';
import { initInfiniteView } from './models/enities/InfiniteView';
import createTextSkeleton from './models/skeleton/Text';
import { initToolbar } from './models/Toolbar';
import createSkeletonFromToolbar from './flow/createSkeletonFromToolbar';

document.body.oncontextmenu = e => e.preventDefault();
initMoveable()
initSelecto()
initInfiniteView()
initToolbar()
createSkeletonFromToolbar(0, createTextSkeleton('Hello', document.querySelector('.container')!))
// console.log(createTextSkeleton('Hello', document.querySelector('.container')!).render());
// document.querySelector('button')?.addEventListener('click', function (e) {
//     createNode(e.target as HTMLElement)
// })
// function createNode(obj: HTMLElement) {
//     obj.classList.add('btn-selected')
//     const element = document.createElement('div')
//     // @ts-ignore
//     document.querySelector('.root')!.addEventListener('click', function (e: MouseEvent) {
//         element.className = "target"
//         element.style.left = `${e.clientX}px`
//         element.style.top = `${e.clientY}px`
//         element.style.transform = `translate(-50%, -50%)`
//         element.addEventListener('dblclick', function () {
//             element.innerHTML = `<input type="text" value="${element.innerHTML}" />`;
//             element.querySelector('input')!.focus();
//             element.querySelector('input')!.addEventListener('keydown', function (e) {
//                 if (e.key === 'Enter') {
//                     // @ts-ignore
//                     element.innerHTML = e.target.value;
//                 }
//             })
//             element.querySelector('input')!.addEventListener('blur', function (e) {
//                 // @ts-ignore
//                 element.innerHTML = e.target.value;
//             })
//         })
//         document.querySelector(".container")!.appendChild(element)
//         obj.classList.remove('btn-selected')
//         setTimeout(() => {
//             element.dispatchEvent(new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window }));
//         }, 0);
//     }, { once: true });
// };
