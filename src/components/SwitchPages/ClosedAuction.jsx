import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom

function ClosedAuction() {
  const [auctionData, setAuctionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const auction = location.state ? location.state.auction : null;

  useEffect(() => {
    if (auction) {
      const endTime = new Date(auction.EndDate).getTime();
      const currentTime = new Date().getTime();
      if (endTime < currentTime) {
        // If the auction has already ended
        setAuctionData([auction]); // Add the closed auction to state
        setLoading(false);
      } else {
        // If the auction is still ongoing
        setLoading(false); // No closed auction to display
      }
    } else {
      // If no auction is available in state
      setLoading(false); // No auction to display
    }
  }, [auction]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="auction-info">
        <h2>Closed Auction</h2>
        {auctionData.length > 0 ? (
          auctionData.map((auction, index) => (
            <div key={index}>
              <p><strong>Item Name:</strong> {auction.Title}</p>
              <p><strong>Description:</strong> {auction.Description}</p>
              <p><strong>Start Date:</strong> {auction.StartDate}</p>
              <p><strong>End Date:</strong> {auction.EndDate}</p>
              <hr />
            </div>
          ))
        ) : (
          <div>
            <p>No closed auction to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClosedAuction;
