export function getUser() {
    const userInfo = localStorage.getItem('user');
    if (!userInfo) return null;
    const user = JSON.parse(userInfo);
    if (!user) return null;
    return user;
}