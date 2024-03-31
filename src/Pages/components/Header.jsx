import Navigation from "../Navigation";

const Header = () => {

    return (
        <div className="Header">
            <nav className="NavBar">
                {/* Insert Website name here */}
                <Navigation />
                <input type="Search" placeholder="Search for any auction" />
            </nav>
        </div>
    )
}

export default Header;