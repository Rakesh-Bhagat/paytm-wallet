
import { Link } from "react-router-dom";
export function Successful() {
    return <div>
        <h3>Transaction successful</h3>
        <span>Go back to </span>
        <Link to={"/dashboard"} className="text-blue-500">Dashboard</Link>
    </div>
}