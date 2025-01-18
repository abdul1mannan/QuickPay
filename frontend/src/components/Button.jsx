export function Button({label, onClick}){
    return (
        
        <button onClick={onClick} className="bg-slate-500 text-white px-4 py-2 rounded-md">
            {label}
        </button>
    )
}