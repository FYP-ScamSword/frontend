import { AtSignIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export default function AddChatModal({ isOpen, onClose }: Props) {
  const [value, setValue] = useState("random");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup onChange={setValue} value={value} mb="8">
            <Stack direction="row" spacing="8">
              <Radio value="random">Random</Radio>
              <Radio value="custom">Custom</Radio>
            </Stack>
          </RadioGroup>
          {value === "custom" && (
            <div>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<PhoneIcon color="gray.300" />}
                />
                <Input type="tel" placeholder="Phone number" />
              </InputGroup>
              <Flex my="4" alignItems="center">
                <Divider />
                <Text mx="2" fontSize="xs">
                  or
                </Text>
                <Divider />
              </Flex>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AtSignIcon color="gray.300" />}
                />
                <Input type="text" placeholder="Telegram Handle" />
              </InputGroup>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Form method="post" action="/chats" onSubmit={onClose}>
            <Button colorScheme="blue" mr={3} type="submit">
              Add
            </Button>
          </Form>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
