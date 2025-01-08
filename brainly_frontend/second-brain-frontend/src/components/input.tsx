interface InputProps {
    placeholder: string;
    reference?:any
}

export function Input(props: InputProps) {
    return <div>
        <input ref={props.reference} type="text" placeholder={props.placeholder} className="px-4 py-2 bg-slate-100 border-2 rounded-md" />
    </div>
}