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

function AdComponent({ad} : {ad: adType}) {
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
