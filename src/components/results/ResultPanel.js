import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import Result from './Result';

export default function ResultPanel({ results }) {
  return (
    <Box p="4">
      <Heading>Results</Heading>
      <Text size="sm" as="i">
        We found {results.length} result matching your given query.
      </Text>
      <Box>
        {results.map((res, idx) => (
          <Result res={res} key={idx + res.cost} num={idx + 1} />
        ))}
      </Box>
    </Box>
  );
}
