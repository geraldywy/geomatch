import { Button, IconButton } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { fireQueryByRadiusReq } from '../../api/api';
import SelectExample from './SelectExample';
import SelectQueryRadius from './SelectQueryRadius';
import { SearchIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Text,
  Heading,
} from '@chakra-ui/react';
import AdvancedQueryOptions from './AdvancedQueryOptions';

export default function RightMenu({
  selPlaces,
  setSelPlaces,
  setResults,
  queryCenter,
  setQueryCenter,
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

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 3,
  });

  const steps = [
    {
      title: 'Query Example',
      description: 'Tell us the example you have in mind.',
      content: (
        <SelectExample
          selPlaces={selPlaces}
          setSelPlaces={setSelPlaces}
          queryCenter={queryCenter}
          setQueryCenter={setQueryCenter}
          forward={() => setActiveStep(prev => prev + 1)}
          canShow={activeStep === 0}
          resetIndex={() => setActiveStep(0)}
        />
      ),
    },
    {
      title: 'Search Area',
      description: 'Tell us where we should search within.',
      content: (
        <SelectQueryRadius
          mapRef={mapRef}
          mapsRef={mapsRef}
          circleRef={circleRef}
          circleRadius={circleRadius}
          setCircleRadius={setCircleRadius}
          backward={() => setActiveStep(prev => prev - 1)}
          forward={() => setActiveStep(prev => prev + 1)}
          canShow={activeStep >= 1 && selPlaces && selPlaces.length > 0}
          canShowArrows={activeStep === 1 && selPlaces && selPlaces.length > 0}
        />
      ),
    },
    {
      title: 'Send your request',
      description:
        "More options for the adventurous. Otherwise, you're all set to fire a request!",
      content: (
        <Box>
          {activeStep === 2 && (
            <Box>
              <Box w="full" textAlign="center" my="5">
                <IconButton
                  isRound
                  colorScheme="telegram"
                  aria-label="Next step"
                  size="lg"
                  variant="outline"
                  icon={<TriangleUpIcon />}
                  onClick={() => setActiveStep(prev => prev - 1)}
                />
              </Box>

              <AdvancedQueryOptions
                numResultToReturn={numResultToReturn}
                setNumResultToReturn={setNumResultToReturn}
                noOverlap={noOverlap}
                setNoOverlap={setNoOverlap}
                allowDuplicates={allowDuplicates}
                setAllowDuplicates={setAllowDuplicates}
              />

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
            </Box>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box
        // border="1px solid rgb(63,94,251)"
        pt="5"
        pb="10"
        px="5"
        borderRadius="xl"
        boxShadow="xl"
      >
        <Stepper size="lg" index={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index} w="100%">
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box w="80%">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>
                  <Text maxW="320px">{step.description}</Text>
                </StepDescription>
                <Box>{step.content}</Box>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}
