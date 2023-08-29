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
} from "@chakra-ui/react";
import adType from "../types/adType";
import getUser from "../services/firebase/getUser";
import userDataType from "../types/userDataType";
import { useState, useEffect } from "react";
import UserComponent from "./UserComponent";

function AdComponent({ad} : {ad: adType}) {
  const [userData, setUserData] = useState<userDataType| null>(null)
  useEffect(()=>{
      (async()=>{setUserData(await getUser(ad.userId))})()
  }, [])  
  return (
    <Card w="sm">
      <CardBody>
        <Image src={ad.image} alt={ad.title} borderRadius="md" />
        <Stack mt="6" spacing="3">
          <Heading size="md" as="h3">
            {ad.title}
          </Heading>
          <Text isTruncated>{ad.description}</Text>
          <Text color="blue.600" fontSize="xl">
            {ad.price}$
          </Text>
          <UserComponent image={userData?.image} name={userData?.name}/>
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
