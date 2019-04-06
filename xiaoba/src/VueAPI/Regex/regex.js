export function matchMobilePhone(mobilePhone){
    return /^1\d{10}$/.test(mobilePhone);
}

export function matchRegisterPassword(password){
    return /^[A-Za-z0-9]{6,12}$/.test(password);
}