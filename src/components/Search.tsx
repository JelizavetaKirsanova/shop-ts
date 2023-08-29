import { Center, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import getAdByTitle from "../services/firebase/getAdByTitle";
import searchStore from "../store/SearchStore";

function Search() {
  const [value, setValue] = useState("");

  return (
    <>
      <Center h="100px" color="black">
        <Input
          placeholder="Search..."
          width="350px"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <Button
          p="4"
          m="2"
          colorScheme="green"
          onClick={() => {
            getAdByTitle(value).then((ads) => {
              searchStore.setAds(ads);
            });
          }}
          disabled = {true}
        >
          Find
        </Button>
      </Center>
    </>
  );
}
export default Search;
