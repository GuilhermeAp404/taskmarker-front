import { CircleCheck, CircleDashed, Eye } from "lucide-react";
import { TaskProps } from "../../../utils/types/Task.Type";
import { useModal } from "../../context/ModalViewContext";

export default function Task({task}:{task:TaskProps}) {
    const {handleModalVisible, getTask}=useModal()
    function showModal(){
        getTask(task)
        handleModalVisible()
    }
    return (
        <div className='flex-col justify-between px-2 py-3 bg-zinc-800 rounded-md max-h-[80px]' key={task.id}>
            <div>
                <span className="text-sm">
                    {`${task.start.split('T')[1].split(':')[0]}:${task.start.split('T')[1].split(':')[1]} - ${task.end.split('T')[1].split(':')[0]}:${task.end.split('T')[1].split(':')[1]}`}
                </span>
            </div>
            <div className="flex justify-between items-center gap-1">
                <div className='overflow-hidden'>
                    <span className='font-bold text-sm'>{task.title}</span>
                </div>
                <div className="flex gap-1 items-center">
                    <button className='active:opacity-50' onClick={showModal}>
                        <Eye  size={26} color='#fff'/>
                    </button>
                    {(task.status==='OPEN')?(
                        <CircleDashed  size={20} color='#fff'/>
                    ):(
                        <CircleCheck size={20} color='#22C55E'/>
                    )}
                </div>
            </div>
        </div>
    )
}
