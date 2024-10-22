import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../input';
import { Button } from '../button';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Captions, ClockArrowDown, ClockArrowUp } from 'lucide-react';
import { useModal } from '../../context/ModalCreateContext';
import moment from 'moment';
import { useTaskContext } from '../../context/TaskContext';

const schema = z.object({
    title: z.string().min(10, "Coloque um titulo de 10 caracteres").max(30, "Coloque um titulo de até 30 caracteres"),
    date: z.string().date("Data inválida"),
    start: z.coerce.string(),
    end: z.coerce.string(),
    description: z.string()
}).refine(
    data => {
        const startDate = new Date(`${data.date} ${data.start}`);
        const endDate = new Date(`${data.date} ${data.end}`);
    
        return startDate <= endDate;
    },{ message: 'Horas inválidas', path:['end'] }
)

type FormData = z.infer<typeof schema>

export default function CreateTask() {
    const {createTask}=useTaskContext()
    const {handleModalVisible}=useModal()
    const {register, handleSubmit, setValue, formState:{errors}} = useForm<FormData>({
        reValidateMode: 'onChange',
        resolver: zodResolver(schema)
    })

    async function submitForm(data:FormData){
        const newTask = {
            title: data.title,
            start: moment(`${data.date} ${data.start}`).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(`${data.date} ${data.end}`).format('YYYY-MM-DD HH:mm:ss'),
            description: data.description
        }

        const status = await createTask(newTask)
        if(status===201){
            handleModalVisible()
        }
    }

    useEffect(()=>{
        setValue('date', new Date().toISOString().split('T')[0])
    }, [setValue])

    return (
        <form onSubmit={handleSubmit(submitForm)} className='w-full flex flex-col gap-3'>
            <Input 
                icon={<Captions size={24} color='#fff'/>}
                name='title' 
                type='text' 
                placeholder='Digite o titulo da tarefa...' 
                register={register}
                error={errors.title?.message}
            />
            <div className='flex flex-col lg:flex-row gap-3 lg:items-center justify-center'>
                <Input
                    name='date' 
                    type='date' 
                    placeholder='' 
                    register={register}
                    error={errors.date?.message}
                />
                <Input
                    icon={<ClockArrowUp size={24} color='#fff'/>}
                    name='start' 
                    type='time' 
                    placeholder='' 
                    register={register}
                    error={errors.start?.message}
                />
                <Input
                    icon={<ClockArrowDown size={24} color='#fff'/>}
                    name='end' 
                    type='time' 
                    placeholder='' 
                    register={register}
                    error={errors.end?.message}
                />
            </div>
            <textarea
                className='min-h-[150px] resize-none bg-zinc-900 outline-none border-2 border-zinc-400 p-2 text-white rounded'
                id="description"
                placeholder="Descreva sua tarefa aqui..."
                {...register('description')}
            ></textarea>
            <Button type='submit' label='Criar'/>
        </form>
    )
}
