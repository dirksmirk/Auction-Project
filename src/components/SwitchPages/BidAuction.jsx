import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import AuctionItem from "./smaller components/AuctionItem";

const BidAuction = () => {
    const [bids, setBids] = useState(null)
    let location = useLocation()
    const auction = location.state.auction

    useEffect(() => {
      const getAllBids = () => {
        fetch('https://auctioneer.azurewebsites.net/bid/7bac/' + auction.AuctionID)
        .then((res) => res.json())
        .then((data) => {
          setBids(data)
        })
      }
      // getAllBids()
      console.log(location)
    }, [])

    return (
        <div style={{ border: '1px solid red', padding: '10px' }}>
            {auction && <AuctionItem isBidding={true} auction={auction} />}
        </div>
    );
}
export default BidAuction




    // const [auction, setAuction] = useState(null);

    // useEffect(() => {

    //     if (auctionId !== null) {
    //         const fetchAuction = () => {
    //             fetch(`https://auctioneer.azurewebsites.net/auction/7bac/${auctionId}`)
    //             .then((response) => response.json())
    //             .then((result => {
    //                 console.log(result)
    //                 setAuction(result)
    //             }))
    //             .catch(error => {
    //                 console.error('Error fetching auction:', error);
    //             });
    //         }
            
    //         fetchAuction();
    //     }

    //     return () => {
    //         console.log(auction);
    //     }
    // }, [auctionId]);

