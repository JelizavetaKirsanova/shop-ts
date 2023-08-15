import { HStack, Heading, VStack } from "@chakra-ui/react";
import AddComponent from "./Add";

function CategoryComponent() {
    
  return (
    <VStack w="100%">
      <Heading as="h2">Category</Heading>
      <HStack spacing={5}>
        <AddComponent />
      </HStack>
    </VStack>
  );
}

export default CategoryComponent;
