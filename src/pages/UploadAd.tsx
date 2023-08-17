import { observer } from "mobx-react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Heading,
  Input,
  Center,
  Select,
} from "@chakra-ui/react";
import { Formik } from "formik";
import signIn from "../services/firebase/Login";
import adType from "../types/adType";
import getCategories from "../services/firebase/getCategories";
import React, { useEffect } from "react";
import categoryType from "../types/categoryType";
import newAd from "../services/firebase/newAd";

function UploadAd() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = React.useState<categoryType[] | null>(
    null
  );
  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
  }, []);
  return (
    <>
      <Button p="4" m="2" colorScheme="green" onClick={onOpen}>
        Upload ad
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Center>
            {" "}
            <ModalHeader>Upload</ModalHeader>
          </Center>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                title: "",
                description: "",
                image: "",
                price: "",
                category: "",
              }}
              onSubmit={async (values) => {
                // const ad = await newAd(values as adType);
                onClose();
                 console.log(values);
              }}
            >
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Input
                    m={2}
                    name="title"
                    placeholder="Title..."
                    onChange={handleChange}
                    value={values.title}
                  />
                  <Input
                    m={2}
                    name="description"
                    placeholder="Description..."
                    onChange={handleChange}
                    value={values.description}
                  />
                  <Input
                    m={2}
                    name="image"
                    placeholder="Image..."
                    onChange={handleChange}
                    value={values.image}
                  />
                  <Input
                    m={2}
                    name="price"
                    placeholder="Price..."
                    onChange={handleChange}
                    value={values.price}
                  />
                  <Select m={2} placeholder= "Select category" onChange={handleChange}>
                    {categories ? categories.map((cat) => <option value={cat.id}>{cat.title}</option>) : <></>}
                  </Select>

                  <Center>
                    <Button m={2} type="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </Center>
                </form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default observer(UploadAd);
