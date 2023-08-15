import {
  ArrowDownIcon,
  ArrowUpIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { RiDragMoveFill, FaSlidersH } from 'react-icons/all';

export default function SelectQueryRadius({
  mapRef,
  mapsRef,
  circleRef,
  circleRadius,
  setCircleRadius,
  forward,
  backward,
  canShow,
  canShowArrows,
}) {
  const initialCircleRadius = 10000; // in metres

  useEffect(() => {
    if (!mapRef || !mapsRef || !circleRef) {
      return;
    }

    if (!canShow) {
      circleRef.setRadius(0);
      setCircleRadius(initialCircleRadius);
      return;
    }

    circleRef.setRadius(initialCircleRadius);
    setCircleRadius(initialCircleRadius);
    circleRef.setCenter(mapRef.getCenter());
    circleRef.setDraggable(true);
    mapRef.setZoom(12);
  }, [mapRef, mapsRef, circleRef, setCircleRadius, canShow]);

  if (!canShow) {
    return;
  }

  return (
    <FadeIn delay={100}>
      {canShowArrows && (
        <Box w="full" textAlign="center" my="5">
          <IconButton
            isRound
            colorScheme="telegram"
            aria-label="Next step"
            size="lg"
            variant="outline"
            icon={<TriangleUpIcon />}
            onClick={() => {
              backward();
              circleRef.setRadius(0);
              setCircleRadius(0);
            }}
          />
        </Box>
      )}

      <Box my={canShowArrows ? '0' : '7'}>
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

        {canShowArrows && (
          <Box w="full" textAlign="center" my="5">
            <IconButton
              isRound
              colorScheme="telegram"
              aria-label="Next step"
              size="lg"
              variant="outline"
              icon={<TriangleDownIcon />}
              onClick={forward}
            />
          </Box>
        )}
      </Box>
    </FadeIn>
  );
}
