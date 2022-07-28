export default function getJWTFromCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
}
