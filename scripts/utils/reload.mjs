export function reload(delay = 250) {
    setTimeout(() => {
        location.reload();
    }, delay);
}