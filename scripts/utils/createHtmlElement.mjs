export function createHtmlElement(tag, classes = [], attributes = {}, content = null) {
    const element = document.createElement(tag);

    if (classes.length > 0) {
        element.classList.add(...classes);
    }

    for (const key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            element.setAttribute(key, attributes[key]);
        }
    }
    if (content !== null) {
        element.innerHTML = content;
    }

    return element;
}