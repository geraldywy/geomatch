import {
  ChevronDownIcon,
  ChevronUpIcon,
  InfoOutlineIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Text,
  IconButton,
  Tooltip,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { getMarker } from '../maps/Marker';
import GMaps from '../maps/GMaps';
import noImageAvail from './no_image_available.jpeg';

export default function Result({ res, num }) {
  const [expand, setExpand] = useState(false);

  const ShowExpandedResult = ({ res }) => {
    return (
      <Box mt="10">
        <GMaps
          selPlaces={res.map((r, idx) => ({
            ...r.place,
            geometry: {
              location: {
                lat: () => r.place.geometry.location.lat,
                lng: () => r.place.geometry.location.lng,
              },
            },
            listNum: idx + 1,
          }))}
        />
      </Box>
    );
  };

  const ShowSummary = ({ res, expand }) => {
    const insertBetween = (ele, array) => {
      return array.flatMap(x => [ele, x]).slice(1);
    };
    return (
      <Box display="flex" justifyContent="left" alignItems="center">
        {insertBetween('+', res).map((r, idx) => (
          <Box>
            {r === '+' ? (
              <Box w="150px" mx="8">
                <hr
                  style={{
                    border: '0',
                    color: '#f00',
                    background:
                      'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
                    height: '5px',
                  }}
                ></hr>
              </Box>
            ) : (
              <PointSummary
                placeAndCost={r}
                idx={idx / 2}
                key={idx}
                expand={expand}
              />
            )}
          </Box>
        ))}
      </Box>
    );
  };

  const PointSummary = ({ placeAndCost, idx, expand }) => {
    const poi = placeAndCost.place;
    const cost = placeAndCost.cost;
    return (
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          boxSize="70px"
          objectFit="contain"
          src={getMarker(idx + 1)}
          alt="marker"
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          columnGap="2"
        >
          <Image boxSize="18px" objectFit="contain" src={poi.icon} alt="icon" />
          <Text maxW="170px">{poi.name}</Text>
        </Box>
        {expand && (
          <Box
            mt="4"
            display="flex"
            flexDir="column"
            justifyContent="left"
            alignItems="center"
            rowGap="2"
          >
            <Box>
              <Image
                boxSize="200px"
                objectFit="contain"
                src={
                  poi.photo_reference
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${poi.photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
                    : noImageAvail
                }
                alt={poi.name}
              />
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              columnGap="2"
            >
              <Text>Node cost: {cost.toFixed(5)}</Text>
              <Tooltip
                label="Node cost is the total absolute distance (in km) deviated from the corresponding given point in the query."
                fontSize="md"
              >
                <InfoOutlineIcon />
              </Tooltip>
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      px="6"
      pt="1"
      pb="4"
      border="1px solid rgb(63,94,251)"
      my="7"
      borderRadius="lg"
      _hover={{ boxShadow: 'dark-lg' }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py="3"
      >
        <Box>
          <Heading as="h2" size="md">
            Result #{num}
          </Heading>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            columnGap="2"
            my="1"
          >
            <Text size="sm">
              Cost: {res.ttl_cost ? res.ttl_cost.toFixed(5) : 'N/A'}
            </Text>
            <Tooltip
              label="Cost is estimated as the total absolute distance (in km) deviated from given query."
              fontSize="md"
            >
              <InfoOutlineIcon />
            </Tooltip>
          </Box>
        </Box>
        <IconButton
          isRound={true}
          variant={expand ? 'solid' : 'outline'}
          colorScheme="purple"
          aria-label="Done"
          fontSize="20px"
          icon={expand ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={() => setExpand(prev => !prev)}
          size="sm"
          mr="5"
        />
      </Box>
      <Box px="6" py="5">
        <ShowSummary res={res.places} expand={expand} />
        {expand && <ShowExpandedResult res={res.places} />}
      </Box>
    </Box>
  );
}
