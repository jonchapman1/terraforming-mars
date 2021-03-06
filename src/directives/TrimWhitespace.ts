
export function trimEmptyTextNodes (el: any) {
    for (let node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.data.trim() === '') {
            node.remove()
        }
    }
}
