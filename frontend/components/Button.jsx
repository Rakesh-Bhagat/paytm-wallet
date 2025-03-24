export function Button({label, onClick}){
    return <button onClick={onClick}  type="button" className="w-full border rounded-lg bg-gray-800 text-white font-medium text-sm px-5 py-2.5 mb-2 me-2 hover:bg-gray-900">{label}</button>
    
}