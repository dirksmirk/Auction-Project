import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, List, ListItem } from '@chakra-ui/react';

function ClosedAuction() {
  const [auctionData, setAuctionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [closingBid, setClosingBid] = useState(0);
  const location = useLocation();
  const auction = location.state ? location.state.auction : null;

  useEffect(() => {
    if (auction) {
      const endTime = new Date(auction.EndDate).getTime();
      const currentTime = new Date().getTime();

      if (endTime < currentTime) {
        setAuctionData([auction]);
        setLoading(false);

        fetch(`https://auctioneer2.azurewebsites.net/bid/7bac/${auction.AuctionID}`)
          .then((res) => res.json())
          .then((data) => {
            const highest = data.reduce((maxBid, bid) => Math.max(maxBid, bid.Amount), 0);
            setClosingBid(highest);
          })
          .catch((error) => {
            console.error('Failed to fetch closing bid:', error);
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [auction]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box backgroundColor="beige" m={4} mt={20} width="100%" border="10px" borderStyle="ridge" borderColor="#aa623d" borderRadius={5}>
      <Heading as="h3" size="lg" mb={4}>
        Closed Auction
      </Heading>
      {auctionData.length > 0 ? (
        auctionData.map((auction, index) => (
          <Box key={index}>
            <List spacing={3} fontSize="lg">
              <ListItem>Title: {auction.Title}</ListItem>
              <ListItem>Item Name: {auction.Description}</ListItem>
              <ListItem>Description: {auction.Description}</ListItem>
              <ListItem>Start Date: {auction.StartDate}</ListItem>
              <ListItem>End Date: {auction.EndDate}</ListItem>
              <ListItem>
                <span role="img" aria-label="Checkmark">🧑‍⚖️</span> Closing Bid: {closingBid}
              </ListItem>
            </List>
          </Box>
        ))
      ) : (
        <Box>
          <p>No closed auction to display.</p>
        </Box>
      )}
    </Box>
  );
}

export default ClosedAuction;
