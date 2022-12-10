import Script from 'next/script';
import { createStyles, keyframes, Center, Button, Image, Container, Text, Textarea } from '@mantine/core';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Welcome from './../Welcome/Welcome'
import { IconArrowBack } from '@tabler/icons';

export const bounce = keyframes({
  'from, 20%, 53%, 80%, to': { transform: 'translate3d(0, 0, 0)' },
  '40%, 43%': { transform: 'translate3d(0, -30px, 0)' },
  '70%': { transform: 'translate3d(0, -15px, 0)' },
  '90%': { transform: 'translate3d(0, -4px, 0)' },
});

const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },

    content: {
      maxWidth: 480,
      marginRight: 'auto',
      marginLeft: 'auto',

      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },

    results: {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      borderRadius: theme.radius.lg,
      padding: '4px 12px',
      maxWidth: '100%',
      flex: 1,
      flexWrap: 'wrap',
      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },

    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 48,
      lineHeight: 1.2,
      fontWeight: 900,

      [theme.fn.smallerThan('xs')]: {
        fontSize: 28,
      },
    },

    control: {
      [theme.fn.smallerThan('xs')]: {
        flex: 1,
      },
    },

    image: {
      flex: 1,
      [theme.fn.smallerThan('md')]: {

      },
    },
    imageBounce: {
      flex: 1,
      animation: `${bounce} 3s ease-in-out infinite`,
      [theme.fn.smallerThan('md')]: {

      },
    },

    imageContainer: {
        height: '150px',
        width: '150px',
    },

    highlight: {
      position: 'relative',
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      borderRadius: theme.radius.lg,
      padding: '4px 12px',
      whiteSpace: 'pre',
    },
  }));

export default function NFTDat() {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    const [userInput, setUserInput] = useState('Create a list of 5 reasons to love TV');
    const [prompt, setPrompt] = useState();
    const [dataFinishReason, setDataFinishReason] = useState();
    const [hasTwechWallet, setHasTwetchWallet] = useState(false);
    const [hasSensiletWallet, setHasSensiletWallet] = useState(false);
    const [relayPaymail, setRelayPaymail] = useState('');
    const [prediction, setPrediction] = useState([]);
    const [error, setError] = useState(null);
    // eslint-disable-next-line no-promise-executor-return
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
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
    function resetPrompt() {
      setPrompt('');
      setResult('');
    }
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
              sats: 100000,
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
              amount: 100000,
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
      console.log(w);
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
          alert('could not log in.', err);
        }
      }
      try {
        const response = await w.relayone.send({ to: '1EhuKT23ctLrmiyfVqF6Bsqyh8vxnYqWbY', amount: 0.04, currency: 'USD' });
        console.log('Relay Payment Response', response);
        paid = true;
      } catch (error) {
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

    function onTextChanged(e) {
        setUserInput(e.target.value);
    }
    async function generateResponse(event) {
        event.preventDefault();
        setLoading(true);
        let paid = false;
        paid = await pay();
        if (paid === false) { return; }
        try {
          const response = await fetch('/api/generateImageSD', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: userInput,
            }),
          });
          const data = await response.json();
          console.log('Completion Data @ Client: ', data);
        } catch (err) {
          console.log('Error Generating A Response:', err);
          alert('Error Generating A Response:', err);
        }
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userInput,
        }),
      });
      let _prediction = await response.json();
      console.log(_prediction);
      if (response.status !== 201) {
        setError(_prediction.detail);
        return;
      }
      setPrediction(prediction);
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
        setPrediction(_prediction);
      }
      setLoading(false);
    }

    // async function generateNFT() {
    //   const response = await fetch('/api/generateNFT', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       prompt: userInput,
    //     }),
    //   });
    //   return response;
    // }
    return (
        <div>
          <Welcome subtext="Describe the Picture in as much detail as possible" />
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className={classes.imageContainer}>
                            {loading
                                ? <Image className={classes.imageBounce} src="/hapi-error.png" loading="lazy" />
                                : <Image className={classes.image} src="/hapi-neutral.png" loading="lazy" />
                            }
                        </div>
                    </div>
                </div>
                <Center>
                  <Button
                    component="a"
                    href="/"
                    leftIcon={<IconArrowBack size={18} />}
                    styles={(theme) => ({
                                        root: {
                                        backgroundColor: '#00acee',
                                        border: 0,
                                        height: 42,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        marginLeft: 12,
                                        marginTop: 12,

                                        '&:hover': {
                                            backgroundColor: theme.fn.darken('#00acee', 0.05),
                                        },
                                        },

                                        leftIcon: {
                                        marginRight: 15,
                                        },
                                    })}
                  >
                                    Home
                  </Button>
                </Center>
                <div>
                  <Textarea
                    onChange={onTextChanged}
                    placeholder="What can I do for you, my human overlord?"
                    label="Ask HAPI to create anything"
                    withAsterisk
                  />
                  <div>
                      <Center>
                          <div style={{ margin: '12px' }}>
                              <Button variant="gradient" onClick={generateResponse}>Make Picture 4¢</Button>
                          </div>
                      </Center>
                  </div>
                </div>
                {/* {
                  (result?.length < 1)
                  ? ''
                  : <Center>
                        {result.map((item:any) => (<Image
                          src={item.url}
                          style={{ maxHeight: 256, maxWidth: 256 }}
                        />))}
                    </Center>
                } */}
                      {error && <div>{error}</div>}

                    {prediction && (
                      <div>
                        <p>{prediction.status === 'succeeded' ? '' : prediction.status }</p>
                        {prediction.output && (
                          <Center>
                            <Image
                              src={prediction.output[prediction.output.length - 1]}
                              alt="output"
                              width={500}
                              height={500}
                            />
                          </Center>
                        )}
                      </div>
                    )}
                {/* {
                  (!prediction)
                  ? ''
                  : <Center>
                      { dataFinishReason !== 'stop'
                      ? <div style={{ margin: '12px' }}>
                            <Button variant="gradient" onClick={generateNFT}>Make NFT</Button>
                        </div>
                        : ''
                      }
                      <div style={{ margin: '12px' }}>
                          <Button variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} onClick={resetPrompt}>Reset</Button>
                      </div>
                    </Center>
                } */}

            </Container>
            <Script src="https://one.relayx.io/relayone.js " strategy="lazyOnload" />
        </div>
    );
}
