import { useEffect, useState } from "react";
import { api } from "../services/api";
import { TaskFormProps, TaskProps } from "../utils/types/Task.Type";
import { useAuthContext } from "../components/context/AuthContext";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useTask(){
    const [tasks, setTasks]=useState<TaskProps[]>([])
    const {authenticated}=useAuthContext()

    useEffect(()=>{
        async function fecthTasks (){
            try {
                const res = await api.get(`/tasks/all?startIn=${new Date().toISOString().split("T")[0]}`);
                if (res.status === 200) setTasks(res.data.tasks);
            } catch (error) {
                console.error('Erro ao carregar tarefas:', error);
            }
        }

        if(authenticated){
            fecthTasks()
        }

    }, [authenticated])

    async function getTasks(date:String){
        try{
            const res = await api.get(`/tasks/all?startIn${date}`)
            if(res.status===200) setTasks(res.data.tasks)

        }catch(err){
            if(err instanceof AxiosError){
                toast.error(err.response?.data.message)
                return err.response?.status || 500

            }else{
                toast.error('Ocorreu um erro inesperado')

            }

        }
    }

    async function createTask(task:TaskFormProps){
        try{
            const res = await api.post("/tasks/create", task)
            if(res.status===201){
                let newTasks = [...tasks, res.data.task].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                setTasks(newTasks)

                toast.success("Tarefa criada com sucesso!")
                return res.status

            }else{
                toast.error(res.data.message)
                return res.status
            }
        }catch(err){
            if(err instanceof AxiosError){
                toast.error(err.response?.data.message)
                return err.response?.status || 500 

            }else{
                toast.error('Ocorreu um erro inesperado')
                return 500
            }

        }
    }

    async function updateTask(task:TaskProps) {
        try{
            const res = await api.put(`/tasks/${task.id}`, task)
            if(res.status===200){
                let newTasks = [...tasks]
                setTasks(newTasks.map(t=>task.id === t.id ? {...task}: t))
            }
            return res.status
        }catch(err){
            if(err instanceof AxiosError){
                toast.error(err.response?.data.message)
                return err.response?.status || 500

            }else{
                toast.error('Ocorreu um erro inesperado')
                return 500
            }
        }
    }

    async function deleteTask(id:Number) {
        try{
            const res = await api.delete(`/tasks/${id}`)
            if(res.status===200){
                let newTaskList= tasks.filter(t=>t.id!==id)
                setTasks(newTaskList)
            }
            return res.status
        }catch(err){
            if(err instanceof AxiosError){
                toast.error(err.response?.data.message)
                return err.response?.status || 500
            }else{
                toast.error('Ocorreu um erro inesperado')
                return 500
            }
            
        }
        
    }

    return {getTasks, createTask, updateTask, deleteTask, tasks}
}