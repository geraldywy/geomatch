import {
  ArrowDownIcon,
  ArrowUpIcon,
  Icon,
  InfoOutlineIcon,
  SettingsIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  List,
  ListIcon,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import {
  RiDragMoveFill,
  FaSlidersH,
  MdFormatListNumbered,
} from 'react-icons/all';

export default function SelectQueryRadius({
  mapRef,
  mapsRef,
  circleRef,
  show,
  circleRadius,
  setCircleRadius,
  numResultToReturn,
  setNumResultToReturn,
  noOverlap,
  setNoOverlap,
  allowDuplicates,
  setAllowDuplicates,
}) {
  const initialCircleRadius = 10000; // in metres

  useEffect(() => {
    console.log('re render', [
      mapRef,
      mapsRef,
      circleRef,
      show,
      setCircleRadius,
    ]);
    if (!mapRef || !mapsRef || !circleRef) {
      return;
    }
    if (!show) {
      circleRef.setRadius(0);
      setCircleRadius(0);
      return;
    }

    circleRef.setRadius(initialCircleRadius);
    setCircleRadius(initialCircleRadius);
    circleRef.setCenter(mapRef.getCenter());
    circleRef.setDraggable(true);
    mapRef.setZoom(12);
  }, [mapRef, mapsRef, circleRef, show, setCircleRadius]);

  if (!show) {
    return;
  }
  return (
    <FadeIn delay={100}>
      <Box>
        <Heading as="h1" size="md" mb="4">
          2. Select area to search within:
        </Heading>

        <List spacing={5}>
          <ListItem>
            <ListIcon as={RiDragMoveFill} color="green.500" />
            Drag the circle on the map to desired location.
          </ListItem>

          <ListItem>
            <ListIcon as={FaSlidersH} color="green.500" />
            Adjust circle radius:{' '}
            <Text display="inline" as="b">
              {circleRadius} metres
            </Text>
            <Slider
              my="2"
              min={500}
              max={50000}
              step={100}
              aria-label="adjust slider radius"
              colorScheme="linkedin"
              defaultValue={initialCircleRadius}
              onChange={val => {
                setCircleRadius(val);
                circleRef.setRadius(circleRadius);
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </ListItem>
        </List>

        <AdvancedQueryOptions
          numResultToReturn={numResultToReturn}
          setNumResultToReturn={setNumResultToReturn}
          noOverlap={noOverlap}
          setNoOverlap={setNoOverlap}
          allowDuplicates={allowDuplicates}
          setAllowDuplicates={setAllowDuplicates}
        />
      </Box>
    </FadeIn>
  );
}

const AdvancedQueryOptions = ({
  numResultToReturn,
  setNumResultToReturn,
  noOverlap,
  setNoOverlap,
  allowDuplicates,
  setAllowDuplicates,
}) => {
  const [expand, setExpand] = useState(false);
  return (
    <Box my="5" textAlign="center">
      <Button
        leftIcon={<SettingsIcon />}
        rightIcon={expand ? <ArrowUpIcon /> : <ArrowDownIcon />}
        variant="outline"
        colorScheme="cyan"
        onClick={() => setExpand(prev => !prev)}
      >
        Advanced Options
      </Button>
      {expand && (
        <FadeIn delay={100}>
          <Box display="flex" alignItems="center" justifyContent="left" mt="5">
            <Icon as={MdFormatListNumbered} color="cyan" w={4} h={4} mr="2" />
            <Text mr="3">Number of result to return: </Text>
            <NumberInput
              defaultValue={numResultToReturn}
              min={1}
              max={20}
              size="sm"
              maxW={20}
              onChange={val => setNumResultToReturn(parseInt(val, 10))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <Box display="flex" alignItems="center" ml="2">
              <Tooltip
                label="Number of results to return. Fewer results might be returned in cases of insufficient data points."
                fontSize="sm"
              >
                <InfoOutlineIcon />
              </Tooltip>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="left" my="3">
            <Icon as={MdFormatListNumbered} color="cyan" w={4} h={4} mr="2" />
            <Text>No Overlap?</Text>

            <Switch
              id="no-overlap"
              colorScheme="whatsapp"
              ml="2"
              mr="2"
              isChecked={noOverlap}
              onChange={() => setNoOverlap(prev => !prev)}
            />
            <Box display="flex" alignItems="center">
              <Tooltip
                label="Result set cannot contain any location in query set."
                fontSize="sm"
              >
                <InfoOutlineIcon />
              </Tooltip>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="left" my="3">
            <Icon as={MdFormatListNumbered} color="cyan" w={4} h={4} mr="2" />
            <Text>Allow duplicates?</Text>
            <Switch
              id="allow-duplicates"
              colorScheme="whatsapp"
              ml="2"
              mr="2"
              isChecked={allowDuplicates}
              onChange={() => setAllowDuplicates(prev => !prev)}
            />
            <Box display="flex" alignItems="center">
              <Tooltip
                label="Allow the result to contain duplicate locations if it satifies multiple categories"
                fontSize="sm"
              >
                <InfoOutlineIcon />
              </Tooltip>
            </Box>
          </Box>
        </FadeIn>
      )}
    </Box>
  );
};
