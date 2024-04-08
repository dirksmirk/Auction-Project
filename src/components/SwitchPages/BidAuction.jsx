import { useState, useEffect } from "react";

const BidAuction = ({ auction }) => {
    const [bids, setBids] = useState(null)
    useEffect(() => {
      const getAllBids = () => {
        fetch('https://auctioneer.azurewebsites.net/bid/7bac/' + auction.AuctionID)
        .then((res) => res.json())
        .then((data) => {
          setBids(data)
        })
      }
      getAllBids()
    }, [])


    return (
        <div style={{ border: '1px solid red', padding: '10px' }}>
            {auction && (
                <>
                    <h1>{auction.Title}</h1>
                    <h2>Description</h2>
                    <p>{auction.Description}</p>
                    <p>Start price - {auction.StartingPrice}</p>
                    <p>Seller - {auction.CreatedBy}</p>
                    <p><b>Sart date</b> -  {auction.StartDate}</p>
                    <p><b>End date</b> - {auction.EndDate}</p>
                </>
            )}
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

