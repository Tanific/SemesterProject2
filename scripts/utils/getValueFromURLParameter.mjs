//extract information from url paramteres
export function getValueFromURLParameter(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}