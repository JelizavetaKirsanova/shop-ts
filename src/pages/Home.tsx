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
  Spinner,
  Grid,
  GridItem,
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Icon,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import searchStore from "../store/SearchStore";
import AdComponent from "../components/Ad";
import AllAds from "../components/AllAds";
import { AiOutlineHome } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import {
  AddIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import googleTranslate from "../services/firebase/translate";
import translate from "../services/firebase/translate";
import getAllAds from "../services/firebase/getAllAds";
import SelectComponent from "../components/SelectComponent";
import languageStore from "../store/LanguageStore";

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
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  `}
        gridTemplateRows={"90px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="100%"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem area={"header"}>
          {userStore.user ? (
            <Flex
              w="100%"
              justifyContent="space-between"
              alignItems="center"
              mx={2}
            >
              <Center m={2}>
                <Box w="82px" m="2">
                  <SelectComponent />
                </Box>
              </Center>

              <Search />

              <Flex justifyContent="flex-end" m={2} alignItems="center">
                <Spacer />
                <Avatar
                  src={userStore.userData?.image}
                  name={userStore.userData?.name}
                  m={2}
                />
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                    marginRight={2}
                  />
                  <MenuList>
                    <MenuItem>
                      <Link href="/profile">Your profile</Link>
                    </MenuItem>
                    <MenuItem
                      as="button"
                      onClick={() => {
                        getAuth().signOut();
                      }}
                    >
                      LogOut <Icon m={1} as={IoLogOutOutline} boxSize={5} />
                    </MenuItem>
                  </MenuList>
                </Menu>

                <Flex flexDirection="column"></Flex>
              </Flex>
            </Flex>
          ) : (
            <Flex justifyContent="center" alignItems="center" h="90px">
              {" "}
              <Login />
              <Registration />
              <Flex justifyContent="flex-end">
                <Box w="82px" m="2">
                  <Select>
                    <option value="RUS">RUS</option>
                    <option value="ENG">ENG</option>
                    <option value="EST">EST</option>
                  </Select>
                </Box>
              </Flex>
            </Flex>
          )}
        </GridItem>

        <GridItem pl="2" area={"nav"}>
          <Divider />
          <Flex flexDirection="column" justifyContent="flex-start">
            <Button
              colorScheme="white"
              color="black"
              onClick={() => {
                window.location.reload();
              }}
            >
              {<AiOutlineHome />}
            </Button>
            <UploadAd />
            <UploadCategory />
          </Flex>
        </GridItem>
        <GridItem pl="2" area={"main"}>
          <Divider />

          <Box borderLeft="1px ridge ">
            {searchStore.ads || searchStore.loading ? (
              <>
                {searchStore.loading ? (
                  <Spinner />
                ) : (
                  <>
                    {searchStore.ads!.length === 0 ? (
                      <p>no such ads were found</p>
                    ) : (
                      <>
                        <VStack w="100%" m={6}>
                          <SimpleGrid spacing={10} columns={3}>
                            {searchStore.ads!.map((el) => (
                              <AdComponent key={el.id} ad={el} />
                            ))}
                          </SimpleGrid>
                        </VStack>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <Tabs isFitted variant="unstyled" colorScheme="green">
                  <TabList>
                    {languageStore.current == "en" ? (
                      <Tab>All</Tab>
                    ) : languageStore.current == "ru" ? (
                      <Tab>Все</Tab>
                    ) : (
                      <Tab>Kõik</Tab>
                    )}

                    {categories ? (
                      <>
                        {categories.map((cat) => (
                          <Tab>{cat.title[languageStore.current]}</Tab>
                        ))}
                      </>
                    ) : (
                      <Spinner />
                    )}
                  </TabList>

                  <TabIndicator
                    mt="-1.5px"
                    height="2px"
                    bg="green.300"
                    borderRadius="1px"
                  />

                  <TabPanels>
                    <TabPanel>
                      <AllAds />
                    </TabPanel>

                    {categories ? (
                      categories.map((cat) => (
                        <TabPanel>
                          <CategoryComponent key={cat.id} category={cat} />
                        </TabPanel>
                      ))
                    ) : (
                      <Spinner />
                    )}
                  </TabPanels>
                </Tabs>
              </>
            )}
          </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default observer(Home);
