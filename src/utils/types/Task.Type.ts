export interface TaskProps{
    id:number
    title:string
    description:string
    status:string
    start:string
    end:string
}

export interface TaskDisplayProps{
    day:Date
    dayTask:TaskProps[]
}