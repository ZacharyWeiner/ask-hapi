import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Center, Container, Image } from '@mantine/core';
import Welcome from '../components/Welcome/Welcome';
import { IconArrowBack } from '@tabler/icons';

export default function Results() {
    const router = useRouter();
    const imgSrc = `https://replicate.delivery/pbxt/${router.query.path}`;
    return (
        <>
        <Head>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@ASK_HAPI" />
            <meta name="twitter:title" content="Bitcoin Powered AI" />
            <meta name="twitter:description" content="Use AI models with no subscriptions, just micropayments" />
            <meta name="twitter:image" content={`${imgSrc}`} />
        </Head>
        <Welcome subtext="Made on AskHapi.com" />
        <Container>
            <Link href="/">
            <Center>
                <div>
                    <Center><IconArrowBack> </IconArrowBack></Center>
                <div>
                <Image radius="xl" title="imageFrame" src={`${imgSrc}`} style={{ maxHeight: '480px', maxWidth: '480px' }} />
                </div>
                </div>
            </Center>
            </Link>
        </Container>
        </>
    );
}
