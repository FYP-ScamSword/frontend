import { Alert, AlertIcon } from "@chakra-ui/react";

export default function DeadSiteBanner() {
  return (
    <Alert status="warning">
      <AlertIcon />
      Note: Website is not alive, displaying cached data if available.
    </Alert>
  );
}
