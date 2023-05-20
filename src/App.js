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
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import GMaps from './components/maps/GMaps';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box display="flex" pt="3%" pb="10%" px="5%" columnGap="5%">
        <Box width="60%">
          <Box display="flex" justifyContent="center" border="1px solid red">
            <GMaps />
          </Box>
        </Box>

        <Box width="33%">
          <Box display="flex" justifyContent="center" border="1px solid green">
            <Box>
              <Text>Right Panel</Text>
              <Text>Right Panel</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
