import Script from 'next/script';
import MintComponent from '../components/Mint/mint.component';

export default function MintNFT() {
    return (
        <div>
            <MintComponent />
            <Script src="https://one.relayx.io/relayone.js " />
            <Script src="https://unpkg.com/bsv@1.5.6" />
        </div>
    );
}
