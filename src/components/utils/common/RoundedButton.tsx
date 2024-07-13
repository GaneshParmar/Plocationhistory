export function RoundedButton({onClick,children,disabled, className = ''}:{onClick : ()=>{}, children : any,disabled:boolean,className:string}) {
    return (
        <button onClick={onClick} className={`px-4 py-2 rounded bg-blue-700 text-white mx-auto text-xl my-3 disabled:bg-slate-300 ${className}`} disabled={disabled}>
            {children}
        </button>
    );
}