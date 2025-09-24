import SkeletonPropertyItem from "../SkeletonPropertyItem";
import '../../../css/module/skeleton_property_item/variant.css'
class VariantPropertyItem extends SkeletonPropertyItem {
    private styles: string[]
    private variantElement: HTMLElement
    constructor(label: string, variantElement: HTMLElement, styles: string[], referenceElement: HTMLElement) {
        const wrapper = document.createElement('div')
        wrapper.className = 'variant-container'
        super(label, wrapper, referenceElement);
        this.styles = styles
        this.variantElement = variantElement
    }
    getVariant() {
        return this.styles
    }
    addVariant(...ds: string[]) {
        if (ds.length != this.styles.length) throw new Error('The number of styles not the same')
        const cloneNode = this.variantElement.cloneNode(true)
        this.styles.forEach(e => {
            // @ts-ignore
            cloneNode.style[e] = ds.shift()
        });
        this.getElement().appendChild(cloneNode)
        return cloneNode
    }
    handleChange(callback: (value: any, referenceElement: HTMLElement) => void): void {
        this.getElement().childNodes.forEach(() => {
            this.getElement().childNodes.forEach(e => {
                // @ts-ignore
                e.onclick = () => {
                    // @ts-ignore
                    const stylesMatch = this.styles.map(ee => e.style[ee]);
                    callback(stylesMatch, this.getReferenceElement())
                }
            })
        })
        this.getElement().addEventListener('change', e => {
            // @ts-ignore
            callback(e.target.value, this.getReferenceElement())
        })
    }

}
export default VariantPropertyItem