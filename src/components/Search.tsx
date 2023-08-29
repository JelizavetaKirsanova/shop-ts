import { Center, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import getAdByTitle from "../services/firebase/getAdByTitle";

function Search() {
    const[value, setValue] = useState("")


  return (
    
    <>
      <Center h="100px" color="black">
        <Input placeholder="Search..." width="350px" value={value} onChange={(event)=>{setValue(event.target.value)}} />
        <Button p="4" m="2" colorScheme="green" onClick={()=>{getAdByTitle(value)}}>
          Find
        </Button>
      </Center>
    </>
  );
}
export default Search;
