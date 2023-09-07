import { ChakraProvider, Flex, Heading, Image, Link } from "@chakra-ui/react";
import { observer } from "mobx-react";
import userStore from "../store/UserStore";

function Profile() {
  return (
    <ChakraProvider>
      <Flex flexDirection="row" align="center">
        {" "}
        <Image
          borderRadius="full"
          boxSize="300px"
          src={userStore.userData?.image}
          m={4}
        />
        <Heading>{userStore.userData?.name}</Heading>
      </Flex>
      <Link href="/edit-profile">Edit Profile</Link>
    </ChakraProvider>
  );
}

export default observer(Profile);
