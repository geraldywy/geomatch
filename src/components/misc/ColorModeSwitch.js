import React from 'react';
import { Flex, Switch, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const switchColor = {
    light: 'gray',
    dark: 'teal',
  };

  const iconSize = '24px'; // Adjust the icon size as needed
  const sunColor = 'orange.500'; // Orange color for the sun icon

  return (
    <Flex alignItems="center">
      <SunIcon
        w={iconSize}
        h={iconSize}
        color={colorMode === 'light' ? sunColor : 'gray.300'}
      />
      <Switch
        isChecked={colorMode === 'dark'}
        onChange={toggleColorMode}
        size="lg"
        colorScheme={switchColor[colorMode]}
        marginLeft="2"
        marginRight="2"
      />
      <MoonIcon
        w={iconSize}
        h={iconSize}
        color={colorMode === 'dark' ? 'teal.300' : 'gray.300'}
      />
    </Flex>
  );
};

export default ColorModeSwitch;
