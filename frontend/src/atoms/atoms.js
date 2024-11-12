import {atom , selector} from 'recoil'

export const firstNameAtom = atom({
    key : 'firstNameAtom',
    default : 1
})

export const lastNameAtom = atom({
    key : 'lastNameAtom',
    default : 2
})

export const emailAtom = atom({
    key : 'emailAtom',
    default : 3
})

export const passwordAtom = atom({
    key : 'passwordAtom',
    default : 4
})

export const getSignUpSelector = selector({
    key : 'createUserSelector',
    get : ({get})=>{
        const fname = get(firstNameAtom)
        const lname = get(lastNameAtom)
        const email = get(emailAtom)
        const pass  = get(passwordAtom)
        return fname+lname+email+pass
     
    }
}) 
