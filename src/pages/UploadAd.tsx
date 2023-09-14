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
  Flex,
} from "@chakra-ui/react";
import { Formik } from "formik";
import signIn from "../services/firebase/Login";
import adType from "../types/adType";
import getCategories from "../services/firebase/getCategories";
import React, { useEffect } from "react";
import categoryType from "../types/categoryType";
import newAd from "../services/firebase/newAd";
import userStore from "../store/UserStore";
import { AddIcon } from "@chakra-ui/icons";
import googleTranslate from "../services/firebase/translate";
import UploadPhoto from "./UploadPhoto";

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
console.log(userStore.userData)
  return (
    <>
      <Button p="4" m="2" colorScheme="green" onClick={onOpen}>
        <AddIcon m={1} />
        ad
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
            <UploadPhoto/>
            <Formik
              initialValues={{
                title: { en: "", ee: "", ru: "" },
                description: { en: "", ee: "", ru: "" },
                image: "",
                price: "",
                category: "",
                userId: userStore.userData?.id,
              }}
              onSubmit={async (values) => {
                values.description.ee = await googleTranslate(values.description.en, "et")
                values.description.ru = await googleTranslate(values.description.en, "ru")
                values.title.ee = await googleTranslate(values.title.en, "et")
                values.title.ru = await googleTranslate(values.title.en, "ru")
                const ad = await newAd(values as adType);

                onClose();
                window.location.reload();
                console.log(ad);
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
                  <Select
                    m={2}
                    placeholder="Select category"
                    onChange={handleChange}
                    name="category"
                    value={values.category}
                  >
                    {categories ? (
                      categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.title.en}
                        </option>
                      ))
                    ) : (
                      <></>
                    )}
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
