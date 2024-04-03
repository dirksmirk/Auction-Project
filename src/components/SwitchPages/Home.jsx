import { useState, useEffect } from 'react'
import BidAuction from './BidAuction'
import AuctionItem from './smaller components/AuctionItem'

function Home () {
    const [Auctions, setAuctions] = useState(null)


    useEffect(() => {
        fetch(`https://auctioneer.azurewebsites.net/auction/7bac`)
        .then((response) => response.json())
        .then(result => {
            console.log(result)
            setAuctions(result)
        })
        return() => {
            console.log(Auctions)
        }
    }, [])

    /* const getAuction = () => {
        fetch(`https://auctioneer.azurewebsites.net/auction/7bac`)
        .then((response) => response.json)
        .then(result => {
            console.log(result)
            setAuctions(result)
        })
    } */

    return(
        <>
            <div>
                {Auctions && <ul>
                    {Auctions.map((auction, idx) => (
                        <li key={idx}>
                            {/* <p>{auction.AuctionID}</p>
                            <p>{auction.Title}</p>
                            <p>{auction.Description}</p>
                            <p>{auction.StartingPrice}</p>
                            <p>{auction.CreatedBy}</p>
                            <p>{auction.StartDate}</p>
                            <p>{auction.EndDate}</p> */}
                            <AuctionItem auction={auction}/>
                        </li>
                    ))}
                </ul>}
            </div>
        </>
    )
}

export default Home;