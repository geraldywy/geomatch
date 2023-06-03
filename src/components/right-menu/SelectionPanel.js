import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import { usePlacesWidget } from 'react-google-autocomplete';
import Autocomplete from 'react-google-autocomplete';
import { AddIcon } from '@chakra-ui/icons';

export default function SelectionPanel({
  currCoordinates,
  setCurrCoordinates,
  pendingPlace,
  setPendingPlace,
}) {
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: place => {
      console.log(place);
      // setPendingPlace(place);
    },
    options: {
      types: '',
      fields: [
        'name',
        'place_id',
        'rating',
        'reviews',
        'formatted_address',
        'geometry.location',
      ],
    },
  });

  return (
    <Box w="full">
      <Heading mb="8">Add a query point</Heading>

      <Box display="flex" alignItems="center" columnGap="4">
        <Text fontSize="lg">Location:</Text>
        <Input placeholder="Enter a location" size="md" ref={ref} mr="6" />
      </Box>

      {pendingPlace && (
        <Box my="12">
          <Text>{pendingPlace}</Text>

          <Button
            leftIcon={<AddIcon />}
            colorScheme="whatsapp"
            onClick={() => {
              setCurrCoordinates(prev => prev.concat(pendingPlace));
              setPendingPlace(null);
            }}
          >
            Add
          </Button>
        </Box>
      )}

      <Box my="12">
        {currCoordinates && currCoordinates.length > 0 ? (
          <Box>
            <Heading>Your Current Selection:</Heading>
            <Box>
              {currCoordinates.map(x => (
                <Text>{x.name}</Text>
              ))}
            </Box>
          </Box>
        ) : (
          <Text fontSize="md">No selection yet</Text>
        )}
      </Box>
    </Box>
  );
}
