import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  Show,
  Hide,
  Heading,
} from '@chakra-ui/react';
import GMaps from './components/maps/GMaps';
import SelectionPanel from './components/right-menu/SelectionPanel';
import ResultPanel from './components/results/ResultPanel';

function App() {
  const [selPlaces, setSelPlaces] = useState([]);
  const [results, setResults] = useState(null);

  return (
    <ChakraProvider theme={theme}>
      <Box px="5%">
        <Box display="flex" pt="3%" pb="3%" columnGap="5%">
          <Box width="60%">
            <Box display="flex" justifyContent="center" border="1px solid red">
              <GMaps selPlaces={selPlaces} />
            </Box>
          </Box>

          <Box width="33%">
            <Box
              display="flex"
              border="1px solid gray"
              p="4"
              borderRadius="xl"
              boxShadow="xl"
            >
              <SelectionPanel
                selPlaces={selPlaces}
                setSelPlaces={setSelPlaces}
                setResults={setResults}
              />
            </Box>
          </Box>
        </Box>

        <Box>{results != null && <ResultPanel results={results} />}</Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
