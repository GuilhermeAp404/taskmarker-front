export interface SingUpFormType{
    name:string
    username:string 
    email:string
    password:string
}

export interface LoginFormType{
    username:string 
    password:string
}

export interface AuthProps{
    singUp:(data:SingUpFormType)=>void
    login:(data:LoginFormType)=>void
    logout:()=>void
    user:UserProps|undefined
    authenticated:boolean
}

export interface UserProps {
    id:number
    name:string
    username:string
    email:string
}