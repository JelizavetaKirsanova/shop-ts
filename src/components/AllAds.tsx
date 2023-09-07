import { VStack, SimpleGrid, GridItem, Grid, Center, Wrap, WrapItem, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import getAllAds from "../services/firebase/getAllAds";
import adType from "../types/adType";
import AdComponent from "./Ad";

function AllAds() {
  const [ads, setAds] = useState<adType[] | null>(null);
  useEffect(() => {
    (async () => {
      setAds(await getAllAds());
    })();
  }, []);

  return (<>

    
    <VStack w="100%" m={6}>
    <SimpleGrid spacing={10} columns={2}>
      {ads? ads.map((ad)=>(<AdComponent key={ad.id} ad={ad} />)):<></>}
      
    </SimpleGrid>
  </VStack>
    </>
  );
}

export default AllAds;
