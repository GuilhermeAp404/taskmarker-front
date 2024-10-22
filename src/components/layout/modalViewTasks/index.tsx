import { Check, Trash, X } from 'lucide-react'
import { useModal } from '../../context/ModalViewContext'
import { TaskProps } from '../../../utils/types/Task.Type'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { useTaskContext } from '../../context/TaskContext'

export default function ModalViewTasks({task}:{task:TaskProps|undefined}) {
    const {handleModalVisible} = useModal()
    const {updateTask, deleteTask}= useTaskContext()
    const viewRef = useRef<HTMLDivElement>(null)
    
    useEffect(()=>{
        if(viewRef.current){
            viewRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    },[])

    async function handleDelete(){
        if(task!==undefined){
            const status = await deleteTask(task?.id)
            if(status===200){
                handleModalVisible()
                toast.warning("Uma tarefa foi deletada")
            }
        }
    }
    
    async function handleConclude(){
        if(task!==undefined){
            task.status = "CHECKED"
            const status = await updateTask(task)
            if(status===200){
                handleModalVisible()
                toast.success("Parabéns! Você completou uma tarefa.")
            }
        }
    }

    return (
        <div className='absolute bg-zinc-900-30 h-full w-full backdrop-blur-sm flex items-center justify-center'>
            <div ref={viewRef} className='bg-zinc-800 lg:w-2/5 md:w-3/5 w-11/12 p-4 rounded shadow-xl'>
                <div className='flex justify-between items-center border-b border-zinc-600 pb-3 mb-4'>
                    <h3 className='text-white font-bold text-xl'>{task?.title}</h3>
                    <button onClick={handleModalVisible}>
                        <X color='#fff' className='active:opacity-50'/>
                    </button>
                </div>
                <div className='flex flex-col text-white gap-8'>
                    <div id="time" className='flex gap-6'>
                        <div>
                            <span className='text-lg font-bold'>Inicio:</span>
                            <span className='text-lg font-thin'>{` ${task?.start.split('T')[1].split(':')[0]}:${task?.start.split('T')[1].split(':')[1]}`}</span>
                        </div>
                        <div>
                            <span className='text-lg font-bold'>Fim:</span>
                            <span className='text-lg font-thin'>{` ${task?.end.split('T')[1].split(':')[0]}:${task?.end.split('T')[1].split(':')[1]}`}</span>
                        </div>
                    </div>

                    <div id='description'>
                        <span className='text-lg font-bold mt-3'>Descrição:</span>
                        <p className='text-[14px] leading-normal text-white whitespace-pre-wrap'>
                            {task?.description ? task?.description:"Essa tarefa não possui descrição"}
                        </p>
                    </div>
                    <div id='actions' className=' flex w-full gap-1 justify-end border-t pt-4 border-zinc-600'>
                        <button className='p-2 bg-red-600 rounded active:opacity-50' onClick={handleDelete}>
                            <Trash />
                        </button>
                        <button className='py-2 px-3 bg-green-500 rounded flex active:opacity-50' onClick={handleConclude}>
                            <Check />
                            Concluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
