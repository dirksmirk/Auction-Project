

const AuctionItem = ({ auction, setAuctionId }) => {
    return (
        <div className={styles.itemContainer}>
            <img className={styles.auctionImage} src="" alt=""/>
            <div className={styles.auctionContent}>
                <p className={styles.auctionTitle}>{auction.Title}</p>
            </div>

            <div className={styles.btnContainer}>
                <button onClick={() => {
                    setAuctionId(auction.AuctionID)
                    }} 
                    className={styles.detailsBtn}>Details</button>
            </div>
        </div>
    );
}

export default AuctionItem