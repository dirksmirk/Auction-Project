const AuctionItem = ({ auction, isBidding, setAuctionId }) => {
    return (
        <div style={{ border: '1px solid red', padding: '10px' }}>
            {auction && (
                <>
                    <h1>{auction.Title}</h1>
                    {isBidding && <p><b>Description: </b> - {auction.Description}</p>}
                    <p>Start price - {auction.StartingPrice}</p>
                    <p>Seller - {auction.CreatedBy}</p>
                    <p><b>Sart date</b> -  {auction.StartDate}</p>
                    <p><b>End date</b> - {auction.EndDate}</p>
                </>
            )}
        </div>
    );
}

export default AuctionItem