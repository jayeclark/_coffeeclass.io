import { useState } from 'react'
import {
    Flex,
    Box,
    IconButton,
    useColorMode,
    Button,
    Heading,
    Divider
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import DarkModeSwitch from './DarkModeSwitch'
import NextLink from 'next/link'

const NavBarTop = () => {
    const [display, changeDisplay] = useState('none')
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'gray.100',
        dark: 'gray.700'
    }
    const hoverColor = {
        light: 'gray.300',
        dark: 'gray.500'
    }
    const boxShadowColor = {
        light: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
        dark: '0 4px 12px 0 rgba(0, 0, 0, 0.9)'
    }
    return (
        <>
            <Box
                bgColor={bgColor[colorMode]}
                pos="fixed"
                right={0}
                top={0}
                borderRadius={5}
                mt={3}
                mr={3}
                boxShadow={boxShadowColor[colorMode]}
            >
                <DarkModeSwitch />
                <IconButton
                    bgColor={bgColor[colorMode]}
                    aria-label="Open Menu"
                    size="lg"
                    _hover={{
                        textDecoration: 'none',
                        color: hoverColor[colorMode]
                    }}
                    icon={
                        <HamburgerIcon />
                    }
                    onClick={() => changeDisplay('flex')}
                />
            </Box>

            <Flex
                w='100vw'
                display={display}
                bgColor={bgColor[colorMode]}
                zIndex={20}
                h="100vh"
                pos="fixed"
                top="0"
                left="0"
                // top="20"
                // right="10"
                zIndex={20}
                overflowY="auto"
                flexDir="column"
                // w="300px"
            >
                <Flex justify="flex-end">
                    <IconButton
                        mt={2}
                        mr={2}
                        bgColor={bgColor[colorMode]}
                        aria-label="Open Menu"
                        size="lg"
                        _hover={{
                            textDecoration: 'none',
                            color: hoverColor[colorMode]
                        }}
                        icon={
                            <CloseIcon />
                        }
                        onClick={() => changeDisplay('none')}
                    />
                </Flex>

                <Flex
                    flexDir={["column", "row", "row", "row"]}
                    justify="space-around"
                >
                    {/* Content Column */}
                    <Flex
                        flexDir="column"
                        align="center"
                    >
                        <Heading as="h4" size="sm">Content</Heading>
                        <Divider mt={2} w="90%" />

                        <NextLink href="/" passHref>
                            <Button
                                as="a"
                                variant="ghost"
                                aria-label="Home"
                                w="100%"
                            >
                                Home
                    </Button>
                        </NextLink>

                        <NextLink href="/snippets" passHref>
                            <Button
                                as="a"
                                variant="ghost"
                                aria-label="Snippets"
                                w="100%"
                            >
                                Snippets
                    </Button>
                        </NextLink>

                        <NextLink href="/learn" passHref>
                            <Button
                                as="a"
                                variant="ghost"
                                aria-label="Learn"
                                w="100%"
                            >
                                Learn
                    </Button>
                        </NextLink>

                        <NextLink href="/tutorials" passHref>
                            <Button
                                as="a"
                                variant="ghost"
                                aria-label="Tutorials"
                                w="100%"
                            >
                                Tutorials
                    </Button>
                        </NextLink>

                        <NextLink href="/tags" passHref>
                            <Button
                                as="a"
                                variant="ghost"
                                aria-label="Tags"
                                w="100%"
                            >
                                Tags
                        </Button>
                        </NextLink>
                    </Flex>

                    {/* Company Column */}
                    <Flex
                        flexDir="column"
                        align="center"
                        mt={[10, 0, 0, 0]}
                    >
                        <Heading as="h4" size="sm">Company</Heading>
                        <Divider mt={2} w="90%" />

                        <NextLink href="/about" passHref>
                            <Button
                                as="a"
                                variant="ghost"
                                aria-label="About"
                                w="100%"
                            >
                                About
                        </Button>
                        </NextLink>

                    </Flex>

                    {/* Current Page Navigation Column */}
                    <Flex
                        flexDir="column"
                        align="center"
                        mt={[10, 0, 0, 0]}
                    >
                        <Heading as="h4" size="sm">Page Navigation</Heading>
                        <Divider mt={2} w="90%" />

                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default NavBarTop