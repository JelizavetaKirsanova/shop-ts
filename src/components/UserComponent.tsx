import userDataType from "../types/userDataType";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

function UserComponent({
  image,
  name,
  boxSize = "40px",
  fontSize = "xl",
}: {
  image: string | undefined;
  name: string | undefined;
  boxSize?: string;
  fontSize?: string;
}) {
  return (
    <>
      {image && name ? (
        <Flex>
          <Image borderRadius="full" boxSize={boxSize} src={image} />

          <Text m="5px" fontSize={fontSize}>
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
