import React, { useState } from 'react';
import { ChakraProvider, Box, Text, theme, Heading } from '@chakra-ui/react';
import GMaps from './components/maps/GMaps';
import ResultPanel from './components/results/ResultPanel';
import RightMenu from './components/right-menu/RightMenu';

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

  return (
    <ChakraProvider theme={theme}>
      <Box px="5%">
        <Box
          pt="8"
          pb="2"
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
        <Box display="flex" pt="3%" pb="3%" columnGap="5%">
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

        <Box>{results != null && <ResultPanel results={results} />}</Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
