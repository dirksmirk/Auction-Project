import { useRef } from "react";
import { Input ,Center,  Textarea,Text, NumberInput,Button, NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,Card, FormLabel,FormControl,} from '@chakra-ui/react'

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

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (title.current.value === '' || description.current.value === '' || startTime.current.value === '' || endTime.current.value === '' || startBid.current.value === '' || creator.current.value === '') {
            alert ("Alla fält måste fyllas i.");
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
        alert("Auktionen har skapats ");
    }

    // Render form for creating a new auction
    return (
        <Center>
        <Card maxW='lg'  borderWidth='19px' mt={20} mb={20}  p={55}  bg='beige' borderColor='grey'  >

             <FormControl >
                
           <Text   fontSize='5xl'as='b' >New Auction </Text>
            <form onSubmit={handleSubmit}   >
                <div>
                
                <FormLabel htmlFor="Title">Title</FormLabel>
                    <Input type="text" name="title" ref={title} borderColor='black'placeholder='Title'  />
                </div>

                <div>
                <FormLabel htmlFor="Title"> Description</FormLabel>
                    <Textarea name="description" ref={description} borderColor='black.900' placeholder='right your description'  />
                </div>

                <div>
                <FormLabel htmlFor="startBid"borderColor='black.900' >Start Bid</FormLabel>
                   <NumberInput defaultValue={15} min={0} max={10000000} name="startBid"  ref={startBid} borderColor='black' >
                     <NumberInputField />
                      <NumberInputStepper>
                       <NumberIncrementStepper />
                      <NumberDecrementStepper />
                       </NumberInputStepper>
                    </NumberInput>
                </div>
                <div>
                <FormLabel htmlFor="startTime">Start Time</FormLabel>
                    <Input type="datetime-local" borderColor='black.900' name="startTime"  ref={startTime} defaultValue={getCurrentDateTime()} />
                </div>
                <div>
                <FormLabel htmlFor="endTime">End Time</FormLabel>
                    <Input type="datetime-local" borderColor='black.900' name="endTime" ref={endTime} />
                </div>
                <div>
                <FormLabel htmlFor="creator">Your Name</FormLabel>
                    <Input type="text" name="creator" ref={creator} borderColor='black.900'  />
                </div>
                <Button colorScheme='blue'  m={3} ml={105} type="submit">Create</Button>
            </form>
            
            </FormControl>
        </Card> 
        </Center>
    )
}

export default CreateAuction;
