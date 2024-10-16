import { X } from 'lucide-react'
import { useModal } from '../../context/ModalCreateContext'
import CreateTask from '../../form/createTask'
import { useEffect, useRef } from 'react'

export default function ModalCreateTasks() {
    const {handleModalVisible} = useModal()
    const createRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(createRef.current){
            createRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    },[])

    return (
        <div className='absolute bg-zinc-900-30 h-full w-full backdrop-blur-sm flex items-center justify-center'>
            <div ref={createRef} className='bg-zinc-800 lg:w-2/5 md:w-3/5 w-11/12 p-4 rounded shadow-xl'>
                <div className='flex justify-between items-center border-b border-zinc-600 pb-3 mb-4'>
                    <h3 className='text-white font-bold text-xl'>Criar Tarefa</h3>
                    <button onClick={handleModalVisible}>
                        <X color='#fff' className='active:opacity-50'/>
                    </button>
                </div>
                <CreateTask/>
            </div>
        </div>
    )
}
