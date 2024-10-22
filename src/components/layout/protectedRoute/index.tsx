import { ReactNode } from "react"
import { useAuthContext } from "../../context/AuthContext"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({children}:{children:ReactNode}) {
    const {authenticated} = useAuthContext()
    
    return authenticated ? (<>{children}</>) : <Navigate to="/"/>
}
