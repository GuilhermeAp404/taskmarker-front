//TODO: Criar variavel global para gerenicar as tarefas na aplicação
import { createContext, ReactNode, useContext } from "react"
import { TaskFormProps, TaskProps } from "../../utils/types/Task.Type"
import { useTask } from "../../hooks/useTask"

interface TaskContextProp{
    tasks:TaskProps[]
    getTasks:(date:string)=>void
    createTask:(task:TaskFormProps)=>Promise<number>
    updateTask:(task:TaskProps)=>Promise<number>
    deleteTask:(id:number)=>Promise<number>
}

const TaskContext = createContext<TaskContextProp|null>(null)
export function TaskProvider({children}:{children:ReactNode}){
    const{tasks, getTasks, createTask, updateTask, deleteTask}=useTask()

    return(
        <TaskContext.Provider value={{tasks, getTasks, createTask, updateTask, deleteTask}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTaskContext(){
    const context = useContext(TaskContext)
    if(!context){
        throw new Error("useTask deve ser usado dentro de um TaskProvider")
    }

    return context
}