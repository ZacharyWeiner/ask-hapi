import { Badge, Center } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function WalletDetection() {
    const [hasTwechWallet, setHasTwetchWallet] = useState(false);
    const [hasSensiletWallet, setHasSensiletWallet] = useState(false);
    const [relayPaymail, setRelayPaymail] = useState('');

    useEffect(() => {
        // eslint-disable-next-line no-undef
        const w = window;
        console.log({ w });
        if ('bitcoin' in w) {
          console.log('Bitcoin is in the HOUSE!');
          const provider = w.bitcoin;
          if (provider.isTwetch) {
            console.log('TWETCH is in the HOUSE!');
            setHasTwetchWallet(true);
          }
        }
        //window.open("https://twetch.com/downloads", "_blank");
      }, []);

      useEffect(() => {
        // eslint-disable-next-line no-undef
        const w = window;
        if ('phantom' in w) {
          const provider = w.phantom?.solana;
          console.log('SOLANA is in the HOUSE!');
          if (provider?.isPhantom) {
            console.log('PHANTOM is in the HOUSE!');
          }
        }

        // window.open('https://phantom.app/', '_blank');
      }, []);

      useEffect(() => {
        // eslint-disable-next-line no-undef
        const w = window;
        if ('sensilet' in w) {
          const provider = w.sensilet;
          console.log('SENSILET is in the HOUSE!', provider);
          setHasSensiletWallet(true);
        }

        // window.open('https://chrome.google.com/webstore/detail/sensilet/aadkcfdlmiddiiibdnhfbpbmfcaoknkm', '_blank');
      }, []);
    return (
        <Center style={{ marginTop: '4px' }}>
         {!hasTwechWallet ? '' : <Badge style={{ margin: '4px' }} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Twetch Wallet √</Badge>}
         {!hasSensiletWallet ? '' : <Badge style={{ margin: '4px' }} variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>Sensilet √</Badge>}
         {(relayPaymail !== '') ? '' : <Badge style={{ margin: '4px' }} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>RelayX √</Badge>}
        </Center>
    );
}
