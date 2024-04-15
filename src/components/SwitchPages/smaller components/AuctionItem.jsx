import { Heading, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import EndedAuction from './EndedAuction';

const AuctionItem = ({ auction, isBidding, setAuctionId, onDelete }) => {
    
    const handleDelete = () => {
        // Call onDelete function with auction ID
        onDelete(auction.AuctionID);
    };

    return (
        <div style={{ border: '1px solid red', padding: '10px' }}>
            {auction && (
                <>
                    <Heading as='h1'>{auction.Title}</Heading>
                    {isBidding && 
                        <Text><b>Description: </b> - {auction.Description}</Text>}
                    <Text >Start price - {auction.StartingPrice}</Text>
                    <Text>Seller - {auction.CreatedBy}</Text>
                    <Text><b>Start date</b> -  {auction.StartDate}</Text>
                    <Text><b>End date</b> - {auction.EndDate}</Text>
                    {onDelete && 
                        <Button 
                            _hover={{ boxShadow: 'lg', background: 'darkGrey' }} 
                            m={2} 
                            onClick={handleDelete}>
                                Delete</Button>}
                    {EndedAuction(auction) ? (
                        <Link to={`/closed/${auction.AuctionID}`} state={{ auction: auction }} style={{ textDecoration: 'none' }}>
                            <Button m={5}>Closed Auction</Button>
                        </Link>
                        ) : (
                        <Link to={`/bid/${auction.AuctionID}`} state={{auction: auction}} style={{ textDecoration: 'none' }}>
                            <Button m={5}>Go to auction</Button>
                        </Link>
                        )}
                </>
            )}
        </div>
    );
}

export default AuctionItem;
