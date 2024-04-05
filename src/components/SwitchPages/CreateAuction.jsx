import { useRef } from "react";

const CreateAuction = () => {
    const title = useRef();
    const description = useRef();
    const startBid = useRef();
    const startTime = useRef();
    const endTime = useRef();
    const creator = useRef()


async function handleSubmit(e) {
    e.preventDefault();
    
    const data = {
        "Title": title.current.value,
        "Description": description.current.value,
        "StartDate": startTime.current.value,
        "EndDate": endTime.current.value,
        "GroupCode": "7bac",
        "StartingPrice": startBid.current.value,
        "CreatedBy": creator.current.value
    };
    console.log(data)

     await fetch('https://auctioneer2.azurewebsites.net/auction/7bac',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     }) 
     .then(response=>response.json())  
     .then(data => {
        console.log('Auction created successfully:', data);
        
    })
    .catch(error => {
        console.error('Error creating auction:', error);
    }); 

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
                <input type="datetime-local" name="startTime" ref={startTime} />
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
      
    
  )
}

export default CreateAuction
