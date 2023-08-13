import { Button, IconButton } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { fireQueryByRadiusReq } from '../../api/api';
import SelectExample from './SelectExample';
import SelectQueryRadius from './SelectQueryRadius';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';

export default function RightMenu({
  selPlaces,
  setSelPlaces,
  setResults,
  queryCenter,
  setQueryCenter,
  showSelectQueryRadius,
  setShowSelectQueryRadius,
  mapRef,
  mapsRef,
  circleRef,
  circleRadius,
  setCircleRadius,
  isLoadingResult,
  setIsLoadingResult,
}) {
  const [numResultToReturn, setNumResultToReturn] = useState(5);
  const [noOverlap, setNoOverlap] = useState(false);
  const [allowDuplicates, setAllowDuplicates] = useState(false);

  return (
    <Box
      border="1px solid rgb(63,94,251)"
      py="10"
      px="5"
      borderRadius="xl"
      boxShadow="xl"
    >
      <SelectExample
        selPlaces={selPlaces}
        setSelPlaces={setSelPlaces}
        queryCenter={queryCenter}
        setQueryCenter={setQueryCenter}
        showSelectQueryRadius={showSelectQueryRadius}
        setShowSelectQueryRadius={setShowSelectQueryRadius}
      />
      <SelectQueryRadius
        mapRef={mapRef}
        mapsRef={mapsRef}
        circleRef={circleRef}
        show={showSelectQueryRadius}
        circleRadius={circleRadius}
        setCircleRadius={setCircleRadius}
        numResultToReturn={numResultToReturn}
        setNumResultToReturn={setNumResultToReturn}
        noOverlap={noOverlap}
        setNoOverlap={setNoOverlap}
        allowDuplicates={allowDuplicates}
        setAllowDuplicates={setAllowDuplicates}
      />

      {showSelectQueryRadius && (
        <Box textAlign="center" mt="10" mb="3">
          <Button
            colorScheme="whatsapp"
            variant="outline"
            isLoading={isLoadingResult}
            loadingText="Processing"
            onClick={() =>
              fireQueryByRadiusReq(
                selPlaces,
                setResults,
                circleRef.getCenter().lat(),
                circleRef.getCenter().lng(),
                circleRadius,
                setIsLoadingResult,
                numResultToReturn,
                noOverlap,
                allowDuplicates
              )
            }
            leftIcon={<SearchIcon />}
          >
            Search by example
          </Button>
        </Box>
      )}
    </Box>
  );
}
