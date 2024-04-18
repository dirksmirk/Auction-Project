import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';

function ClosedAuction() {
  // State variables
  const [loading, setLoading] = useState(true); // State for loading status
  const location = useLocation(); // Location hook from react-router-dom
  const auction = location.state ? location.state.auction : null; // Auction object from location state

  // Effect hook to handle loading state
  useEffect(() => {
    setLoading(false); // Set loading state to false when component mounts
  }, []);

  // JSX rendering
  if (loading) {
    // Render loading indicator if still loading
    return <div>Loading...</div>;
  }

  return (
    // Main box container for the closed auction details
    <Box
      p={4}
      bg="#f5f5dc" // Beige background color
      width="100%"
      maxW="500px"
      boxShadow="lg"
      rounded="md"
      position="relative"
      border="10px solid #8b4513" // Dark brown border color
    >
      {/* Heading for the closed auction section */}
      <Heading as="h3" size="md" mb={4} textAlign="center">
        Closed Auction
      </Heading>
      {auction ? ( // Conditionally render auction details if auction object exists
        <Box>
          {/* List to display auction details */}
          <List spacing={3} fontSize="lg">
            <ListItem>
              <Text as="b">Title:</Text> {auction.Title} {/* Title of the auction */}
            </ListItem>
            <ListItem>
              <Text as="b">Item Name:</Text> {auction.Description} {/* Description of the item */}
            </ListItem>
            <ListItem>
              <Text as="b">Description:</Text> {auction.Description} {/* Description of the auction */}
            </ListItem>
            <ListItem>
              <Text as="b">Start Date:</Text> {auction.StartDate.substring(0, 10)} {/* Display only the first 10 characters of the start date */}
            </ListItem>
            <ListItem>
              <Text as="b">End Date:</Text> {auction.EndDate.substring(0, 10)} {/* Display only the first 10 characters of the end date */}
            </ListItem>
            <ListItem>
              <Text as="b">Closing Bid:</Text> {auction.ClosingBid} {/* Closing bid amount */}
            </ListItem>
          </List>
        </Box>
      ) : (
        // Render message if no auction data is available
        <Box>
          <p>No closed auction to display.</p>
        </Box>
      )}
      {/* Triangle shape to indicate the top of the box */}
      <Box
        position="absolute"
        top="-20px"
        left="50%"
        transform="translateX(-50%)"
        width="0"
        height="0"
        borderLeft="10px solid transparent"
        borderRight="10px solid transparent"
        borderBottom="15px solid #f5f5dc" // Match background color
      ></Box>
    </Box>
  );
}

export default ClosedAuction;
