import { User, Lock } from "lucide-react"
import { z } from 'zod'

import { Input } from "../input"
import { Button } from "../button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthContext } from "../../context/AuthContext"

const schema = z.object({
    username: z.string().min(1, "Insira seu nome de usuário"),
    password: z.string().min(8, "Insira sua senha")
})

type FormData = z.infer<typeof schema>

export default function LoginForm() {
    const {login} = useAuthContext()
    const { register, handleSubmit, formState: {errors}}=useForm<FormData>({
        resolver: zodResolver(schema),
        reValidateMode:"onChange"
    })

    function submitForm(data:FormData){
        login(data)
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(submitForm)}>
            <Input
                name="username"
                type="text" 
                placeholder="Nome de usuário"
                icon={<User size={24} color="#fff"/>}
                register={register}
                error={errors.username?.message} 
            />
            <Input 
                name="password"
                type="password" 
                placeholder="Senha"
                icon={<Lock size={24} color="#fff"/>}
                register={register}
                error={errors.password?.message}
            />
            <div className="mb-6">
                <span className="text-white">Ainda não possui uma conta? <a className="text-green-500 underline"href="/register">Registre-se</a></span>
            </div>
            <Button type="submit" label="Entrar"/>
        </form>
    )
}