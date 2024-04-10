import { useRef } from "react";

const CreateAuction = () => {
    const title = useRef();
    const description = useRef();
    const startBid = useRef();
    const startTime = useRef();
    const endTime = useRef();
    const creator = useRef();

    // Function to get formatted current datetime
    function getCurrentDateTime() {
        const now = new Date();
        return now.toISOString().slice(0, 16);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (title.current.value === '' || description.current.value === '' || startTime.current.value === '' || endTime.current.value === '' || startBid.current.value === '' || creator.current.value === '') {
            alert("Alla fält måste fyllas i.");
            return; // Stoppa funktionen här om något fält är tomt
        }
        
        const data = {
            "Title": title.current.value,
            "Description": description.current.value,
            "StartDate": startTime.current.value,
            "EndDate": endTime.current.value,
            "GroupCode": "7bac",
            "StartingPrice": startBid.current.value,
            "CreatedBy": creator.current.value
        };
        console.log(data);
    
        try {
            const response = await fetch('https://auctioneer2.azurewebsites.net/auction/7bac', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            console.log('Auction created successfully:', responseData);

            alert("Du har skapat auktionen!");
            
        } catch (error) {
            console.error('Error creating auction:', error);
        }
    }

    return (
        <div>
            <h1>New Auction</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titel</label><br />
                    <input type="text" name="title" ref={title} />
                </div>
                <div>
                    <label htmlFor="description">Ge en beskrivning av ditt föremål!</label><br />
                    <textarea name="description" ref={description} />
                </div>
                <div>
                    <label htmlFor="startBid">Start bud</label><br />
                    <input type="number" name="startBid" ref={startBid} />
                </div>
                <div>
                    <label htmlFor="startTime">Start tid</label><br />
                    <input type="datetime-local" name="startTime" ref={startTime} defaultValue={getCurrentDateTime()}/>
                </div>
                <div>
                    <label htmlFor="endTime">Slut tid</label><br />
                    <input type="datetime-local" name="endTime" ref={endTime} />
                </div>
                <div>
                    <label htmlFor="creator">Ditt namn</label><br />
                    <input type="text" name="creator" ref={creator} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateAuction;

