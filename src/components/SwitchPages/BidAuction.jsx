import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import AuctionItem from "./smaller components/AuctionItem";

const BidAuction = () => {
    const [bids, setBids] = useState([]);
    const [newBidAmount, setNewBidAmount] = useState('');
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
        if (isNaN(newBidAmount) || newBidAmount <= 0) {
            console.error('Invalid bid amount');
            return;
        }
        
        fetch('https://auctioneer2.azurewebsites.net/place-bid/7bac', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                AuctionID: auction.AuctionID,
                Amount: newBidAmount,
                GroupCode: "7bac",
                Bidder: newBidder,
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
            setNewBidAmount('');
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
                    <li key={index}>Bid: {bid.amount}</li>
                ))}
            </ul>
            <form onSubmit={handleBidSubmit}>
                <label>
                    New Bid Amount:
                    <input type="number" value={newBidAmount} onChange={(e) => setNewBidAmount(e.target.value)} />
                </label>
                <button type="submit">Place Bid</button>
            </form>
        </div>
    );
}

export default BidAuction;









    // async function handleSubmit(e) {
    //   e.preventDefault();
    // }