import {createContext, ReactNode, useContext} from 'react'
import { useAuth } from '../../hooks/useAuth'

import { AuthProps } from '../../utils/types/Auth.Type'


const Context = createContext<AuthProps|undefined>(undefined)

export function AuthProvider({children}:{children:   ReactNode}) {
    const {authenticated, singUp, login, logout, user}=useAuth()

    return (
        <Context.Provider value={{singUp, login, logout, authenticated, user}}>
            {children}
        </Context.Provider>
    )
}


export function useAuthContext(){
    const context = useContext(Context)

    if(!context){
        throw new Error("useAuthContext deve ser usado dentro de um AuthProvider")
    }

    return context
}