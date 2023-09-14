import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Text,
  Image,
  Container,
  Center,
  Flex,
} from "@chakra-ui/react";
import adType from "../types/adType";
import getUser from "../services/firebase/getUser";
import userDataType from "../types/userDataType";
import { useState, useEffect } from "react";
import UserComponent from "./UserComponent";
import languageStore from "../store/LanguageStore";
import { observer } from "mobx-react";

function AdComponent({ ad }: { ad: adType }) {
  const [userData, setUserData] = useState<userDataType | null>(null);
  useEffect(() => {
    (async () => {
      setUserData(await getUser(ad.userId));
    })();
  }, []);
  return (
    <Card w={300}>
      <CardBody>
        <Center>
          <Image
            src={ad.image}
            alt={ad.title.en}
            borderRadius="md"
            w="330px"
            h="220px"
          />
        </Center>

        <Stack mt="6" spacing="3">
          <Flex flexDirection="column" alignContent="center" m={2}>
            <Heading size="md" as="h3" marginBottom={1}>
              {ad.title[languageStore.current]}
            </Heading>
            <Text isTruncated my={2}>{ad.description[languageStore.current]}</Text>
            <Text color="blue.600" fontSize="2xl" my={2}>
              {ad.price}$
            </Text>
            <UserComponent image={userData?.image} name={userData?.name}/>
          </Flex>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button variant="solid" colorScheme="green">
          Buy now
        </Button>
      </CardFooter>
    </Card>
  );
}
export default observer(AdComponent);
