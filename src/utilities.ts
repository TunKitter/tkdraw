import G from "./global"

export function getPropertyItem(selector: string, is_remove = false) {
    const item = G.html.skeleton_property.querySelector(selector) as HTMLElement
    if (is_remove) item.remove()
    return item.cloneNode(true) as HTMLElement
}
export function getRandomString(length: number = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        if (i === 0) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        } else {
            result += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length));
        }
    }
    return result;
}