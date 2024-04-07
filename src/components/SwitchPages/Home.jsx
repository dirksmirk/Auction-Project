import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
                {auctions.length > 0 && auctions.slice(0, 5).map((auction, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', textAlign: 'center', flex: '0 0 20%' }}>
                        <AuctionItem auction={auction} />
                        <Link to={`/bid/${auction.AuctionID}`} style={{ textDecoration: 'none' }}> {/* Use Link instead of button */}
                            <button style={{ marginTop: '10px' }}>Bid on this auction</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
