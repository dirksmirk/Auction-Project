import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ClosedAuction() {
  // State variables to hold auction data and loading state
  const [auctionData, setAuctionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [closingBid, setClosingBid] = useState(0);

  // Get current location using useLocation hook from react-router-dom
  const location = useLocation();
  
  // Extract auction data from location state
  const auction = location.state ? location.state.auction : null;

  // Effect hook to handle changes in auction data
  useEffect(() => {
    if (auction) {
      // Calculate end time and current time in milliseconds
      const endTime = new Date(auction.EndDate).getTime();
      const currentTime = new Date().getTime();
      
      // Check if the auction has ended
      if (endTime < currentTime) {
        // If the auction has already ended
        setAuctionData([auction]); // Add the closed auction to state
        setLoading(false);

        // Fetch closing bid
        fetch(`https://auctioneer2.azurewebsites.net/bid/7bac/${auction.AuctionID}`)
          .then((res) => res.json())
          .then((data) => {
            // Calculate the highest bid from fetched bids
            const highest = data.reduce((maxBid, bid) => Math.max(maxBid, bid.Amount), 0);
            setClosingBid(highest);
          })
          .catch((error) => {
            console.error('Failed to fetch closing bid:', error);
          });
      } else {
        // If the auction is still ongoing
        setLoading(false); // No closed auction to display
      }
    } else {
      // If no auction is available in state
      setLoading(false); // No auction to display
    }
  }, [auction]); // Run this effect whenever auction data changes

  // Render loading message if loading state is true
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render closed auction data
  return (
    <div className="container">
      <div className="auction-info">
        <h2>Closed Auction</h2>
        {auctionData.length > 0 ? (
          // Map through auctionData to display auction information
          auctionData.map((auction, index) => (
            <div key={index}>
              <p><strong>Item Name:</strong> {auction.Title}</p>
              <p><strong>Description:</strong> {auction.Description}</p>
              <p><strong>Start Date:</strong> {auction.StartDate}</p>
              <p><strong>End Date:</strong> {auction.EndDate}</p>
              <p><strong>Closing Bid:</strong> {closingBid}</p> {/* Display closing bid */}
              <hr />
            </div>
          ))
        ) : (
          // Display message if there is no closed auction to display
          <div>
            <p>No closed auction to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClosedAuction;
