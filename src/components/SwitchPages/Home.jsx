
import { useState, useEffect, useContext } from 'react';
import { Button, Card, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AuctionItem from './smaller components/AuctionItem';
import { SearchContext } from '../../Context';
import EndedAuction from './smaller components/EndedAuction';
import ActiveAuction from './smaller components/ActiveAuction';


function Home() {

    const { myValue } = useContext(SearchContext);
    // Define state variables to manage auctions data, loading status, and errors
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://auctioneer2.azurewebsites.net/auction/7bac')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setAuctions(data);
                setLoading(false);
                console.log(data);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

 const handleDelete=(auctionID)=>{
    fetch(`https://auctioneer2.azurewebsites.net/auction/7bac/${auctionID}`, {
        method: 'DELETE',
        
    })
    .then(response=>{
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        setAuctions(prevAuctions => prevAuctions.filter(auction => auction.AuctionID !== auctionID));
    })
    .catch(error => {
        console.log(error);
    });
 }

    const handleDeleteAuction =(auctionID)=>{
        fetch(`https://auctioneer2.azurewebsites.net/bid/7bac/${auctionID}`)
        .then(response=>{
           if (!response.ok){
            throw new Error('Network response was not ok');
           }
           return response.json();
        })
        .then(bids=>{
            if (bids.length===0){
                handleDelete (auctionID);
            }else{
                alert("This auction has bids and cannot be deleted")
            }
        })
        .catch(error => {
            console.error('Error fetching bids:', error);
        });
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const filteredAuctions = myValue
        ? auctions.filter(auction => auction.Title && auction.Title.toLowerCase().includes(myValue.toLowerCase()))
        : auctions.filter(auction => ActiveAuction(auction));

    return (
        <Box 
        backgroundColor="#ce9c75" 
        m={4} 
        width="100%" 
        border='10px' 
        borderStyle='ridge' 
        borderColor='#aa623d' 
        borderRadius={5}>
            <Box 
            display="flex" 
            flexWrap="wrap">
                {filteredAuctions.length > 0 ? (
                    filteredAuctions.map((auction, index) => (
                    <Card key={index} 
                        style={{ padding: '20px', margin: '20px', textAlign: 'center'}}
                        backgroundColor="#f9eab0"
                        _hover={{ boxShadow: 'lg' }}
                        flex='1 0 25%'
                        >
                        <AuctionItem auction={auction} onDelete={handleDeleteAuction} />
                        {EndedAuction(auction) ? (
                            <Link to={`/closed/${auction.AuctionID}`} state={{ auction: auction }}>
                            <Button m={5}>Closed Auction</Button>
                        </Link>
                        ) : (
                        <Link to={`/bid/${auction.AuctionID}`} state={{auction: auction}}>
                            <Button m={5}>Go to auction</Button>
                        </Link>
                        )}
                    </Card>
                    ))
                ) :(
                    <Box>
                        Sorry, there are no auction under that name! <br />
                        Please come back again later and someone might have posted something.</Box>
                )}
            </Box>
        </Box>
    );
}

export default Home;

