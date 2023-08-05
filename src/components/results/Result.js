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

export default function Result({ res, num }) {
  const [expand, setExpand] = useState(false);

  const ShowExpandedResult = () => {
    console.log('expand!');
    return (
      <Box>
        <Text>oh yea, its big brain time</Text>
      </Box>
    );
  };

  const ShowSummary = ({ res }) => {
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
              <PointSummary poi={r} idx={idx / 2} key={idx} />
            )}
          </Box>
        ))}
      </Box>
    );
  };

  const PointSummary = ({ poi, idx }) => {
    console.log();
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
          alt="Dan Abramov"
        />
        <Text maxW="170px">{poi.name}</Text>
      </Box>
    );
  };

  return (
    <Box
      px="6"
      pt="1"
      pb="4"
      border="1px solid gray"
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
            <Text size="sm">Cost: {res.cost.toFixed(5)}</Text>
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
        <ShowSummary res={res.places} />
        {expand && <ShowExpandedResult res={res.places} />}
      </Box>
    </Box>
  );
}
