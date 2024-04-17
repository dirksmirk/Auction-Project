import React, { useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { SearchContext } from '../Context';
import {
  Box,
  Flex,
  IconButton,
  Input,
  Button,
  useDisclosure,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = [
  { to: '/', text: 'Home' },
  { to: '/create', text: "Create Auction" }, // corrected the 'to' value
];

const Navigation = () => {
  const { myUpdateFunc } = useContext(SearchContext);
  const input = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = () => {
    const inputValue = input.current.value.trim(); // Remove leading and trailing whitespaces

    if (inputValue === '') {
      // If the search input is empty, navigate to the home page
      window.location.href = '/';
    } else {
      // If the search input is not empty, update the search context
      myUpdateFunc(inputValue);
      console.log(inputValue);
    }
  };

  const resetInput = () => {
    input.current.value = '';
    myUpdateFunc('');
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.text}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Input
            ref={input}
            placeholder="Search"
            variant="unstyled"
            size="sm"
            pr="4.5rem"
          />
          <Button
            size="sm"
            colorScheme="blue"
            onClick={handleSearch}
            ml={2}
          >
            Search
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            onClick={resetInput}
            ml={2}
          >
            Reset
          </Button>
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <HStack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.text}
              </NavLink>
            ))}
          </HStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navigation;
