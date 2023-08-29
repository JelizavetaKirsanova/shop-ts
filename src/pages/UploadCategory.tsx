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

import React, { useEffect } from "react";
import categoryType from "../types/categoryType";
import newCategory from "../services/firebase/newCategory";

function UploadCategory() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button p="4" m="2" colorScheme="green" onClick={onOpen}>
        Upload category
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
                description: ""
              }}
              onSubmit={async (values) => {
                const category = await newCategory(values as categoryType);

                onClose();
                window.location.reload()
                 console.log(category);
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
export default observer(UploadCategory);
