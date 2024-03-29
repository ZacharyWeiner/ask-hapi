import Script from 'next/script';
import Images from '../components/AskHapi/Images.component';

export default function MintNFT() {
    return (<>
            <Images redshift="true" dream="true" depth="true" flat="true" mint="true" />
            <Script src="https://one.relayx.io/relayone.js " />
            <Script src="https://unpkg.com/bsv@1.5.6" />
            </>);
    }
