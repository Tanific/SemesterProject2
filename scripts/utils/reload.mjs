export function reload(delay = 200) {
    setTimeout(() => {
        location.reload();
    }, delay);
}