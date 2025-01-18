import { Link } from "react-router-dom";

export function BottomWarning({label , buttonText, to}){
    return (
        <div className="text-slate-950 text-md font-medium px-4 pb-2">
            <div className="flex justify-center">
                {label}
                <Link to={to} className="underline">{buttonText}</Link>
            </div>
        </div>
    )
}