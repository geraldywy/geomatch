import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import { usePlacesWidget } from 'react-google-autocomplete';
import { AddIcon } from '@chakra-ui/icons';

export default function SelectionPanel({
  currCoordinates,
  setCurrCoordinates,
  pendingPlace,
  setPendingPlace,
}) {
  const { ref } = usePlacesWidget({
    apiKey: '',
    onPlaceSelected: place => {
      console.log(place);
      setPendingPlace(place);
    },
    options: {
      types: ['(regions)'],
      componentRestrictions: { country: 'sg' },
    },
  });

  return (
    <Box>
      <Heading mb="8">Add a query point</Heading>

      <Box display="flex" alignItems="center" columnGap="4">
        <Text fontSize="lg">Location:</Text>
        <Input placeholder="Enter a location" size="md" ref={ref} />
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
