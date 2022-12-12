import Head from 'next/head';
import { useRouter } from 'next/router';
import { Center, Image } from '@mantine/core';

export default function Results() {
    const router = useRouter();
    const imgSrc = `https://replicate.delivery/pbxt/${router.query.path}/out-0.png`;
    return (
        <>
        <Head>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@ASK_HAPI" />
            <meta name="twitter:title" content="Bitcoin Powered AI" />
            <meta name="twitter:description" content="Use AI models with nos subscriptions, just micropayments" />
            <meta name="twitter:image" content={`"https://replicate.delivery/pbxt/${router.query.path}/out-0.png"`} />
        </Head>
        <Center> <Image title="imageFrame" src={`${imgSrc}`} /></Center>
        </>
    );
}
