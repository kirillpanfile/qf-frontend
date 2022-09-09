
const setCookie = (name, value) => {
    let cookie = `${name}=${value};path=/;expires=Tue,19 Jan 2038 04:14:46 GMT`
    document.cookie = cookie
}

const getCookie = (name) => {
    return document.cookie.split(';').find((cookie) => cookie.includes(`${name}=`))?.split('=')[1]
}

const updateCookie = (name, value) => {
    setCookie(name,value)
}
export function UseCookie(){
    return {
        setCookie, updateCookie, getCookie
    }
}