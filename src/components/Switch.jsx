import { Routes, Route } from "react-router-dom"
import Home from "./SwitchPages/Home"
import CreateAuction from "./SwitchPages/CreateAuction"

const Switch = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="create" element={<CreateAuction />}></Route>
        </Routes>
    )
}

export default Switch