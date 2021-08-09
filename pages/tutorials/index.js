import {
    Heading,
    Flex,
    Stack,
    Text,
    useColorMode,
    Grid
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../../components/Container'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../../lib/mdxUtils'
import Tutorial from '../../components/Cards/Tutorial'

const url = 'https://coffeeclass.io/tutorials/'
const title = 'Tutorials | coffeeclass.io'
const description = 'coffeeclass.io tutorials are involved and usually correspond to a YouTube video. They typically take 15 minutes at a minimum to complete.'

export default function Index({ posts }) {
    const { colorMode } = useColorMode()
    const color = {
        light: 'gray.700',
        dark: 'gray.300'
    }
    const headerColor = {
        light: 'brand_one.600',
        dark: 'brand_one.500'
    }
    const tutorialsOrderedByPublishedDate = posts
        .sort(
            (a, b) =>
                Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
        )
    return (
        <Container>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    url,
                    title,
                    description
                }}
            />
            <Stack
                spacing={8}
                px={4}
            >
                <Flex flexDir="column" mt={50}>
                    <Heading
                        as="h1"
                        size="xl"
                        letterSpacing="tight"
                        textTransform="uppercase"
                        color={headerColor[colorMode]}
                    >
                        coffeeclass.io Tutorials 📚
                    </Heading>
                    <Text color={color[colorMode]} mt={2} mb={8} fontSize="lg">Tutorials are involved and usually correspond to a YouTube video. They typically take 15 minutes at a minimum to complete.</Text>
                    <Flex wrap="wrap">
                        {tutorialsOrderedByPublishedDate.map((post) => (
                            <Flex m={1, 1, 1, 2, 2, 2}>
                                <Tutorial
                                    key={post.data.title}
                                    src={`/content/tutorials/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                                    title={post.data.title}
                                    description={post.data.description}
                                    tags={post.data.tags}
                                    as={`/tutorials/${post.filePath.replace(/\.mdx?$/, '')}`}
                                    href={`/tutorials/[slug]`}
                                />
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            </Stack>
        </Container>
    )
}

export function getStaticProps() {
    const posts = tutorialsFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(TUTORIALS_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content, // do I need to fetch content? This may cause significant load time down the line
            data,
            filePath,
        }
    })

    return { props: { posts } }
}