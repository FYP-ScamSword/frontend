import {
  Button,
  Container,
  Heading,
  Image,
  Text,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Form, useActionData } from "@remix-run/react";
import matchingChats from "../../assets/matching-chat.png";
import {
  type ActionFunction,
  redirect,
  type LoaderArgs,
} from "@remix-run/server-runtime";
import { getCurrentUser, login } from "~/server/auth.server";

//TODO: inspect why need to click login 2 times before it can redirect
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string") {
    return {
      errors: {
        general: "please enter  username",
      },
    };
  }
  if (typeof password !== "string") {
    return {
      errors: {
        general: "please enter a valid password",
      },
    };
  }

  await login(username, password);
  return null;
};

export const loader = async () => {
  // alr logged in
  const user = getCurrentUser();
  if (user) return redirect("/chats");

  // // redirected from mockpass, should have code query param
  // const url = new URL(request.url);
  // url.searchParams.has("_data");

  // let id =
  //   request.url.split("?code=").length == 2
  //     ? request.url.split("?code=").pop()?.replace("&state=undefined", "")
  //     : null;

  // if (id) {
  //   // if it was redirected from mockpass
  //   return await createUserSession({
  //     request,
  //     userId: id,
  //   });
  // }

  return null;
};

export default function Login() {
  const data = useActionData();
  // using errors as convention to return all the form errors
  const errors = data?.errors;
  return (
    <Container
      maxW="container.lg"
      mt="28"
      display="flex"
      gap="16"
      alignItems="center"
    >
      <Stack flex="1">
        <Heading>Chat Now</Heading>
        <Text mb="4">
          Before you proceed, remember,
          <Text as="b" color="red" mx="2">
            do not
          </Text>
          share any personal information!
        </Text>
        <Form method="post" action="/login">
          <FormControl mb="4">
            <FormLabel>Username</FormLabel>
            <Input type="text" name="username" />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" />
          </FormControl>
          {errors && (
            <Text color="red" mb="4">
              {errors.general}
            </Text>
          )}
          <Button type="submit" w="100%" colorScheme="blue">
            Login
          </Button>
        </Form>
      </Stack>
      <Box flex="1">
        <Image src={matchingChats} />
      </Box>
    </Container>
  );
}
