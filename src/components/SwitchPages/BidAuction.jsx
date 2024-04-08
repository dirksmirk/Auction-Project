import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import AuctionItem from "./smaller components/AuctionItem";

const BidAuction = () => {
    const [bids, setBids] = useState([]);
    const newBidAmount = useRef();
    const newBidder = useRef();
    const location = useLocation();
    const auction = location.state.auction;

    useEffect(() => {
        const getAllBids = () => {
            fetch(`https://auctioneer2.azurewebsites.net/bid/7bac/${auction.AuctionID}`)
                .then((res) => res.json())
                .then((data) => {
                    setBids(data);
                })
                .catch((error) => {
                    console.error('Failed to fetch bids:', error);
                });
        };
        getAllBids();
    }, [auction.AuctionID]);

    const handleBidSubmit = (e) => {
        e.preventDefault();
        /* if (isNaN(newBidAmount) || newBidAmount <= 0) {
            console.error('Invalid bid amount');
            return;
        } */
        
        fetch(`https://auctioneer2.azurewebsites.net/bid/7bac`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "AuctionID": auction.AuctionID,
                "Amount": newBidAmount.current.value,
                "GroupCode": "7bac",
                "Bidder": newBidder.current.value
            }),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to place bid');
            }
            return res.json();
        })
        .then((data) => {
            console.log('Bid placed successfully:', data);
            setBids([...bids, data]);
        })
        .catch((error) => {
            console.error('Failed to place bid:', error);
        });
    };

    return (
        <div>
            {auction && <AuctionItem isBidding={true} auction={auction} />}
            <ul>
                {bids.map((bid, index) => (
                    <li key={index}>Bid: {bid.Amount}</li>
                ))}
            </ul>
            <form onSubmit={handleBidSubmit}>
                <label>
                    New Bid Amount:
                    <input type="number" ref={newBidAmount} />
                </label>
                <label>
                    Enter name:
                    <input type="text" ref={newBidder} />
                </label>
                <button type="submit">Place Bid</button>
            </form>
        </div>
    );
}

export default BidAuction;

