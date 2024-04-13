import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AuctionItem from './smaller components/AuctionItem';

function Home() {
    // Define state variables to manage auctions data, loading status, and errors
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch auctions data from the API when component mounts
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
                console.log(data);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Render loading message if data is still loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error message if there's an error fetching data
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Function to check if an auction has ended
    const hasAuctionEnded = (auction) => {
        const endTime = new Date(auction.EndDate).getTime(); // Convert end time to milliseconds
        const currentTime = new Date().getTime(); // Get current time in milliseconds
        return endTime < currentTime;
    };

    // Render the list of auction items if data is successfully fetched
    return (
        <div style={{ margin: '20px' }}>
            <h1>Auction Items</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {auctions.length > 0 && auctions.map((auction, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', textAlign: 'center', flex: '0 0 20%' }}>
                        {/* Render AuctionItem component */}
                        <AuctionItem auction={auction} />
                        {/* Conditional rendering for buttons based on auction status */}
                        {hasAuctionEnded(auction) ? (
                            // If the auction has ended, display a button to view closed auction details
                            <Link to={`/closed/${auction.AuctionID}`} state={{ auction: auction }} style={{ textDecoration: 'none' }}>
                                <button style={{ marginTop: '10px' }}>Closed Auction</button>
                            </Link>
                        ) : (
                            // If the auction is ongoing, display a button to go to the bidding page
                            <Link to={`/bid/${auction.AuctionID}`} state={{auction: auction}} style={{ textDecoration: 'none' }}>
                                <button style={{ marginTop: '10px' }}>Go to auction</button>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
