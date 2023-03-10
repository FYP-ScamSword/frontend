import { Spacer, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Highlight from "~/components/inspect/Highlight";

type Props = { dom?: any; domErr: any };
export default function DomAnalysis({ dom, domErr }: Props) {
  const [selectedBtn, setSelectedBtn] = useState("all");
  return (
    <Box borderWidth="1px" borderRadius="lg" bg="black" color="white">
      {domErr ? (
        <Text color="red">
          Error retrieving dom:
          {JSON.stringify(domErr)}
        </Text>
      ) : (
        <Box p="6" overflow="scroll" maxH="40vh">
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
              {dom!.suspicious_inputs.length} Suspicious Input Fields
            </Button>
            <Button
              size="xs"
              colorScheme="purple"
              onClick={(e) => setSelectedBtn("xss")}
            >
              {dom!.xss_attempts.length} Potential XSS attempts
            </Button>
          </Flex>
          <pre>
            <small>
              <code>
                {/* <Highlight tags={dom!.suspicious_inputs}>{dom!.html}</Highlight> */}
                {selectedBtn === "input"
                  ? dom!.suspicious_inputs.join("\n")
                  : selectedBtn === "xss"
                  ? dom!.xss_attempts.join("\n")
                  : dom!.html}
              </code>
            </small>
          </pre>
        </Box>
      )}
    </Box>
  );
}
