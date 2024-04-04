import { useRef } from "react";
import { NavLink } from "react-router-dom";


const Navigation = () => {
    const input = useRef()
    return (
        <div>
            <h1>Auctonera Mera!</h1>
        <nav className="NavBar"> 
            <NavLink to="/">Home</NavLink>
            <NavLink to="create">Create Auction</NavLink>
            <input type="Search" ref={input} placeholder="Search for any auction" />
            <NavLink to="/">
            <button>Search</button>
                </NavLink>
        </nav>
        </div>

    )
}

export default Navigation