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
import { Field, Formik } from "formik";
import authCredentialsType from "../types/authCredentialsType";
import signUp from "../services/firebase/Registration";
import * as Yup from "yup";
import setUser from "../services/firebase/setUser";
import userStore from "../store/UserStore";

function Registration() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button p="4" m="2" colorScheme="green" onClick={onOpen}>
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
              initialValues={{ name: "", email: "", password: "", image: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email is required"),
                name: Yup.string().required("Name is required"),
                image: Yup.string().required("Image is required"),
                password: Yup.string()
                  .min(6, "Password must be at least 6 characters")
                  .required("Password is required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const user = await signUp(values as authCredentialsType);

                console.log(user.uid)
                  const userData = {
                    id: user.uid,
                    name: values.name,
                    email: values.email,
                    image: values.image,
                  };

                  await setUser(userData);

                  userStore.setUserData(userData);
                  onClose();
                } catch (error) {
                  console.error(error);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                isSubmitting,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Input
                    m={2}
                    type="email"
                    name="email"
                    placeholder="Email..."
                    onChange={handleChange}
                    value={values.email}
                  />
                  {errors.email && touched.email && <div>{errors.email}</div>}
                  <Input
                    m={2}
                    name="name"
                    type="text"
                    placeholder="Name..."
                    onChange={handleChange}
                    value={values.name}
                  />
                  {errors.name && touched.name && <div>{errors.name}</div>}

                  <Input
                    m={2}
                    name="image"
                    type="text"
                    placeholder="Image..."
                    onChange={handleChange}
                    value={values.image}
                  />
                  {errors.image && touched.image && <div>{errors.image}</div>}

                  <Input
                    m={2}
                    type="password"
                    placeholder="Password..."
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <div>{errors.password}</div>
                  )}

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
