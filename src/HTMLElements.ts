const createElement = (tag): ((obj?: Object) => HTMLElement) => {

    let newNode: HTMLElement = document.createElement(tag)
    const setAttributes = (obj?: Object): HTMLElement => {

        for (let key in obj) {
            if (key === 'style') {
                for (let feature in obj[key]) {
                    newNode.style[feature] = obj[key][feature]
                }
            } else if (obj[key] instanceof Function) {
                newNode[key] = obj[key]
            } else {

                newNode.setAttribute(key, obj[key])
            }
        }
        return newNode
    }

    return setAttributes

}

type ElementI = HTMLElement | string
type FunctionalElement = () => (ElementI[])
type ChildElement = Array<FunctionalElement | ElementI>



const appendElementTo = (newElement: HTMLElement, ...children: ChildElement): HTMLElement => {
    if (children.length > 0) {
        children.forEach((child: ElementI | FunctionalElement) => {
            if (child instanceof HTMLElement) {
                newElement.appendChild(child)
            } else if (child instanceof Function) {
                if ((child() as any) instanceof Array<ElementI>) {
                    child().forEach((_child: ElementI) => {
                        appendElementTo(newElement, _child)
                    })
                }
            } else {
                if (typeof child === 'string') {
                    newElement.innerHTML += child
                } else {

                    newElement.appendChild(child)
                }
            }

        })
    }

    return newElement
}

export const div = (attributes?: Object) => (...children: ChildElement): HTMLElement => {
    let newDiv: HTMLElement = createElement('div')(attributes)

    return appendElementTo(newDiv, ...children)
}

export const span = (attributes?: Object) => (...children: ChildElement): HTMLElement => {
    let newSpan: HTMLElement = createElement('span')(attributes)

    return appendElementTo(newSpan, ...children)
}