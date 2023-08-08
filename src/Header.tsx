import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'
import { Button, Select, Flex, Spacer, Box, Divider } from '@chakra-ui/react'

function Header() {
  
    return (
      <ChakraProvider>
        <Flex>
  <Spacer />
  <Button p='4' m="2" bg='green.400'>
    Login
  </Button>
  <Button p='4' m="2" bg='green.400'>
    Registration
  </Button>
  <Box w='82px' m="2">
    <Select>
  <option value='RUS'>RUS</option>
  <option value='ENG'>ENG</option>
  <option value='EST'>EST</option>
</Select>
</Box>
</Flex>
<Divider/>
      </ChakraProvider>
    )
  }
export default Header;