import { NavLink } from "react-router-dom";
import { SearchContext } from "../Context";
import { useContext, useRef } from "react";


const Navigation = () => {
  const { myValue, myUpdateFunc } = useContext(SearchContext)
  const input = useRef();

  const handleSearch = () => {
    myUpdateFunc(input.current.value);
    console.log(myValue)
  };

  const Reset = () => {
    input.current.value = "";
    myUpdateFunc("");
  };

    return (
        <div>
            <h1>Auktionera Mera!</h1>
            <nav className="NavBar"> 
              <NavLink to="/" onClick={Reset}>Home</NavLink>
              <NavLink to="create" onClick={Reset}>Create Auction</NavLink>
              <input type="Search" placeholder="Search for any auction" ref={input} />
              <NavLink to="/" >
                <button onClick={handleSearch}>Search</button>
              </NavLink>
          </nav>
        </div>
    )
}

export default Navigation