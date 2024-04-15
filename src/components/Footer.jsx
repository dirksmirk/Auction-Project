import React from 'react';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { VisuallyHidden } from '@chakra-ui/visually-hidden';
import { Icon } from '@chakra-ui/icons';



const ExternalLinkButton = ({ href, label, children }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => (
  <Text fontWeight="bold" mb={2}>
    {children}
  </Text>
);

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Box as="a" href={'#'}>
              Buy & Sell
            </Box>
            <Box as="a" href={'#'}>
              Terms of Purchase & Bidding
            </Box>
            <Box as="a" href={'#'}>
              FAQs
            </Box>
            <Box as="a" href={'#'}>
              Buying with us
            </Box>
            <Box as="a" href={'#'}>
              Selling with us
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Box as="a" href={'#'}>
              About Auctions More!
            </Box>
            <Box as="a" href={'#'}>
              Privacy Policy
            </Box>
            <Box as="a" href={'#'}>
              Cookies
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Box as="a" href={'#'}>
              Contact Us
            </Box>
            <Box as="a" href={'#'}>
              Support
            </Box>
            <Box as="a" href={'#'}>
              Careers
            </Box>
            <Box as="a" href={'#'}>
              Shipping Information
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>
          
          <ExternalLinkButton href="#" label="External Link">
            <Icon name="external-link" />
          </ExternalLinkButton>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
