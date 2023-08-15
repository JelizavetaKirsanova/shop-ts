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
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import Login from "./Login";
import Registration from "./Registration";
import { observer } from "mobx-react";
import userStore from "../store/UserStore";
import { getAuth } from "firebase/auth";
import CategoryComponent from "../components/CategoryComponent";
import getCategories from "../services/firebase/getCategories";
import getAddsByCategory from "../services/firebase/getAddsByCategory";

function Home() {
  return (
    <ChakraProvider>
      <Center>
        <VStack maxW="1000px" w="100%">
          <Flex w="100%" justifyContent="flex-end">
            <Spacer />
            {userStore.user ? (
              <Button
                onClick={() => {
                  getAuth().signOut();
                }}
                p="4"
                m="2"
                colorScheme="red"
                color="white"
              >
                Logout
              </Button>
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
          <VStack w="100%">
            <Center h="100px" color="black">
              <Input placeholder="Search..." width="350px" />
              <Button p="4" m="2" colorScheme="green">
                Find
              </Button>
            </Center>
            <CategoryComponent />
          </VStack>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default observer(Home);
