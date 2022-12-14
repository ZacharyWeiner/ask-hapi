import Script from 'next/script';
import MintComponent from '../components/Mint/mint.component';

export default function MintNFT() {
    return (
        <div>
            <MintComponent
              imageUrl="https://replicate.delivery/pbxt/m5E30152UmZLHRRwwHS9pj886uf4qryIo6uT3TuVJu4Ze3JQA/out-0.png"
              imageName="out-0.png"
              prompt="man with curly hair crying"
            />
            <Script src="https://one.relayx.io/relayone.js " />
            <Script src="https://unpkg.com/bsv@1.5.6" />
        </div>
    );
}
