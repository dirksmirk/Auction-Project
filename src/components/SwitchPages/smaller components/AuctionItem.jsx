import { Heading, Text, Button, Card, CardBody, Center } from '@chakra-ui/react'

const AuctionItem = ({ auction, isBidding, setAuctionId, onDelete }) => {
    
    const handleDelete = () => {
        // Call onDelete function with auction ID
        onDelete(auction.AuctionID);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 10);
    };

    return (
        <Card padding={5} maxWidth='fit-content' alignSelf='center' /* style={{ border: '1px solid red', padding: '10px' }} */>
            {auction && (
                <>
                    <Heading as='h1'>{auction.Title}</Heading>
                    <CardBody>
                        {isBidding && 
                            <Text><b>Description: </b> - {auction.Description}</Text>}
                        <Text><b>Start price</b> - {auction.StartingPrice}</Text>
                        <Text><b>Seller</b> - {auction.CreatedBy}</Text>
                        <Text><b>Start date</b> -  {formatDate(auction.StartDate)}</Text>
                        <Text><b>End date</b> - {formatDate(auction.EndDate)}</Text>
                        {onDelete && 
                            <Button 
                            _hover={{ boxShadow: 'xl', background: 'red', color: 'white' }}
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
