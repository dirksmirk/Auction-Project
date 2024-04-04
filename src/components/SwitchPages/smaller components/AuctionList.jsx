import AuctionItem from "./AuctionItem";

const AuctionList = ({ auctionData, setAuctionId }) => {
    return (
        <>
            {auctionData.map((auction) => (
                <div key={auction.AuctionID} onClick={() => setAuctionId(auction.AuctionID)}>
                    <AuctionItem setAuctionId={setAuctionId} auction={auction} />
                </div>
            ))}
        </>
    )
}

export default AuctionList;