import G from "./global"

export function getPropertyItem(selector: string, is_remove = false) {
    const item = G.html.skeleton_property.querySelector(selector) as HTMLElement
    if (is_remove) item.remove()
    return item
}