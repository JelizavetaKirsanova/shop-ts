import "../App.css";
import {
  ChakraProvider,
  Button,
  Select,
  Flex,
  Spacer,
  Box,
  Divider,
  Input,
  Center,
  Link,
} from "@chakra-ui/react";
import * as React from "react";
import Login from "./Login";
import Registration from "./Registration";
import { observer } from "mobx-react";
import userStore from "../store/UserStore";
import { getAuth } from "firebase/auth";

function Home() {
  console.log(userStore.user)
  return (
    <ChakraProvider>
      <Flex>
        <Spacer />
        {userStore.user ? (
          <Button onClick={()=>{getAuth().signOut()}}  p="4" m="2" colorScheme='red' color="white">Logout</Button>
        ) : (
          <>
            <Login />
            <Registration />
          </>
        )}

        <Box w="82px" m="2">
          <Select>
            <option value="RUS">RUS</option>
            <option value="ENG">ENG</option>
            <option value="EST">EST</option>
          </Select>
        </Box>
      </Flex>
      <Divider />
      <Center h="100px" color="black">
        <Input placeholder="Search..." width="350px" />
        <Button p="4" m="2" colorScheme="green">
          Find
        </Button>
      </Center>
    </ChakraProvider>
  );
}

export default observer(Home);
