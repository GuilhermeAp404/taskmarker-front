import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; 
import { api } from "../services/api";
import { LoginFormType, SingUpFormType, UserProps } from "../utils/types/Auth.Type";
import { toast } from "sonner";


export function useAuth(){
    const [authenticated, setAuthenticated]=useState(false)
    const [user, setUser]=useState<UserProps|undefined>()
    const navigate = useNavigate()

    async function singUp(data:SingUpFormType){
        await api.post('/user/register', data)
        .then((res)=>{
            if(res.status===201){
                navigate('/')
                setTimeout(()=>{
                    toast.success("Cadastrado com sucesso!")
                }, 500)
            } 
        })
        .catch(err=> toast.error(err.response.data.message))
    }

    async function login(data:LoginFormType){
        await api.post('/user/login', data)
        .then(res=>{
            if(res.data.auth){
                api.defaults.headers.Authorization = `Bearer ${res.data.token}`
                localStorage.setItem('token', JSON.stringify(res.data.token))
                setAuthenticated(true)
                getUser()
                navigate('/dashboard')
                setTimeout(()=>{
                    toast.success("Seja Bem-vindo")
                }, 500)
            }
        }).catch(err=> toast.error(err.response.data.message))

    }

    const logout= useCallback(()=>{
        api.defaults.headers.Authorization = ""
        localStorage.removeItem('token')
        setUser(undefined)
        setAuthenticated(false)
        navigate('/')
        setTimeout(()=>{
            toast.warning("Você foi deslogado")
        }, 500)
    },[navigate])

    const getUser = useCallback(()=>{
        async function get() {
            await api.get('/user')
            .then(res=> {
                setUser(res.data.user)
            })
            .catch(err=> logout())
        }
        get()
    },[logout])

    useEffect(()=>{
        async function authenticatedUser() {
            const token = localStorage.getItem('token')
            if(token){
                api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
                setAuthenticated(true)
                await getUser()
                navigate('/dashboard')
            }
        }

        authenticatedUser()
    }, [getUser, navigate])

    return {authenticated, singUp, login, logout, user}
}