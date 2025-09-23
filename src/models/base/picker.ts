import '../../css/module/base/picker.css'
export default function createColorPickerElement(callback: (value: any) => void): HTMLInputElement {
    const picker = document.createElement('input')
    picker.type = 'color'
    picker.className = 'color_picker_input'
    picker.addEventListener('input', e => {
        const target = e.target as HTMLInputElement
        callback(target.value)
    })
    return picker
}