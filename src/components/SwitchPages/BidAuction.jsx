import { useState, useEffect } from "react";

const BidAuction = ({ auctionId }) => {
    const [auction, setAuction] = useState(null);

    useEffect(() => {

        if (auctionId !== null) {
            const fetchAuction = () => {
                fetch(`https://auctioneer.azurewebsites.net/auction/7bac/${auctionId}`)
                .then((response) => response.json())
                .then((result => {
                    console.log(result)
                    setAuction(result)
                }))
                .catch(error => {
                    console.error('Error fetching auction:', error);
                });
            }
            
            fetchAuction();
        }

        return () => {
            console.log(auction);
        }
    }, [auctionId]);

    return (
        <>
            {auction && (
                <>
                    <h1>{auction.Title}</h1>
                    <h2>Description</h2>
                    <p>{auction.Details}</p>
                </>
            )}
        </>
    );
}
export default BidAuction

