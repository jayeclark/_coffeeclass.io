import { useState, useEffect } from 'react'
import {
    Heading,
    Flex,
    Text,
    Box,
    Divider,
    useColorModeValue,
    AspectRatio,
    Skeleton,
    Image,
} from '@chakra-ui/react'
import Link from 'next/link'
import NextImage from 'next/image'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export default function RelatedPosts({ tags, posts, style, currPostTitle }) {
    var relatedPosts = []

    // loop through all tags and see if they match any of the tags of the current post
    for (var i = 0; i < tags.length; i++) {
        posts.map(post => {
            post.data.tags.map(tag => {
                if (tags[i] == tag) {
                    relatedPosts.push(post)
                }
            })
        })
    }

    // remove duplicates
    relatedPosts = [...new Set(relatedPosts)]

    // remove current post
    relatedPosts = relatedPosts.filter(
        post => post.data.title !== currPostTitle
    )

    // order posts by date
    relatedPosts.sort((a, b) => {
        return new Date(b.data.publishedAt) - new Date(a.data.publishedAt)
    })

    const [scrollY, setScrollY] = useState(0)

    const handleScroll = () => {
        setScrollY(window.scrollY)
    }

    useEffect(() => {
        setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    if (style == "sidebar") {
        return (
            relatedPosts.length > 0 &&
            <>
                <Flex
                    flexDir="column"
                    opacity={scrollY > 500 ? 1 : 0}
                    transition="opacity .7s ease-in-out"
                    visibility={scrollY > 500 ? "visible" : "hidden"}
                    px={2}
                >
                    <Box overflowY="auto" h="calc(100vh - 100px)">
                        <Heading as="h4" size="sm" my={2}>View Related Posts</Heading>
                        {relatedPosts.map(post => {
                            return (
                                <Link as={`/articles/${post.filePath.replace(/\.mdx?$/, '')}`} href={`/articles/[slug]`}>
                                    <Box
                                        key={post.data.title}
                                        p={2}
                                        _hover={{
                                            bgColor: useColorModeValue("gray.100", "gray.800"),
                                            cursor: "pointer",
                                            textDecoration: 'underline',
                                        }}
                                        my={1}
                                        borderRadius={2}
                                    >
                                        <Heading
                                            as="h5"
                                            size="sm"
                                            color={useColorModeValue("gray.700", "gray.400")}
                                            my={1}
                                            fontWeight="normal"
                                        >
                                            {post.data.title} &middot; {timeAgo.format(new Date(post.data.publishedAt))}
                                        </Heading>
                                    </Box>
                                </Link>
                            )
                        })}
                    </Box>
                </Flex>
            </>
        )
    }

    const [loaded, setLoaded] = useState(false)

    return (
        relatedPosts.length > 0 &&
        <>
            <Flex flexDir="column" w="100vw" maxW={800} minW={320}>
                <Heading as="h4" size="md" mb={2} px={4}>View Related Posts</Heading>
                <Flex overflowX="auto">
                    {relatedPosts.map(post => (
                        <Link
                            as={`/articles/${post.filePath.replace(/\.mdx?$/, '')}`}
                            href={`/articles/[slug]`}
                            _hover={{
                                cursor: "pointer",
                            }}
                        >
                            <Flex
                                flexDir="column"
                                justify="space-between"
                                bgColor={useColorModeValue("gray.200", "gray.700")}
                                m={2}
                                p={5}
                                transition='box-shadow 0.3s ease-in-out'
                                borderRadius={5}
                                _hover={{
                                    boxShadow: useColorModeValue("0px 8px 26px rgba(0, 0, 0, 0.25)", "0px 8px 26px rgba(255, 255, 255, 0.25)"),
                                    cursor: "pointer",
                                }}
                                maxW={200}
                            >
                                <Text mb={2} minW={120} textAlign="center" color={useColorModeValue("gray.500", "gray.400")} fontSize="xs" mb={2}>{timeAgo.format(new Date(post.data.publishedAt))}</Text>
                                {post?.data?.logoImage &&
                                    <Box>
                                        <Box
                                            w={50}
                                            h={50}
                                            my={2}
                                            mx="auto"
                                        >
                                            <AspectRatio ratio={1}>
                                                <Skeleton isLoaded={loaded}>
                                                    <NextImage
                                                        src={`/logos/${post.data.logoImage[0]}`}
                                                        alt={post?.data?.logoImage[0]}
                                                        layout="fill"
                                                        onLoad={() => setLoaded(true)}
                                                    />
                                                </Skeleton>
                                            </AspectRatio>
                                        </Box>
                                    </Box>}

                                {
                                    post?.data?.featureImg &&
                                    <Flex justify="center">
                                        <AspectRatio w="100%" ratio={16 / 9}>
                                            <NextImage src={`/content/articles/${post?.filePath.replace(".mdx", "")}/${post?.data?.featureImg}`} alt={post?.data?.title} layout="fill" />
                                        </AspectRatio>
                                    </Flex>
                                }
                                <Heading size="sm" mt={4}>{post.data.title}</Heading>
                            </Flex>
                        </Link>
                    ))}
                </Flex>
            </Flex>
        </>
    )
}
