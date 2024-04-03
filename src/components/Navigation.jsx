import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav> 
            <NavLink to="/">Home</NavLink>
            <NavLink to="create">Create Auction</NavLink>   
        </nav>
    )
}

export default Navigation