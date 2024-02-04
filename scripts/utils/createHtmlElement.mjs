/**
 * Creates an HTML element with the specified tag, classes, attributes, and content
 *
 * @function
 * @param {string} tag - HTML tag for the element
 * @param {string[]} [classes=[]] - An array of class names to add to the element, separate with comma
 * @param {Object} [attributes={}] - An object containing attributes
 * @param {string | null} [content=null] - The content to set inside the element
 * @returns {HTMLElement} The created HTML element
 */
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