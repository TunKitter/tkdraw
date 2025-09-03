import G from "./global";

export function initBody() {
    document.body.oncontextmenu = e => e.preventDefault();
}
export function initSkeletonProperty() {
    return fetch('bundles/property_item.html').then(res => res.text()).then(html => {
        const div = document.createElement('div')
        div.innerHTML = html
        G.html.skeleton_property = div
    })
}