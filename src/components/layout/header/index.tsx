import{ CircleUser } from'lucide-react'
import { useAuthContext } from '../../context/AuthContext'
import { useModal } from '../../context/ModalCreateContext'

export function Header() {
    const {logout, user} = useAuthContext()
    const {handleModalVisible} = useModal()

    return (
        <header className='w-full bg-zinc-800 min-h-[75px] py-2 flex items-center shadow-2xl'>
            <div id='container' className='max-w-7xl w-full mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-2 h-full px-2'>
                <button className='bg-green-500 px-4 py-2 rounded text-white font-bold active:opacity-90' onClick={handleModalVisible}>Adicionar tarefa</button>
                <div id='profile' className='flex gap-3 items-center justify-center'>
                    <div className='flex flex-col items-end'>
                        <span className='text-md font-bold text-white text-right'>{user ? (user.name) : ('Nome do usuário')}</span>
                        <button className='text-sm text-green-500 underline' onClick={logout}>Sair</button>
                    </div>
                    <CircleUser color='#fff' size={42}/>
                </div>
            </div>
        </header>
    )
}
