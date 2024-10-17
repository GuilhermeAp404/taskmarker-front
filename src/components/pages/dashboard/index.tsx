import { useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../layout/header'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import { addDays } from '../../../utils/incrementeDate'
import { subtractDays } from '../../../utils/decrementeDate'
import { api } from '../../../services/api'
import { TaskProps } from '../../../utils/types/Task.Type'
import Task from '../../layout/task'

interface DateDisplayProps{
    date:string
    dateTasks:TaskProps[]
}


function Dashboard() {
    const {authenticated} = useAuthContext()
    const navigate = useNavigate()
    
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(addDays(new Date(), 5))
    
    const [taskList, setTaskList]=useState<DateDisplayProps[]>([])
    
    const advanceTime =useCallback(()=>{
        setStartDate(addDays(startDate, 5))
        setEndDate(addDays(endDate, 5))
    }, [startDate, endDate])
    
    const backTime = useCallback(()=>{
        setStartDate(subtractDays(startDate, 5))
        setEndDate(subtractDays(endDate, 5))
    }, [startDate, endDate])
    useEffect(()=>{
        if(!authenticated){
            navigate('/')
        }
    },[authenticated, navigate])   

    useEffect(()=>{
        async function getTaskList(){
            const startIn = new Date(startDate).toISOString().split('T')[0]
            const response = await api.get(`/tasks/all?startIn=${startIn}`)
            .then(res=> res)
            .catch(err=> console.log(err))
            

            if(response?.status===200){
                const tasks:TaskProps[] = response.data.tasks
                let taskList:DateDisplayProps[] = []
                for(let i=0; i<=5; i++){
                    let date = addDays(startDate, i).toISOString().split('T')[0]
                    let dateTasks = tasks.filter(task=>task.start.includes(date))
                    taskList.push({
                        date,
                        dateTasks
                    })

                }
                setTaskList(taskList)
            }
        }
        getTaskList()
    }, [startDate])
    return (
        <>
            <Header/>
            <main className='bg-zinc-900 min-h-[calc(100vh-108px)] md:min-h-[calc(100vh-75px)] text-white'>
                <div id='container' className='w-full max-w-7xl flex flex-col items-center justify-center m-auto px-2 pt-8'>
                    <span className='text-2xl'>{`${startDate.getFullYear()}`}</span>
                    <div className='flex justify-between items-center bg-zinc-800 w-full p-2 rounded mt-5'>
                        <button onClick={backTime}>
                            <CircleArrowLeft  size={32} className='active:opacity-80'/>
                        </button>
                        <span className='font-semibold text-lg'>{`${startDate.toLocaleString().split('/')[0]}/${startDate.toLocaleString().split('/')[1]} - ${endDate.toLocaleString().split('/')[0]}/${endDate.toLocaleString().split('/')[1]}`}</span>
                        <button onClick={advanceTime}>
                            <CircleArrowRight size={32} className='active:opacity-80'/>
                        </button>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row justify-between px-3 gap-2 mt-4'>
                    {taskList.map(task=>(
                        <div className='flex flex-col flex-1 gap-2 mb-8 lg:mb-0' key={task.date.split('-')[2]}>
                            <div className='bg-zinc-800 w-full p-3 rounded flex justify-center'>
                                <span className='font-semibold text-xl'>{`${task.date.split('-')[2]}/${task.date.split('-')[1]}`}</span>
                            </div>
                            {task.dateTasks.length===0 && (
                                <p className='px-2 py-3 text-center'>Nenhuma tarefa</p>
                            )}
                            {task.dateTasks.map(task=>(
                                <Task task={task} key={task.id}/>
                            ))}
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default Dashboard