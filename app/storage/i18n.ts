// The imported libs.
import * as cookies from "js-cookie";
import * as nextCookies from "next-cookies";
import * as storage from "store2";

export function getCurrentUserLocale() {
    const localeFromCookie = cookies.get("userLocale");
    const checkLocale = localeFromCookie ? localeFromCookie : storage.get("userLocale");
    const locale = checkLocale ? checkLocale : "en";
    return locale;
}

export function setCurrentUserLocale(currentUserLocale) {
    storage.set("userLocale", currentUserLocale);
    cookies.set("userLocale", currentUserLocale);
}

export function getCurrentUserLocaleFromContext(context) {
    const { userLocale: locale } = nextCookies(context);
    return locale;
}
