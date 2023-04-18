import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Image, Tooltip } from "@chakra-ui/react";
import type Dom from "~/server/models/Dom";

type Props = { dom?: Dom; domErr: any };

export default function SimilarFavicons({ dom, domErr }: Props) {
  if (!dom || !dom.similar_favicon)
    return (
      <Text color="red" p="6" h="40vh">
        Error retrieving dom:
        {JSON.stringify(domErr)}
      </Text>
    );

  return (
    <Box p="6" overflow="scroll" maxH="50vh">
      <Text mb="6">Page's Favicon:</Text>
      <Image
        mb="8"
        boxSize="32px"
        src={dom.similar_favicon.favicon_url}
        alt={dom.similar_favicon.favicon_url}
      />
      <Flex mb="6" alignItems="center">
        <Text>Similar Favicons </Text>
        <Tooltip
          size="sm"
          label="Distance in k-nearest neighbor is a measure of how far apart the nearest neighbors are from the query point, used to determine which data points are most similar to the given point. The smaller the value, the more similar it is to the website's favicon."
          fontSize="md"
        >
          <InfoOutlineIcon ml="2" color="#458DC8" />
        </Tooltip>
      </Flex>
      <Flex justifyContent="space-between">
        {dom.similar_favicon.similar_favicons.map((favicon) => (
          <Box
            key={favicon.name}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Image
              boxSize="32px"
              mb="4"
              src={favicon.url!}
              alt={favicon.name}
            />
            <Text>{favicon.name}</Text>
            <Text>Distance: {favicon.distance.toFixed(2)}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
