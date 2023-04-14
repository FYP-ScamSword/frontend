import { redirect } from "@remix-run/server-runtime";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID!,
  ClientId: process.env.COGNITO_CLIENT_ID!,
};

const userPool = new CognitoUserPool(poolData);

export const getCurrentUser = () => {
  return userPool.getCurrentUser();
};

export const login = (username: string, password: string) => {
  const authenticationData = {
    Username: username,
    Password: password,
  };
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  });
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  user.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      throw redirect("/chats");
    },
    onFailure: (err) => {
      return {
        errors: {
          general: err,
        },
      };
    },
  });
};

export const logout = () => {
  const user = getCurrentUser();
  if (user) {
    user.signOut();
  }
  throw redirect("/");
};
