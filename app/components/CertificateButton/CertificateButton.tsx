import { isTheTourCompleted } from "@/lib/client-functions";
import React, { useEffect, useState } from "react";
import styles from "./CertificateButton.module.css";
import { LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { googleSheetAPIRoute } from "@/lib/contentVariables";
const submitCertificateReq = async (name: string, email: string) => {
  await fetch(googleSheetAPIRoute, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      certificateReq: true,
    }),
  });
};

export default function CertificateButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isTheTourCompletedState, setIsTheTourCompletedState] =
    useState(isTheTourCompleted());
  useEffect(() => {
    setIsTheTourCompletedState(!isTheTourCompleted());
  }, [isTheTourCompleted()]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  return (
    <>
      <Tooltip
        label={
          isTheTourCompletedState
            ? ""
            : "Complete the tour to get your certificate"
        }
        aria-label="A tooltip"
      >
        <Button
          size={"sm"}
          variant={"default"}
          className={styles.certificateButton}
          onClick={isTheTourCompletedState ? onOpen : () => {}}
        >
          {isTheTourCompletedState ? "" : <LockIcon />} Get Your Certificate
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Get Your Certificate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>We will email you your certificate</Box>
            <Flex direction="column" gap={4}>
              <Input
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="default"
              mr={3}
              onClick={() => {
                submitCertificateReq(name, email);
                onClose();
                toast({
                  title: "Certificate Requested",
                  description: "We will email you your certificate",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
