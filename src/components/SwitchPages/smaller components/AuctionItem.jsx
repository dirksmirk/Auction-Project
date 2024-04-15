import { Heading, Text, Button, Card, CardHeader, CardBody } from '@chakra-ui/react'

const AuctionItem = ({ auction, isBidding, setAuctionId, onDelete }) => {
    
    const handleDelete = () => {
        // Call onDelete function with auction ID
        onDelete(auction.AuctionID);
    };

    return (
        <Card /* style={{ border: '1px solid red', padding: '10px' }} */>
            {auction && (
                <>
                    <Heading as='h1'>{auction.Title}</Heading>
                    <CardBody>
                        {isBidding && 
                            <Text><b>Description: </b> - {auction.Description}</Text>}
                        <Text >Start price - {auction.StartingPrice}</Text>
                        <Text>Seller - {auction.CreatedBy}</Text>
                        <Text><b>Start date</b> -  {auction.StartDate}</Text>
                        <Text><b>End date</b> - {auction.EndDate}</Text>
                        {onDelete && 
                            <Button 
                            _hover={{ boxShadow: 'lg', background: 'darkGrey' }}
                            background='pink'
                            m={2}
                            onClick={handleDelete}>
                                Delete</Button>}
                    </CardBody>
                    
                </>
            )}
        </Card>
    );
}

export default AuctionItem;
