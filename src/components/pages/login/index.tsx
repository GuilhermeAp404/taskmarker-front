import { ReactTyped } from 'react-typed'
import LoginForm from '../../form/login'

export default function Login() {
    
    return (
        <main className="bg-zinc-900 flex w-full justify-between">
            <div className='hidden lg:flex flex-col justify-center  h-screen ml-6'>
                <h1 className='text-5xl text-white font-semibold'>
                    {'Bem-vindo ao '}
                    <ReactTyped
                        className='text-green-500 underline'
                        strings={["Taskmarker."]}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                    />
                </h1>
                <p className='text-white text-lg'>Gerencie suas tarefas com facilidade, mantenha tudo organizado de forma simples e intuitiva.</p>
            </div>
            <div className="bg-zinc-800 h-screen flex flex-col justify-center items-center w-full lg:w-auto px-8 sm:px-12 shadow-xl">
                <h2 className="text-3xl text-white font-semibold mb-8">Login</h2>
                <LoginForm/>
            </div>
        </main>
    )
}
