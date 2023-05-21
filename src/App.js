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
import SelectionPanel from './components/right-menu/SelectionPanel';

function App() {
  const [currCoordinates, setCurrCoordinates] = useState([]);
  const [pendingPlace, setPendingPlace] = useState(null);

  return (
    <ChakraProvider theme={theme}>
      <Box display="flex" pt="3%" pb="10%" px="5%" columnGap="5%">
        <Box width="60%">
          <Box display="flex" justifyContent="center" border="1px solid red">
            <GMaps
              currCoordinates={currCoordinates}
              pendingPlace={pendingPlace}
            />
          </Box>
        </Box>

        <Box width="33%">
          <Box display="flex" border="1px solid green">
            <SelectionPanel
              currCoordinates={currCoordinates}
              setCurrCoordinates={setCurrCoordinates}
              pendingPlace={pendingPlace}
              setPendingPlace={setPendingPlace}
            />
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
