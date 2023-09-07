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
import { AddIcon } from "@chakra-ui/icons";
import googleTranslate from "../services/firebase/translate";

function UploadCategory() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button p="4" m="2" colorScheme="green" onClick={onOpen}>
      <AddIcon m={1}/> category
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
                title: { en: "", ee: "", ru: ""},
                description: { en: "", ee: "", ru: ""}
              }}
              onSubmit={async (values) => {
                values.description.ee = await googleTranslate(values.description.en, "et")
                values.description.ru = await googleTranslate(values.description.en, "ru")
                values.title.ee = await googleTranslate(values.title.en, "et")
                values.title.ru = await googleTranslate(values.title.en, "ru")
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
                    name="title.en"
                    placeholder="Title..."
                    onChange={handleChange}
                    value={values.title.en}
                  />
                  <Input
                    m={2}
                    name="description.en"
                    placeholder="Description..."
                    onChange={handleChange}
                    value={values.description.en}
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
