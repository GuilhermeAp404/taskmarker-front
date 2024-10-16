import { createContext, ReactNode, useContext, useState } from "react"
import ModalCreateTasks from "../layout/modalCreateTasks"

interface ModalContextProps {
    visible: boolean
    handleModalVisible: ()=>void
}

export const ModalCreateContext = createContext<ModalContextProps|null>(null)

export function ModalCreateProvider({children}:{children:ReactNode}) {
    const [visible, setVisible] = useState(false)

    function handleModalVisible(){
        setVisible(!visible)
    }

    return (
        <ModalCreateContext.Provider value={{visible, handleModalVisible}}>
            {visible && <ModalCreateTasks/>}
            {children}
        </ModalCreateContext.Provider>
    )
}

export function useModal(){
    const context = useContext(ModalCreateContext)
    if(!context){
        throw new Error("useModal deve ser usado dentro de um ModalProvider")
    }

    return context
}
