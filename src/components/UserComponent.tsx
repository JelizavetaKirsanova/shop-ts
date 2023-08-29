import userDataType from "../types/userDataType";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

function UserComponent({image, name}: {image: string | undefined, name: string | undefined}) {
  return (
    <>
      {image && name ? (
        <Flex>
          <Image borderRadius="full" boxSize="60px" src={image} />

          <Text m="5px" fontSize="3xl">
            {name}
          </Text>
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
}

export default UserComponent;
