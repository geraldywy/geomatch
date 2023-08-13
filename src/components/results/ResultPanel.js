import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import Result from './Result';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import FadeIn from 'react-fade-in/lib/FadeIn';

export default function ResultPanel({ results }) {
  if (!results) {
    return null;
  }
  return (
    <Box p="4">
      <Heading>Results</Heading>
      <Box
        mt="2"
        display="flex"
        justifyContent="left"
        alignItems="center"
        columnGap="1"
      >
        <InfoOutlineIcon />
        <Text size="sm" as="i">
          We found <Text as="u">{results.length}</Text> result matching your
          given query.
        </Text>
      </Box>
      <Box>
        <FadeIn delay={100}>
          {results.map((res, idx) => (
            <Result res={res} key={idx + res.cost} num={idx + 1} />
          ))}
        </FadeIn>
      </Box>
    </Box>
  );
}
