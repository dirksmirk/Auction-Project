import { Routes, Route } from "react-router-dom"
import Home from "./SwitchPages/Home"
import CreateAuction from "./SwitchPages/CreateAuction"
import BidAuction from "./SwitchPages/BidAuction"

const Switch = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="create" element={<CreateAuction />}></Route>
            <Route path="bid" element={<BidAuction />}></Route>
        </Routes>
    )
}

export default Switch