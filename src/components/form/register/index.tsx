import { User, Lock, Mail, PenIcon } from "lucide-react"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "../input"
import { Button } from "../button"
import { useForm } from "react-hook-form"

import { useAuthContext } from "../../context/AuthContext"

const schema = z.object({
    name: z.string().min(8,"Preencha com o nome completo"),
    username: z.string().min(8, "Mínimo de 8 caracteres."),
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(12, "Mínimo de 12 caracteres"),
    passwordConfirm: z.string()
}).refine(data=> data.password === data.passwordConfirm,{
    message: "As senhas não coincidem",
    path:['passwordConfirm']
})

type FormData = z.infer<typeof schema>

export default function RegisterForm() {
    const {singUp} = useAuthContext()
    const {register, handleSubmit, formState:{ errors }}=useForm<FormData>({
        resolver: zodResolver(schema),
        reValidateMode:"onChange"
    })

    function submitForm(data:FormData){
        singUp(data)
    }

    return (
        <form className="flex flex-col gap-3 min-w-[297px]" onSubmit={handleSubmit(submitForm)}>
            <Input 
                name="name"
                type="text" 
                placeholder="Nome completo"
                icon={<PenIcon size={24} color="#fff"/>}
                register={register}
                error={errors.name?.message}
            />
            <Input
                name="username"
                type="text" 
                placeholder="Nome de usuário"
                icon={<User size={24} color="#fff"/>}
                register={register}
                error={errors.username?.message}
            />
            <Input
                name="email"
                type="text" 
                placeholder="E-mail"
                icon={<Mail size={24} color="#fff"/>}
                register={register}
                error={errors.email?.message}
            />
            <Input 
                name="password"
                type="password" 
                placeholder="Senha"
                icon={<Lock size={24} color="#fff"/>}
                register={register}
                error={errors.password?.message} 
            />
            <Input 
                name="passwordConfirm"
                type="password" 
                placeholder="Confirme sua senha"
                icon={<Lock size={24} color="#fff"/>}
                register={register}
                error={errors.passwordConfirm?.message} 
            />
            <div className="mb-6">
                <span className="text-white">Já possui uma conta? <a className="text-green-500 underline"href="/">Entrar</a></span>
            </div>
            <Button type="submit" label="Registrar"/>
        </form>
    )
}