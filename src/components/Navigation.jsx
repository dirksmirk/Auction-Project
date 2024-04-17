import { useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { SearchContext } from '../Context';
import {
  Box,
  Flex,
  Input,
  Button,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';

const Links = [
  { to: '/', text: 'Home' },
  { to: '/create', text: "Create Auction" }, // corrected the 'to' value
];

const Navigation = () => {
  const { myvalue, myUpdateFunc } = useContext(SearchContext);
  const input = useRef();

  const handleSearch = () => {
    const inputValue = input.current.value.trim(); // Remove leading and trailing whitespaces
    myUpdateFunc(inputValue);

  };
  // reset function for home and create auction inputs, so that search resets
  const Reset = () => {
    input.current.value = "";
    myUpdateFunc("");
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={Reset}>
                {link.text}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Input
            ref={input}
            placeholder="Search"
            border='2px' 
            borderStyle='ridge' 
            borderColor='gray' 
            borderRadius={5}
            size="sm"
            pr="4.5rem"
          />
          <NavLink to="/" >
            <Button
              size="sm"
              colorScheme="blue"
              onClick={handleSearch}
              ml={2}
              >Search
            </Button>
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;
