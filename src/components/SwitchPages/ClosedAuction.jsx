import React, { useEffect, useState } from 'react';

function ClosedAuctionPage() {
  const [auctionData, setAuctionData] = useState(null);

  useEffect(() => {
    fetch('https://auctioneer2.azurewebsites.net/auction/7bac')
      .then(response => response.json())
      .then(data => setAuctionData(data))
      .catch(error => console.error('Error fetching auction data:', error));
  }, []);

  if (!auctionData) {
    return <div>Loading...</div>;
  }

  const { itemName, itemDescription, highestBidAmount, endDate } = auctionData;

  return (
    <div className="container">
      <div className="auction-info">
        <h2>Closed Auction</h2>
        <p>This auction has ended and bidding is no longer available.</p>
        <h3>Item Information</h3>
        <p><strong>Item Name:</strong> {itemName}</p>
        <p><strong>Description:</strong> {itemDescription}</p>
        <p><strong>Current Highest Bid:</strong> {highestBidAmount}</p>
        <p><strong>End Date:</strong> {endDate}</p>
      </div>
      <div className="notice">
        <p><strong>Notice:</strong> Bidding for this item has ended. Thank you for your interest.</p>
      </div>
    </div>
  );
}

export default ClosedAuctionPage;
