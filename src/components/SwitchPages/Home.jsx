import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuctionItem from './smaller components/AuctionItem';

function Home() {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://auctioneer2.azurewebsites.net/auction/7bac')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setAuctions(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    
 const handleDelete=(auctionID)=>{
    fetch(`https://auctioneer2.azurewebsites.net/auction/7bac/${auctionID}`, {
        method: 'DELETE',
        
    })
    .then(response=>{
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        setAuctions(prevAuctions => prevAuctions.filter(auction => auction.AuctionID !== auctionID));
    })
    .catch(error => {
        console.log(error);
    });
 }

    const handleDeleteAuction =(auctionID)=>{

        fetch(`https://auctioneer2.azurewebsites.net/auction/7bac/${auctionID}`)
        .then(response=>{
           if (!response.ok){
            throw new Error('Network response was not ok');
           }
           return response.json();
        })
        .then(bids=>{
            if (bids.length===0){
                handleDelete (auctionID);
            }else{
                alert("This auction has bids and cannot be deleted")
            }
        })
        .catch(error => {
            console.error('Error fetching bids:', error);
        });
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ margin: '20px' }}>
            <h1>Auction Items</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {auctions.length > 0 && auctions.map((auction, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', textAlign: 'center', flex: '0 0 20%' }}>
                        <AuctionItem auction={auction} onDelete={handleDeleteAuction} />
                        <Link to={`/bid/${auction.AuctionID}`} state={{auction: auction}} style={{ textDecoration: 'none' }}>
                            <button style={{ marginTop: '10px' }}>Go to auction</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;