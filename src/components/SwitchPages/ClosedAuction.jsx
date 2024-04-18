import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';

// Define the ClosedAuction component
function ClosedAuction() {
  // Define state variables using the useState hook
  const [loading, setLoading] = useState(true); // Loading state
  const [highestBid, setHighestBid] = useState(0); // Highest bid state
  const location = useLocation(); // Get the current location using the useLocation hook
  const auction = location.state ? location.state.auction : null; // Retrieve auction data from the location state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  // useEffect hook to handle initial loading state
  useEffect(() => {
    setLoading(false); // Set loading to false when component mounts
  }, []);

  // useEffect hook to fetch bid data when auction changes
  useEffect(() => {
    // Define asynchronous function to fetch bid data
    const fetchBids = async () => {
      try {
        if (!auction) {
          return; // If no auction data, return
        }
        // Fetch bid data from API
        const response = await fetch(`https://auctioneer2.azurewebsites.net/bid/7bac/${auction.AuctionID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bids'); // Throw error if fetching fails
        }
        // Parse response data
        const data = await response.json();
        // Find the highest bid amount
        const highestBid = data.reduce((highest, bid) => Math.max(highest, bid.Amount), 0);
        // Set the highest bid state
        setHighestBid(highestBid);
      } catch (error) {
        console.error('Error fetching bids:', error); // Log error if fetching fails
        setErrorMessage('Error fetching bids'); // Set error message state
      }
    };
    fetchBids(); // Call the fetchBids function
  }, [auction]); // Depend on auction state change

  // Conditional rendering based on loading state
  if (loading) {
    return <div>Loading...</div>; // Render loading message if still loading
  }

  // Render auction details
  return (
    <>
      {/* Auction details box */}
      <Box
        p={4}
        bg="#f5f5dc"
        width="100%"
        maxW="500px"
        boxShadow="lg"
        rounded="md"
        position="relative"
        border="10px solid #8b4513"
      >
        {/* Heading */}
        <Heading as="h3" size="md" mb={4} textAlign="center">
          Closed Auction
        </Heading>
        {/* Auction details */}
        {auction ? (
          <Box>
            {/* List of auction details */}
            <List spacing={3} fontSize="lg">
              <ListItem>
                <Text as="b">Title:</Text> {auction.Title}
              </ListItem>
              <ListItem>
                <Text as="b">Item Name:</Text> {auction.Description}
              </ListItem>
              <ListItem>
                <Text as="b">Description:</Text> {auction.Description}
              </ListItem>
              <ListItem>
                <Text as="b">Start Date:</Text> {auction.StartDate.substring(0, 10)}
              </ListItem>
              <ListItem>
                <Text as="b">End Date:</Text> {auction.EndDate.substring(0, 10)}
              </ListItem>
              <ListItem>
                <Text as="b">Highest Bid:</Text> {highestBid}
              </ListItem>
            </List>
          </Box>
        ) : (
          // If no auction data, display a message
          <Box>
            <p>No closed auction to display.</p>
          </Box>
        )}
        {/* Triangle decoration */}
        <Box
          position="absolute"
          top="-20px"
          left="50%"
          transform="translateX(-50%)"
          width="0"
          height="0"
          borderLeft="10px solid transparent"
          borderRight="10px solid transparent"
          borderBottom="15px solid #f5f5dc"
        ></Box>
      </Box>
      {/* Error message display */}
      <Text color='red' textAlign='center' margin='5px'>{errorMessage && <div>{errorMessage}</div>} </Text>
    </>
  );
}

export default ClosedAuction; // Export the ClosedAuction component
