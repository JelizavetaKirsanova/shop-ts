import { Center, HStack, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import AdComponent from "./Ad";
import { useEffect, useState } from "react";
import adType from "../types/adType";
import getAdsByCategory from "../services/firebase/getAdsByCategory";
import categoryType from "../types/categoryType";

function CategoryComponent({ category }: { category: categoryType }) {
  const [ads, setAds] = useState<adType[] | null>(null);
  useEffect(() => {
    (async () => {
      setAds(await getAdsByCategory(category.id));
    })();
  }, []);

  return (
    <>
      
      <VStack w="100%" m={6}>
        <SimpleGrid spacing={10} columns={3}>
          {ads ? ads.map((ad) => <AdComponent key={ad.id} ad={ad} />) : <></>}
        </SimpleGrid>
      </VStack>
    </>
  );
}

export default CategoryComponent;
