export function expireSession() {
    setTimeout(() => {
        localStorage.removeItem("votingApp");
        window.location.reload();
    }, 30000);
}

export function logout() {
    localStorage.removeItem("votingApp");
    window.location.reload();
}