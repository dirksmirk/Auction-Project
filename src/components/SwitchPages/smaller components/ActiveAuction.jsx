const ActiveAuction = (auction) => {
    const endTime = new Date(auction.EndDate).getTime(); // Convert end time to milliseconds
    const currentTime = new Date().getTime(); // Get current time in milliseconds
    return endTime > currentTime;
};

export default ActiveAuction