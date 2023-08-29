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
  Container,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import Login from "./Login";
import Registration from "./Registration";
import { observer } from "mobx-react";
import userStore from "../store/UserStore";
import { getAuth } from "firebase/auth";
import CategoryComponent from "../components/CategoryComponent";
import getCategories from "../services/firebase/getCategories";
import getAddsByCategory from "../services/firebase/getAdsByCategory";
import categoryType from "../types/categoryType";
import { useEffect } from "react";
import UploadAd from "./UploadAd";
import UserComponent from "../components/UserComponent";
import getAdByTitle from "../services/firebase/getAdByTitle";
import Search from "../components/Search";
import UploadCategory from "./UploadCategory";

function Home() {
  const [categories, setCategories] = React.useState<categoryType[] | null>(
    null
  );
  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
  }, []);

  console.log(userStore.userData);
  getAdByTitle("h");
  return (
    <ChakraProvider>
      <Center>
        {" "}
        <VStack maxW="1500px" w="100%">
          {userStore.user ? (
            <Flex
              w="100%"
              justifyContent="space-between"
              alignItems="flex-start"
              mx={2}
            >
              <Center m={2}>
                <UserComponent
                  image={userStore.userData?.image}
                  name={userStore.userData?.name}
                />
              </Center>
              <Flex justifyContent="flex-end" m={2}>
                <Spacer />
                <UploadAd />
                <UploadCategory />
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
                <Box w="82px" m="2">
                  <Select>
                    <option value="RUS">RUS</option>
                    <option value="ENG">ENG</option>
                    <option value="EST">EST</option>
                  </Select>
                </Box>
              </Flex>
            </Flex>
          ) : (
            <>
              <Flex justifyContent="flex-end">
                <Login />
                <Registration />
                <Box w="82px" m="2">
                  <Select>
                    <option value="RUS">RUS</option>
                    <option value="ENG">ENG</option>
                    <option value="EST">EST</option>
                  </Select>
                </Box>
              </Flex>
            </>
          )}

          <Divider />
          <VStack w="100%">
            <Search />
            <Flex flexDirection="row">
              {categories ? (
                categories.map((cat) => (
                  <CategoryComponent key={cat.id} category={cat} />
                ))
              ) : (
                <></>
              )}
            </Flex>
          </VStack>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default observer(Home);
