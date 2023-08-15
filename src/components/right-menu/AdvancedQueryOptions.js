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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';

import { MdFormatListNumbered } from 'react-icons/all';

export default function AdvancedQueryOptions({
  numResultToReturn,
  setNumResultToReturn,
  noOverlap,
  setNoOverlap,
  allowDuplicates,
  setAllowDuplicates,
}) {
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
}
