
export default function createColorPickerElement(callback: (value: any) => void): HTMLInputElement {
    const picker = document.createElement('input')
    picker.type = 'color'
    Object.assign(picker.style, {
        border: 'none',
        background: 'transparent',
        width: '2em',
        height: '2em',
        marginLeft: '1em'
    })
    picker.addEventListener('input', e => {
        const target = e.target as HTMLInputElement
        callback(target.value)
    })
    return picker
}