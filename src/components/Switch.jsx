import { Routes, Route } from "react-router-dom"
import Home from "./SwitchPages/Home"
import CreateAuction from "./SwitchPages/CreateAuction"
import BidAuction from "./SwitchPages/BidAuction"
import ClosedAuction from "./SwitchPages/ClosedAuction"

const Switch = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="create" element={<CreateAuction />}></Route>
            <Route path="bid/:id" element={<BidAuction />}></Route>
            <Route path="closed/:id" element={<ClosedAuction />}></Route>
        </Routes>
    )
}

export default Switch