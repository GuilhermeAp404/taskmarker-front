import { ReactNode } from "react"
import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps{
    name:string
    type: string
    placeholder: string
    icon?: ReactNode
    register: UseFormRegister<any>
    rules?: RegisterOptions
    error?:string
}

export function Input({name, type, placeholder, icon, register, rules, error}:InputProps) {
    return (
        <>
            <div 
                className={`w-full flex justify-center items-center bg-zinc-900 px-2 py-2 rounded gap-2 border-2 ${error ? "border-red-600" : "border-zinc-400"}`} >
                {icon}
                <input 
                    className="bg-transparent text-white focus outline-none w-full"
                    type={type} 
                    placeholder={placeholder}
                    {...register(name, rules)}
                    id={name}
                />
            </div>
            {error && <p className="text-red-600 text-[12px]">{error}</p>}
        </>
    )
}
