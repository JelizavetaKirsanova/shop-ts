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
  Input,
  Center,
} from "@chakra-ui/react";
import { Formik } from "formik";
import authCredentialsType from "../types/authCredentialsType";
import signUp from "../services/firebase/Registration";

function Registration() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button p="4" m="2" bg="green.400" onClick={onOpen}>
        Registration
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Center>
            {" "}
            <ModalHeader>Registration</ModalHeader>
          </Center>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                const user = await signUp(values as authCredentialsType);
                onClose()
                console.log(user);
              }}
            >
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Input
                    m={2}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                  <Input
                    m={2}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
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
export default observer(Registration);
