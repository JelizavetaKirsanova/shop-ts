import userDataType from "../types/userDataType";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

function UserComponent({image, name}: {image: string | undefined, name: string | undefined}) {
  return (
    <>
      {image && name ? (
        <>
          <Image borderRadius="full" boxSize="60px" src={image} />

          <Text m="5px" fontSize="3xl">
            {name}
          </Text>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default UserComponent;
