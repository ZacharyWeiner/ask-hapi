import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button, Center, Image, TextInput, Video } from '@mantine/core';

export default function UpgradeFaceComponent({ onLoadingChanged, endPoint, displayType, satoshis, buttonText, defaultUrl }) {
    const [url, setUrl] = useState('');
    const [hasTwechWallet, setHasTwetchWallet] = useState(false);
    const [hasSensiletWallet, setHasSensiletWallet] = useState(false);
    const [relayPaymail, setRelayPaymail] = useState('');
    const [upscale, setUpscale] = useState([]);
    const [error, setError] = useState(null);
    // eslint-disable-next-line no-promise-executor-return
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    useEffect(() => { setUrl(defaultUrl); }, []);
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
      async function payWithTwetch() {
        // eslint-disable-next-line no-undef
        const w = window;
        try {
          const resp = await w.bitcoin.connect();
          console.log('Twetch PubKey: ', resp.publicKey.toString());
          console.log('Twetch Paymail: ', resp.paymail.toString());
        } catch (err) {
          // eslint-disable-next-line no-alert
          alert(err);
        }
        let paymentResponse;
        try {
           paymentResponse = await w.twetch.abi({
              contract: 'payment',
              outputs: [{
                to: '16015@twetch.me',
                sats: satoshis,
              }],
            });
        } catch (err) {
          console.log('Twetch Payment Response Error ', err.action);
          return false;
        }
        console.log(paymentResponse.actionId);
        return true;
      }
      async function payWithSensilet() {
        // eslint-disable-next-line no-undef
        const w = window;
        try {
          const resp = await w.sensilet.requestAccount();
          console.log('Sensilet Address:', resp.address);
        } catch (err) {
          // eslint-disable-next-line no-alert
          alert(err);
        }
        let paymentResponse;
        try {
           paymentResponse = await w.sensilet.transferBsv({
            receivers: [
              {
                address: '1EhuKT23ctLrmiyfVqF6Bsqyh8vxnYqWbY',
                amount: satoshis,
              },
            ],
          });
        } catch (err) {
          console.log('Sensilet paymnet error:', err.action);
          return false;
        }
        console.log('Sensilet Payment Response', paymentResponse);
        return true;
      }
      async function payWithRelay() {
        // eslint-disable-next-line no-undef
        const w = window;
        let paid = false;
        if (!relayPaymail) {
          try {
            const token = await w.relayone.authBeta();
            const [payload, signature] = token.split('.');
            const data = JSON.parse(atob(payload)); // Buffer.from(payload, 'base64')
            console.log('Relay Payment Info:', data);
            setRelayPaymail(data.paymail);
            // check its token from your origin
            //if (data.origin !== "yourdomain.com") throw new Error();
          } catch (err) {
            // eslint-disable-next-line no-alert
            alert('Could not log in. Please Try Chrome or Safari');
          }
        }
        try {
          const response = await w.relayone.send({ to: '1EhuKT23ctLrmiyfVqF6Bsqyh8vxnYqWbY', amount: (satoshis / 100000000), currency: 'BSV' });
          console.log('Relay Payment Response', response);
          paid = true;
        } catch (err) {
          paid = false;
        }
        return paid;
      }
      async function pay() {
        // eslint-disable-next-line no-undef
        const w = window;
        let paid = false;
        const isTwetchInstalled = w.bitcoin && w.bitcoin.isTwetch;
        //const isPhantomInstalled = window.phantom?.solana?.isPhantom;
        //const isSensiletInstalled = (w.sensilet);

        if (isTwetchInstalled) { paid = await payWithTwetch(); }
        //else if (isPhantomInstalled) { paid = await payWithPhantom(); }
        else if (hasSensiletWallet) { paid = payWithSensilet(); } else { paid = payWithRelay(); }
        return paid;
      }

    async function upgradeFace(props) {
        onLoadingChanged(true);
        let paid = false;
        paid = await pay();
        if (!paid) { return; }
        let _endpoint = endPoint;
        if (!_endpoint || _endpoint === '') { _endpoint = '/api/predictions/upscale'; }
        try {
            const response = await fetch(_endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                imageUrl: url,
                scale: 8,
                face: true,
              }),
            });
            let _prediction = await response.json();
            console.log(_prediction);
            if (response.status !== 201) {
              setError(_prediction.detail);
              return;
            }
            setUpscale(_prediction);
            while (
              _prediction.status !== 'succeeded' &&
              _prediction.status !== 'failed'
            ) {
              // eslint-disable-next-line no-await-in-loop
              await sleep(1000);
              // eslint-disable-next-line @typescript-eslint/no-shadow
              const response = await fetch(`/api/predictions/${_prediction.id}`);
              // eslint-disable-next-line no-await-in-loop
              _prediction = await response.json();
              if (response.status !== 200) {
                setError(_prediction.detail);
                return;
              }
              console.log(_prediction);
              setUpscale(_prediction);
            }
            onLoadingChanged(false);
          } catch (err) {
            console.log('Error Generating A Response:', err);
            alert('Error Generating A Response:', err);
          }
    }

    return (
        <div style={{ width: '100%' }}>
            <TextInput label="Pic Link" description="the url of the image on the web" placeholder="https://www.thestartupfounder.com/wp-content/uploads/2022/07/istockphoto-1199509645-612x612-1.jpg" onChange={e => setUrl(e.target.value)} style={{ width: '100%' }} />
            <Button variant="gradient" style={{ marginRight: '4px' }} onClick={upgradeFace}>{buttonText}</Button>
            <Center>
              <div>
                <Image
                  src={url}
                  alt="output"
                  width={500}
                  height={500}
                />
              </div>
            </Center>
            <Center>
              {upscale && (
                <div>
                  <p>{upscale.status === 'succeeded' ? '' : upscale.status }</p>
                  {upscale.output && displayType === 'image' && (
                      <Image
                        src={upscale.output}
                        alt="output"
                        width={500}
                        height={500}
                      />
                  )}
                  {upscale.output && displayType === 'video' && (
                    <div>
                    <iframe
                      title="agedUp"
                      width="100%"
                      height="100%"
                      allowFullScreen
                      src={upscale.output}
                    />
                    <a href={upscale.output} target="_blank" rel="noreferrer"> View Larger </a>
                    </div>
                  )}
                </div>
              )}
            </Center>
        </div>
    );
}
