import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AuctionItem from './smaller components/AuctionItem';
import { SearchContext } from '../../Context';

function Home() {
    const { myValue } = useContext(SearchContext);
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

    const filteredAuctions = myValue
        ? auctions.filter(auction => auction.Title && auction.Title.toLowerCase().includes(myValue.toLowerCase()))
        : auctions;

    // Render the list of auction items if data is successfully fetched
    return (
        <div style={{ margin: '20px' }}>
            <h1>Auction Items</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {filteredAuctions.length > 0 ? (
                    filteredAuctions.map((auction, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', textAlign: 'center', flex: '0 0 20%' }}>
                        {/* Render AuctionItem component */}
                        <AuctionItem auction={auction} />
                        <Link to={`/bid/${auction.AuctionID}`} state={{auction: auction}} style={{ textDecoration: 'none' }}> {/* Use Link instead of button */}
                            <button style={{ marginTop: '10px' }}>Go to auction</button>
                        </Link>
                    </div>
                    ))
                ) :(
                    <div>No auctions found</div>
                )}
            </div>
        </div>
    );
}

export default Home;

