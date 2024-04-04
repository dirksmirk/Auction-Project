import React,{useState} from 'react'

const CreateAuction = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startBid, setStartBid] = useState('');
    const [endTime, setEndTime] = useState('');

const handleSubmit=(e)=>{
    e.preventDefault();
    console.log({title, description, startBid, endTime})

    fetch('https://auctioneer.azurewebsites.net/auction/7bac',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description,  startBid, endTime})
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
                <label htmlFor="title">title</label>
                <input type="text" name="title" value={title} onChange={e=> setTitle (e.target.value)}/>
            </div>
            <div>
                <label htmlFor="description">description</label>
                <textarea name="description" value={description} onChange={e=> setDescription (e.target.value)}/>
            </div>
            <div>
                <label htmlFor="startBid">startBid</label>
                <input type="number" name="startBid" value={startBid} onChange={e=> setStartBid (e.target.value)}/>
            </div>
            <div>
                <label htmlFor="endTime">endTime</label>
                <input type="datetime-local" name="endTime" value={endTime} onChange={e=> setEndTime (e.target.value)}/>
            </div>
            <button type="submit">Create</button>
        </form>
    </div>
      
    
  )
}

export default CreateAuction
