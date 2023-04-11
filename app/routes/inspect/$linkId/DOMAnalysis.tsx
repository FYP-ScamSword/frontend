import { Spacer, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Highlight from "react-highlight";
import type Dom from "~/server/models/Dom";

type Props = { dom?: Dom; domErr: any };
export default function DomAnalysis({ dom, domErr }: Props) {
  const [selectedBtn, setSelectedBtn] = useState("all");
  return (
    <Box borderWidth="1px" borderRadius="lg" bg="#19171C" color="white">
      {!dom ? (
        <Text color="red" p="6" h="40vh">
          Error retrieving dom:
          {JSON.stringify(domErr)}
        </Text>
      ) : (
        <Box p="6" overflow="scroll" h="50vh">
          <Flex justifyContent="end">
            <Button
              size="xs"
              colorScheme="blue"
              onClick={(e) => setSelectedBtn("all")}
            >
              Show DOM
            </Button>
            <Spacer />
            <Button
              size="xs"
              colorScheme="red"
              mr="4"
              onClick={(e) => setSelectedBtn("input")}
            >
              {dom!.suspicious_inputs ? dom!.suspicious_inputs.length : 0} Input
              Fields
            </Button>
            <Button
              size="xs"
              colorScheme="purple"
              onClick={(e) => setSelectedBtn("xss")}
            >
              {dom!.xss_attempts ? dom!.xss_attempts.length : 0} Potential XSS
              attempts
            </Button>
          </Flex>
          <Highlight className="html">
            {selectedBtn === "input"
              ? dom!.suspicious_inputs.join("\n")
              : selectedBtn === "xss"
              ? dom!.xss_attempts.join("\n")
              : dom!.html}
          </Highlight>
        </Box>
      )}
    </Box>
  );
}
