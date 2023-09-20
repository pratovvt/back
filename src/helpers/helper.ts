export const isEmailValid = (email: string | undefined) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}
export const isStrongPassword = (password) => {
    if (password.length < 8) {
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        return false;
    }

    if (!/\d/.test(password)) {
        return false;
    }

    return true;
}
