import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
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
} from "@chakra-ui/react";
import { Formik } from "formik";
import signIn from "../services/firebase/Login";
import authCredentialsType from "../types/authCredentialsType";
import getUser from "../services/firebase/getUser";
import userStore from "../store/UserStore";
import { getAuth } from "firebase/auth";

function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button p="4" m="2" colorScheme="green" onClick={onOpen}>
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Center>
            {" "}
            <ModalHeader>Login</ModalHeader>
          </Center>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                const user = await signIn(values as authCredentialsType);
                const userData = await getUser(user.uid)
                if (userData){
                  userStore.setUserData(userData)
                  onClose();
                }else{
                  getAuth().signOut();
                }

              

                
              }}
            >
              
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Input
                    m={2}
                    type="email"
                    name="email"
                    placeholder="Email..."
                    onChange={handleChange}
                    value={values.email}
                  />
                  <Input
                    m={2}
                    type="password"
                    placeholder="Password..."
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
export default observer(Login);
