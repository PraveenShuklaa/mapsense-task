export const isLogin = () => {
    const userdata = localStorage.getItem("userLoginData")
    if (userdata) {
        return true
    }
    return false
}