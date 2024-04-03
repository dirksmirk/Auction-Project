import './css/App.css'
import Navigation from './components/Navigation'
import Switch from './components/Switch'
import Footer from './components/Footer'
import BidAuction from './components/SwitchPages/BidAuction'
import { useState } from 'react'

function App() {

  const [auctionId, setAuctionId] = useState (null);

  return (
    <>
      <Navigation />
      <Switch />
      <BidAuction auctionId={auctionId} />
      <Footer />
    </>
  )
}

export default App
