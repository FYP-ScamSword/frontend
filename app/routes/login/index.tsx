import { Button, Center, Container, Flex, Heading, Spacer, Image, Text, Stack, Highlight, useDisclosure, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input } from "@chakra-ui/react";
import { Form, useLocation } from "@remix-run/react";
import matchingChats from "../../assets/matching-chat.png";
import { type ActionFunction, redirect, LoaderArgs } from "@remix-run/server-runtime";
import { createUserSession, getUserId } from "../../server/session.server";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { SgidClient } from "@opengovsg/sgid-client";

export const action: ActionFunction = async ({ request }) => {
  return redirect(`${process.env.MOCKPASS_ENDPOINT}/sgid/v1/oauth/authorize?redirect_uri=${process.env.FRONTEND_ENDPOINT}/login&state=abcd&nonce=abcd`)
  //return redirect(`${process.env.MOCKPASS_ENDPOINT}/sgid/v1/oauth/authorize?redirect_uri=${process.env.MOCKPASS_ENDPOINT}/sgid/v1/oauth/token&state=abcd&nonce=abcd`);
}

export const loader = async ({ request }:LoaderArgs) => {
  // alr logged in
  const userId = await getUserId(request);
  if (userId) return redirect("/chats");

  // redirected from mockpass, should have code query param
  const url = new URL(request.url)
  url.searchParams.has('_data');

  let id = request.url.split('?code=').length == 2 ? request.url.split('?code=').pop()?.replace("&state=abcd", "") : null;

  console.log(decodeURIComponent(id!));

  if (id) {
    const accessToken = await fetch(`${process.env.MOCKPASS_ENDPOINT}/sgid/v1/oauth/token`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'client_id': '12345',
        'code': decodeURIComponent(id),
        'redirect_uri': `${process.env.FRONTEND_ENDPOINT}/login`
      })
    })
    .then((response) => {
      console.log(response)
      return response.json();
    })
    .then((data) => {
      console.log(data.access_token);
      return data.access_token;
    })
    .catch((err) => console.error(err));

    console.log(process.env.SGID_CLIENT_PRIVATE_KEY);

    const client = new SgidClient({
      clientId: '12345',
      clientSecret: 'cLiEnTsEcReT',
      privateKey: process.env.SGID_CLIENT_PRIVATE_KEY!,
      redirectUri: `${process.env.FRONTEND_ENDPOINT}/login`,
    })

    console.log(accessToken)
    const { sub, data } = await client.userinfo(accessToken)

    console.log("SUB: " + sub);
    console.log("DATA: " + data);
  }

  // if (id) { // if it was redirected from mockpass
  //   return await createUserSession({
  //     request,
  //     userId: id,
  //   });
  // }

  return null;
}

export default function Login() {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Form method="post" action={`${location.pathname}${location.search}`}>
      <Container maxW="container.lg" mt={16}>
        <Flex>
          <Spacer />
          <Stack alignItems="flex-end">
            <Heading>Chat Now</Heading>
            <Text fontSize="lg">
              <Highlight 
                query='do not'
                styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100', fontWeight: "bold" }}
              >
                Before you proceed, remember, do not share any personal information!
              </Highlight>
            </Text>
          </Stack>
        </Flex>
        <Center>
          <Button 
            bgColor="#458DC8" 
            position="fixed" 
            bottom="100px" 
            fontSize="xl" 
            color="white" 
            pl={10} 
            pr={10} 
            pt={7} 
            pb={7} 
            borderRadius={15} 
            _hover={{bgColor:"#397CB2"}}
            type="submit"
            //onClick={onOpen}
          >
            Login with Singpass  
            <ExternalLinkIcon ml={3} />
          </Button>
          {/* <Button 
            bgColor="#458DC8" 
            position="fixed" 
            bottom="170px" 
            fontSize="xl" 
            color="white" 
            pl={10} 
            pr={10} 
            pt={7} 
            pb={7} 
            borderRadius={15} 
            _hover={{bgColor:"#397CB2"}}
            type="submit"
          >
            Register with Singpass  
            <ExternalLinkIcon ml={3} />
          </Button>
        </Center>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login with SingPass</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder="NRIC" mb={3}></Input>
              <Input placeholder="Password"></Input>
            </ModalBody>
            <ModalFooter>
              <Button>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
        </Center>
      </Container>
    </Form>
  );
}