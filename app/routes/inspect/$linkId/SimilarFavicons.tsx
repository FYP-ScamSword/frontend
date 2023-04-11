import { Box, Flex, Text, Image } from "@chakra-ui/react";
import type Dom from "~/server/models/Dom";

type Props = { dom?: Dom; domErr: any };

export default function SimilarFavicons({ dom, domErr }: Props) {
  if (!dom)
    return (
      <Text color="red" p="6" h="40vh">
        Error retrieving dom:
        {JSON.stringify(domErr)}
      </Text>
    );
  return (
    <Box p="6" overflow="scroll" maxH="50vh">
      <Text mb="4">Page's Favicon: </Text>
      <Image
        mb="8"
        src={dom.similar_favicon.favicon_url}
        alt={dom.similar_favicon.favicon_url}
      />
      <Text mb="4">Similar Favicons</Text>
      <Flex justifyContent="space-between">
        {dom.similar_favicon.similar_favicons.map((favicon) => (
          <Box key={favicon.name}>
            <Image src={favicon.url} alt={favicon.name} />
            <Text>{favicon.name}</Text>
            <Text>Distance: {favicon.distance.toFixed(2)}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
