export function Input({label , placeholder, onChange}){
    return <div>
        <div className="text-left text-sm font-medium py-2 ">{label}</div>
        <input onChange={onChange} type="text" placeholder={placeholder} className="border rounded w-full border-slate-200 px-2 py-1 "  />
    </div>
}