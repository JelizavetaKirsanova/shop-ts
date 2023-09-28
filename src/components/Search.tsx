import { Center, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import getAdByTitle from "../services/firebase/getAdByTitle";
import searchStore from "../store/SearchStore";
import languageStore from "../store/LanguageStore";

function Search() {
  const [value, setValue] = useState("");

  return (
    <>
      <Center h="100px" color="black">
        <Input
          placeholder="Search..."
          width="370px"
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
            value ? (
              getAdByTitle(value).then((ads) => {
                searchStore.setAds(ads);
              })
            ) : (
              <></>
            );
          }}
          disabled={true}
        >
          {languageStore.current == "en" ? (
                      <p>Find</p>
                    ) : languageStore.current == "ru" ? (
                      <p>Поиск</p>
                    ) : (
                      <p> Otsing</p>
                    )}
        </Button>
      </Center>
    </>
  );
}
export default Search;
