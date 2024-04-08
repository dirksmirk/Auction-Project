/* import { useState, useEffect } from 'react'
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
    }, []) */

    /* const getAuction = () => {
        fetch(`https://auctioneer.azurewebsites.net/auction/7bac`)
        .then((response) => response.json)
        .then(result => {
            console.log(result)
            setAuctions(result)
        })
    } */

    /* return(
        <>
            <div>
                {Auctions && <ul>
                    {Auctions.map((auction, idx) => (
                        <li key={idx}> */
                            {/* <p>{auction.AuctionID}</p>
                            <p>{auction.Title}</p>
                            <p>{auction.Description}</p>
                            <p>{auction.StartingPrice}</p>
                            <p>{auction.CreatedBy}</p>
                            <p>{auction.StartDate}</p>
                            <p>{auction.EndDate}</p> */}
                            {/* <AuctionItem auction={auction}/>
                        </li>
                    ))}
                </ul>}
            </div>
        </>
    )
}

export default Home; */}

/* I commented the previous code and used inline styling (I know we are not supposed to do that but needed the boxes to Fit ) I (hopefully) have started to make it so there are 5 auctions in a row and have added a button so it takes you to the bidding page (button is not active) I left the red around the boxes so they show useParams, but added a box around it so we can see how it looks unstyled. If you want we can test it by having more auctions on the page to see if it functions correctly (I am not really sure how to create an auction and do not want to mess with that code on that page)  */

import React, { useState, useEffect } from 'react';
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

    // Render the list of auction items if data is successfully fetched
    return (
        <div style={{ margin: '20px' }}>
            <h1>Auction Items</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {auctions.length > 0 && auctions.slice(0, 5).map((auction, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', textAlign: 'center', flex: '0 0 20%' }}>
                        {/* Render AuctionItem component */}
                        <AuctionItem auction={auction} />
                        {/* Create a link to the BidAuction page with auction ID */}
                        <Link to={`/bid/${auction.AuctionID}`} style={{ textDecoration: 'none' }}>
                            {/* Button to bid on the auction */}
                            <button style={{ marginTop: '10px' }}>Bid on this auction</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;

