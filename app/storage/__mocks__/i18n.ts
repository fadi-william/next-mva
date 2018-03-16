const obj = new Map();

export function getCurrentUserLocale() {
    const currentUserLocale = obj.get("userLocale");
    return currentUserLocale ? currentUserLocale : "en";
}

export function setCurrentUserLocale(currentUserLocale) {
    return obj.set("userLocale", currentUserLocale);
}

export function getCurrentUserLocaleFromContext() {
    const currentUserLocale = obj.get("userLocale");
    return currentUserLocale ? currentUserLocale : "en";
}
