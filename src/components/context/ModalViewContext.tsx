import { createContext, ReactNode, useContext, useState } from "react"
import ModalViewTasks from "../layout/modalViewTasks"
import { TaskProps } from "../../utils/types/Task.Type"

interface ModalContextProps {
    visible: boolean
    handleModalVisible: ()=>void
    getTask: (task:TaskProps)=>void

}

export const ModalViewContext = createContext<ModalContextProps|null>(null)

export function ModalViewProvider({children}:{children:ReactNode}) {
    const [visible, setVisible] = useState(false)
    const [task, setTask] = useState<TaskProps>()

    function handleModalVisible(){
        setVisible(!visible)
    }

    function getTask(task:TaskProps){
        setTask(task)
    }
    return (
        <ModalViewContext.Provider value={{visible, handleModalVisible, getTask}}>
            {visible && <ModalViewTasks task={task}/>}
            {children}
        </ModalViewContext.Provider>
    )
}

export function useModal(){
    const context = useContext(ModalViewContext)
    if(!context){
        throw new Error("useModal deve ser usado dentro de um ModalProvider")
    }

    return context
}
