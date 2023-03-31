import { Button, Center, Container, Flex, Heading, Spacer, Image, Text, Stack, Highlight } from "@chakra-ui/react";
import { Form, useLocation } from "@remix-run/react";
import matchingChats from "../../assets/matching-chat.png";
import { type ActionFunction, redirect, LoaderArgs } from "@remix-run/server-runtime";
import { createUserSession, getUserId } from "../../server/session.server";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const action: ActionFunction = async ({ request }) => {
  return redirect(`${process.env.MOCKPASS_ENDPOINT}/singpass/authorize?redirect_uri=${process.env.FRONTEND_ENDPOINT}/login`)
}

export const loader = async ({ request }:LoaderArgs) => {
  // alr logged in
  const userId = await getUserId(request);
  if (userId) return redirect("/chats");

  // redirected from mockpass, should have code query param
  const url = new URL(request.url)
  url.searchParams.has('_data');

  let id = request.url.split('?code=').length == 2 ? request.url.split('?code=').pop()?.replace("&state=undefined", "") : null;

  if (id) { // if it was redirected from mockpass
    return await createUserSession({
      request,
      userId: id,
    });
  }

  return null;
}

export default function Login() {
  const location = useLocation();

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
          <Image src={matchingChats} mt={20} />
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
            >
              Login with Singpass  
              <ExternalLinkIcon ml={3} />
            </Button>
        </Center>
      </Container>
    </Form>
  );
}