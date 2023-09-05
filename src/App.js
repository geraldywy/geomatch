import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Button,
} from '@chakra-ui/react';
import GMaps from './components/maps/GMaps';
import ResultPanel from './components/results/ResultPanel';
import RightMenu from './components/right-menu/RightMenu';
import Chat from './components/chat-experience/Chat';

function App() {
  const [selPlaces, setSelPlaces] = useState([]);
  const [results, setResults] = useState(null);

  const [queryCenter, setQueryCenter] = useState({
    lat: 1.2929,
    lng: 103.8547,
  });
  const [mapRef, setMapRef] = useState(null);
  const [mapsRef, setMapsRef] = useState(null);
  const [circleRef, setCircleRef] = useState(null);

  const [circleRadius, setCircleRadius] = useState(0);
  const [isLoadingResult, setIsLoadingResult] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <ChakraProvider theme={theme}>
      <Box px="5%">
        <Box
          pt="8"
          pb="6"
          px="1"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="left"
          rowGap="1"
        >
          <Heading size="2xl">GeoMatch</Heading>
          <Text as="i" fontSize="md">
            Spatial Search By Example
          </Text>
        </Box>

        <Tabs
          isFitted
          variant="enclosed"
          index={tabIndex}
          onChange={idx => setTabIndex(idx)}
          colorScheme="cyan"
        >
          <TabList mb="1em">
            <Tab>Classic Search</Tab>
            <Tab>Chat Search</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box pb="3">
                <Text fontSize="lg">
                  Have an example in mind? Tell us about it below and where to
                  look within, and we will try our best to look for something
                  similar.
                </Text>
                <Text as="em" fontSize="lg">
                  Otherwise, if you do not have a specific example in mind, try
                  out
                  <Button
                    colorScheme="cyan"
                    variant="outline"
                    p="2"
                    ml="2"
                    mr="1"
                    onClick={() => setTabIndex(1)}
                  >
                    Chat Search
                  </Button>
                  .
                </Text>
              </Box>
              <Box display="flex" mt="4" pb="3%" columnGap="5%">
                <Box width="60%">
                  <Box
                    display="flex"
                    justifyContent="center"
                    border="1px solid rgb(63,94,251)"
                  >
                    <GMaps
                      selPlaces={selPlaces}
                      queryCenter={queryCenter}
                      setMapRef={setMapRef}
                      setMapsRef={setMapsRef}
                      setCircleRef={setCircleRef}
                      circleRadius={circleRadius}
                    />
                  </Box>
                </Box>

                <Box width="33%">
                  <RightMenu
                    selPlaces={selPlaces}
                    setSelPlaces={setSelPlaces}
                    setResults={setResults}
                    queryCenter={queryCenter}
                    setQueryCenter={setQueryCenter}
                    mapRef={mapRef}
                    mapsRef={mapsRef}
                    circleRef={circleRef}
                    circleRadius={circleRadius}
                    setCircleRadius={setCircleRadius}
                    isLoadingResult={isLoadingResult}
                    setIsLoadingResult={setIsLoadingResult}
                  />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel>
              <Chat inView={tabIndex === 1} setResults={setResults} />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Box>{results != null && <ResultPanel results={results} />}</Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
