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

function AdComponent({ ad }: { ad: adType }) {
  const [userData, setUserData] = useState<userDataType | null>(null);
  useEffect(() => {
    (async () => {
      setUserData(await getUser(ad.userId));
    })();
  }, []);
  return (
    <Card w="sm">
      <CardBody>
        <Center>
          <Image
            src={ad.image}
            alt={ad.title}
            borderRadius="md"
            w="340px"
            h="200px"
          />
        </Center>

        <Stack mt="6" spacing="3">
          <Flex flexDirection="column" alignContent="center" m={2}>
            <Heading size="md" as="h3" marginBottom={1}>
              {ad.title}
            </Heading>
            <Text isTruncated my={2}>{ad.description}</Text>
            <Text color="blue.600" fontSize="2xl" my={2}>
              {ad.price}$
            </Text>
            <UserComponent image={userData?.image} name={userData?.name}/>
          </Flex>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button variant="solid" colorScheme="blue">
          Buy now
        </Button>
      </CardFooter>
    </Card>
  );
}
export default AdComponent;
