export function initContainer() {
  document.body.addEventListener('contextmenu', e => e.preventDefault());
}
// export function initCircleMouse() {
//   const circle = document.createElement('div');
//   Object.assign(circle.style, {
//     width: '1em',
//     height: '1em',
//     borderRadius: '50%',
//     backgroundColor: 'black',
//     position: 'absolute',
//     zIndex: '999999',
//     left: '50%',
//     top: '50%'
//   });
//   document.body.addEventListener('mousemove', e => {
//     circle.style.left = `${e.clientX}px`;
//     circle.style.top = `${e.clientY}px`;
//   });
//   document.body.appendChild(circle);
// }
