
interface ButtonProps{
    type:"submit" | "reset" | "button" | undefined
    label:string
}

export function Button({type, label}:ButtonProps) {
    return (
        <button 
            type={type} 
            className="bg-green-500 text-white font-bold py-2 rounded-lg active:opacity-90"
        >
            {label}
        </button>
    )
}