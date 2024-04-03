import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav> 
            <NavLink to="/">Home</NavLink>
            <NavLink to="create">Create Auction</NavLink>
            <input type="Search" placeholder="Search for any auction" />  
        </nav>
    )
}

export default Navigation