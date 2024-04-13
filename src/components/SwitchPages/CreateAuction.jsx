import { useRef } from "react";

const CreateAuction = () => {
    // Refs to store input values
    const title = useRef();
    const description = useRef();
    const startBid = useRef();
    const startTime = useRef();
    const endTime = useRef();
    const creator = useRef();

    // Function to get formatted current datetime
    function getCurrentDateTime() {
        const now = new Date();
        return now.toISOString().slice(0, 16); // Format datetime as YYYY-MM-DDTHH:mm
    }

    // Function to handle form submission
    async function handleSubmit(e) {
        e.preventDefault();
        
        // Create data object with form input values
        const data = {
            "Title": title.current.value,
            "Description": description.current.value,
            "StartDate": startTime.current.value,
            "EndDate": endTime.current.value,
            "GroupCode": "7bac",
            "StartingPrice": startBid.current.value,
            "CreatedBy": creator.current.value
        };

        // Send POST request to create auction
        await fetch('https://auctioneer2.azurewebsites.net/auction/7bac',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         }) 
         .then(response => response.json())  
         .then(data => {
            console.log('Auction created successfully:', data);
        })
        .catch(error => {
            console.error('Error creating auction:', error);
        });
    }

    // Render form for creating a new auction
    return (
        <div>
            <h1>New Auction</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label><br />
                    <input type="text" name="title" ref={title} />
                </div>
                <div>
                    <label htmlFor="description">Description</label><br />
                    <textarea name="description" ref={description} />
                </div>
                <div>
                    <label htmlFor="startBid">Start Bid</label><br />
                    <input type="number" name="startBid" ref={startBid} />
                </div>
                <div>
                    <label htmlFor="startTime">Start Time</label><br />
                    <input type="datetime-local" name="startTime" ref={startTime} defaultValue={getCurrentDateTime()} />
                </div>
                <div>
                    <label htmlFor="endTime">End Time</label><br />
                    <input type="datetime-local" name="endTime" ref={endTime} />
                </div>
                <div>
                    <label htmlFor="creator">Your Name</label><br />
                    <input type="text" name="creator" ref={creator} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateAuction;
