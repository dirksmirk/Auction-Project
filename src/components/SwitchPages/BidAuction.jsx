import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { List, ListItem, UnorderedList, Text, Box, Input, Button } from '@chakra-ui/react';
import AuctionItem from "./smaller components/AuctionItem";

const BidAuction = () => {
    const [bids, setBids] = useState([]); // State for storing bids
    const newBidAmount = useRef(); // Ref for new bid amount input field
    const newBidder = useRef(); // Ref for new bidder input field
    const location = useLocation(); // Hook for accessing the current URL location
    const auction = location.state.auction; // Extracting auction data from the location state
    const [errorMessage, setErrorMessage] = useState('');
    const [highestBid, setHighestBid] = useState(0); 

    useEffect(() => {
        const getAllBids = () => {
            fetch(`https://auctioneer2.azurewebsites.net/bid/7bac/${auction.AuctionID}`)
                .then((res) => res.json())
                .then((data) => {
                  setBids(data);
                  
                  const highest = data.reduce((maxBid, bid) => Math.max(maxBid, bid.Amount), 0);
                  setHighestBid(highest);
              })
              .catch((error) => {
                  console.error('Failed to fetch bids:', error);
              });
      };
      getAllBids();
  }, [auction.AuctionID]);

    const handleBidSubmit = (e) => {
        e.preventDefault();

        const currentBidAmount = parseFloat(newBidAmount.current.value);

        const now = new Date();
        const startDate = new Date(auction.StartDate);
  

        if (now < startDate) {
          setErrorMessage("The auction has not started yet.")

          return;
        }

        const highestBid = bids.reduce((maxBid, bid) => Math.max(maxBid, bid.Amount), 0);

        if (currentBidAmount <= highestBid) {
          setErrorMessage('Your bid amount is too low!')

          return;
        }
        
        fetch(`https://auctioneer2.azurewebsites.net/bid/7bac`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "AuctionID": auction.AuctionID,
                "Amount": newBidAmount.current.value,
                "GroupCode": "7bac",
                "Bidder": newBidder.current.value
            }),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to place bid');
            }
            return res.json();
        })
        .then(() => {
            setBids(prevBids => [...prevBids, { Amount: newBidAmount.current.value, Bidder: newBidder.current.value }]);
            setHighestBid(Math.max(highestBid, currentBidAmount));
            setErrorMessage('')
          })
        .catch((error) => {
            console.error('Failed to place bid:', error);
        });
    };

    

    return (
      <>
      <Box display="flex" justifyContent='space-around' margin='20px'>

            {auction && <AuctionItem isBidding={true} auction={auction} />}
          <Box>
          <Box margin='10px'>
            <Text fontSize='20px' as='b'>Bid history</Text>
            </Box>

            <UnorderedList>
            <List spacing={0}>
                {bids.map((bid, index) => (
                    <ListItem fontSize='15px' key={index}>
                       <Text fontSize='15px' as='b' textAlign='left'>Bid by: </Text>{bid.Bidder}: {bid.Amount}</ListItem>
                ))}

          <Box margin='10px'>
            <Text fontSize='20px' as='b'>Highest bid</Text> <Text>{highestBid}</Text>
            </Box>
            </List>
            </UnorderedList>
            </Box>
            </Box>
                  
            <Text color='red'textAlign='center'margin='5px'>{errorMessage && <div>{errorMessage}</div>} </Text>

            <form onSubmit={handleBidSubmit}>
                <label>
                    New Bid Amount:
                    <Input variant='filled' width='20%' type="number" ref={newBidAmount} />
                </label>
                <label> 
                    Enter name:
                    <Input variant='filled' width='20%' type="text" ref={newBidder} />
                </label>
                <Button colorScheme='gray' variant='solid' margin='20px' type="submit">Place Bid</Button>
            </form>
      </>
    );
}

export default BidAuction;
