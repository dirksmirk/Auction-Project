import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ClosedAuction() {
  const [auctionData, setAuctionData] = useState([]);
  const location = useLocation();
  const auctions = location.state ? location.state.auctions : [];

  useEffect(() => {
    fetch('https://auctioneer2.azurewebsites.net/auction/7bac')
      .then(response => response.json())
      .then(data => setAuctionData(data))
      .catch(error => console.error('Error fetching auction data:', error));
  }, []);

  if (!auctionData.length) {
    return <div>Loading...</div>;
  }

  // Filter auctions that have ended
  const endedAuctions = auctionData.filter(auction => new Date(auction.EndDate) < new Date());

  return (
    <div className="container">
      <div className="auction-info">
        <h2>Closed Auctions</h2>
        {endedAuctions.map((auction, index) => (
          <div key={index}>
            <p><strong>Item Name:</strong> {auction.Title}</p>
            <p><strong>Description:</strong> {auction.Description}</p>
            <p><strong>Start Date:</strong> {auction.StartDate}</p>
            <p><strong>End Date:</strong> {auction.EndDate}</p>
            <hr />
          </div>
        ))}
      </div>
      <div className="notice">
        <p><strong>Notice:</strong> Bidding for these items has ended. Thank you for your interest.</p>
      </div>
    </div>
  );
}

export default ClosedAuction;
