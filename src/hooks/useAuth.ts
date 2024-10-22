import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; 
import { api } from "../services/api";
import { LoginFormType, SingUpFormType, UserProps } from "../utils/types/Auth.Type";
import { toast } from "sonner";
import { AxiosError } from "axios";


export function useAuth(){
    const [authenticated, setAuthenticated]=useState(false)
    const [user, setUser]=useState<UserProps|undefined>()
    const navigate = useNavigate()

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

    const getUser = useCallback(async ()=>{
        try{
            const res = await api.get('/user')
            if(res.status===200){
                setAuthenticated(true)
                setUser(res.data.user)

                navigate('/dashboard')
            }else{
                logout()
            }

        }catch(error){
            toast.error("Erro ao obter informações do usuário");
            logout()
        }
    },[logout, navigate])

    async function singUp(data:SingUpFormType){
        try{
            const res = await api.post('/user/register', data)
            if(res.status===201){
                navigate('/')

                setTimeout(()=>{
                    toast.success("Cadastrado com sucesso!")
                }, 500)
            } 

        }catch(err){
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Erro ao cadastrar");
            } else {
                toast.error("Ocorreu um erro inesperado");
            }

        }
    }

    async function login(data:LoginFormType){
        try{
            const res = await api.post('/user/login', data)
            if(res.data.auth===true){
                api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
                localStorage.setItem('token', JSON.stringify(res.data.token));

                setAuthenticated(true)
                await getUser()

                setTimeout(() => {
                    toast.success("Seja Bem-vindo");
                }, 500);
            }

        }catch(err){
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Erro ao logar");
            } else {
                toast.error("Ocorreu um erro inesperado");
            }

        }
    }

    useEffect(()=>{
        async function authenticatedUser() {
            const token = localStorage.getItem('token')
            if(token){
                api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
                setAuthenticated(true)
                await getUser()
            }
            
        }

        authenticatedUser()
    }, [getUser, navigate])

    return {authenticated, singUp, login, logout, user}
}