const AuctionItem = ({ auction, isBidding, setAuctionId, onDelete }) => {
    
    const handleDelete = () => {
        // Call onDelete function with auction ID
        onDelete(auction.AuctionID);
    };

    return (
        <div style={{ border: '1px solid red', padding: '10px' }}>
            {auction && (
                <>
                    <h1>{auction.Title}</h1>
                    {isBidding && <p><b>Description: </b> - {auction.Description}</p>}
                    <p>Start price - {auction.StartingPrice}</p>
                    <p>Seller - {auction.CreatedBy}</p>
                    <p><b>Start date</b> -  {auction.StartDate}</p>
                    <p><b>End date</b> - {auction.EndDate}</p>
                    {onDelete && <button onClick={handleDelete}>Delete</button>}
                </>
            )}
        </div>
    );
}

export default AuctionItem;
