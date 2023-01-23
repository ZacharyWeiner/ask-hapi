import Script from 'next/script';
import { createStyles, keyframes, Center, Button, Image, Container, Text, Textarea, Paper, Flex, Modal } from '@mantine/core';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { IconArrowBack, IconBrandTwitter, IconPhoto, IconArrowsShuffle2 } from '@tabler/icons';
import Welcome from '../Welcome/Welcome';
import MintModal from '../Mint/mintModal.component';

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

export default function NFTDat(props) {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    const [userInput, setUserInput] = useState('Monkey');
    const [prompt, setPrompt] = useState();
    const [dataFinishReason, setDataFinishReason] = useState();
    const [hasTwechWallet, setHasTwetchWallet] = useState(false);
    const [hasSensiletWallet, setHasSensiletWallet] = useState(false);
    const [relayPaymail, setRelayPaymail] = useState('');
    const [prediction, setPrediction] = useState([]);
    const [upscale, setUpscale] = useState([]);
    const [error, setError] = useState(null);
    const [model, setModel] = useState('');
    const [satsFee, setSatsFee] = useState(100000);
    const [satsFeeBase, setSatsFeeBase] = useState(100000);
    const [previousImages, setPreviousImages] = useState([]);
    const [socialFragment, setSocialFragment] = useState('');
    const [mintModalOpen, setMintModalOpen] = useState(false);
    const [drawer, setDrawer] = useState();
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [errorModalOpened, setErrorModalOpened] = useState(false);
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
    async function payWithTwetch(sats) {
      // eslint-disable-next-line no-undef
      const w = window;
      try {
        const resp = await w.bitcoin.connect();
        console.log('Twetch PubKey: ', resp.publicKey.toString());
        console.log('Twetch Paymail: ', resp.paymail.toString());
      } catch (err) {
        // eslint-disable-next-line no-alert
        setError(`${err.message}`);
        setErrorModalOpened(true);
      }
      let paymentResponse;
      try {
         paymentResponse = await w.twetch.abi({
            contract: 'payment',
            outputs: [{
              to: '16015@twetch.me',
              sats,
            }],
          });
      } catch (err) {
        console.log('Twetch Payment Response Error ', err.action);
        return false;
      }
      console.log(paymentResponse.actionId);
      return true;
    }
    async function payWithSensilet(sats) {
      // eslint-disable-next-line no-undef
      const w = window;
      try {
        const resp = await w.sensilet.requestAccount();
        console.log('Sensilet Address:', resp.address);
      } catch (err) {
        // eslint-disable-next-line no-alert
        setError(`${err.message}`);
        setErrorModalOpened(true);
      }
      let paymentResponse;
      try {
         paymentResponse = await w.sensilet.transferBsv({
          receivers: [
            {
              address: '1EhuKT23ctLrmiyfVqF6Bsqyh8vxnYqWbY',
              amount: sats,
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
    async function payWithRelay(sats) {
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
          // eslint-disable-next-line no-alerts
          setError(`${err.message} Could not log in. Please Try Chrome or Safari`);
          setErrorModalOpened(true);
        }
      }
      try {
        const response = await w.relayone.send({ to: '1EhuKT23ctLrmiyfVqF6Bsqyh8vxnYqWbY', amount: (sats / 100000000), currency: 'BSV' });
        console.log('Relay Payment Response', response);
        paid = true;
      } catch (_error) {
        setError(_error.message);
        setErrorModalOpened(true);
        paid = false;
      }
      return paid;
    }
    async function pay(sats) {
      // eslint-disable-next-line no-undef
      const w = window;
      let paid = false;
      const isTwetchInstalled = w.bitcoin && w.bitcoin.isTwetch;
      //const isPhantomInstalled = window.phantom?.solana?.isPhantom;
      //const isSensiletInstalled = (w.sensilet);

      if (isTwetchInstalled) { paid = await payWithTwetch(sats); }
      //else if (isPhantomInstalled) { paid = await payWithPhantom(); }
      else if (hasSensiletWallet) {
        paid = payWithSensilet(sats);
      } else { paid = payWithRelay(sats); }
      return paid;
    }
    function onTextChanged(e) {
        setUserInput(e.target.value);
    }
    async function generateResponse(_model, sats, _drawer, _variationBaseUrl) {
        setLoading(true);
        let paid = true;
        console.log({ _drawer }, { _model });
        paid = await pay(sats);
        if (paid === false) { return; }
        let _body;
        if (_drawer) {
          _body = JSON.stringify({
            prompt: userInput,
            version: _model,
            drawer: _drawer,
          });
        } else if (_variationBaseUrl) {
          _body = JSON.stringify({
            prompt: userInput,
            version: _model,
            inputImage: _variationBaseUrl,
          });
        } else {
          _body = JSON.stringify({
            prompt: userInput,
            version: _model,
          });
        }
        try {
          const response = await fetch('/api/predictions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: _body,
          });
          let _prediction = await response.json();
          console.log(_prediction);
          if (response.status !== 201) {
            setError(_prediction.detail);
            return;
          }
          setPrediction(_prediction);
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
            console.log(_prediction);
            if (response.status !== 200) {
              setError(_prediction.detail);
              return;
            }
            setPrediction(_prediction);
          }
          if (_prediction.status === 'succeeded') {
            const _temp = new Array(...previousImages);
            const _url = _prediction.output[_prediction.output.length - 1];
            setSelectedImageUrl(_url);
            console.log({ _url });
            _temp.push(_url);
            const _socialFragment = _url.replace('https://replicate.delivery/pbxt/', '');
            //_socialFragment = _socialFragment.replace('/out-0.png', '');
            console.log({ _socialFragment });
            setSocialFragment(_socialFragment);
            setPreviousImages(_temp);
          }
          setLoading(false);
        } catch (err) {
          console.log('Error Generating A Response:', err);
          setError(err.message);
          setErrorModalOpened(true);
        }
    }
    async function generateAIUpgrade() {
      setLoading(true);
      let paid = false;
      paid = await pay();
      if (paid === false) { return; }
      try {
        const response = await fetch('/api/predictions/upscale', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrl: prediction.output[prediction.output.length - 1],
            scale: 8,
            face: false,
          }),
        });
        let _prediction = await response.json();
        console.log(_prediction);
        if (response.status !== 201) {
          setError(_prediction.detail);
          return;
        }
        setUpscale(prediction);
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
        setLoading(false);
      } catch (err) {
        console.log('Error Generating A Response:', err);
        alert('Error Generating A Response:', err);
      }
  }
    function calculateSatsFee(modelId) {
      if (modelId === '6359a0cab3ca6e4d3320c33d79096161208e9024d174b2311e5a21b6c7e1131c') {
        return satsFeeBase;
      }
      if (modelId === '3554d9e699e09693d3fa334a79c58be9a405dd021d3e11281256d53185868912') {
        return satsFeeBase;
      }
      if (modelId === 'b78a34f0ec6d21d22ae3b10afd52b219cec65f63362e69e81e4dce07a8154ef8') {
        return satsFeeBase * 3;
      }
      return satsFeeBase;
    }
    async function generateStableDiffusion() {
      setModel('7a4ee1531fc9b0f8a094692b7b38851a23385df662aa958a0a65a731fcc355bc');
      setSatsFee(calculateSatsFee());
      await generateResponse('7a4ee1531fc9b0f8a094692b7b38851a23385df662aa958a0a65a731fcc355bc', satsFeeBase);
    }
    async function generateOpenJourney() {
      setModel('9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb');
      setSatsFee(calculateSatsFee());
      await generateResponse('9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb', satsFeeBase * 1.5);
    }
    async function generateRedshift() {
      setModel('b78a34f0ec6d21d22ae3b10afd52b219cec65f63362e69e81e4dce07a8154ef8');
      setSatsFee(200000);
      await generateResponse('b78a34f0ec6d21d22ae3b10afd52b219cec65f63362e69e81e4dce07a8154ef8', 200000);
    }
    async function generatePokemon() {
      setModel('3554d9e699e09693d3fa334a79c58be9a405dd021d3e11281256d53185868912');
      setSatsFee(calculateSatsFee());
      await generateResponse('3554d9e699e09693d3fa334a79c58be9a405dd021d3e11281256d53185868912', satsFeeBase);
    }
    async function generatePixelArt() {
      setDrawer('pixel');
      setModel('5c347a4bfa1d4523a58ae614c2194e15f2ae682b57e3797a5bb468920aa70ebf');
      setSatsFee(1000000);
      await generateResponse('5c347a4bfa1d4523a58ae614c2194e15f2ae682b57e3797a5bb468920aa70ebf', 1000000, 'pixel');
    }
    async function generateArcane() {
      setModel('a8cd5deb8f36f64f267aa7ed57fce5fc7e1761996f0d81eadd43b3ec99949b70');
      setSatsFee(100000);
      await generateResponse('a8cd5deb8f36f64f267aa7ed57fce5fc7e1761996f0d81eadd43b3ec99949b70', 100000);
    }
    async function generateArcher() {
      setModel('5eb8c570de53a4325cb8e05ea591bd32befde542edb84991da4e416c1adeef52');
      setSatsFee(100000);
      await generateResponse('5eb8c570de53a4325cb8e05ea591bd32befde542edb84991da4e416c1adeef52', 100000);
    }
    async function generateWaifu() {
      setModel('f410ed4c6a0c3bf8b76747860b3a3c9e4c8b5a827a16eac9dd5ad9642edce9a2');
      setSatsFee(100000);
      await generateResponse('f410ed4c6a0c3bf8b76747860b3a3c9e4c8b5a827a16eac9dd5ad9642edce9a2', 100000);
    }
    async function generateFunko() {
      setModel('85a9b91c85d1a6d74a045286af193530215cb384e55ec1eaab5611a8e36030f8');
      setSatsFee(100000);
      await generateResponse('85a9b91c85d1a6d74a045286af193530215cb384e55ec1eaab5611a8e36030f8', 100000);
    }
    async function generatePattern() {
      setModel('3b5c0242f8925a4ab6c79b4c51e9b4ce6374e9b07b5e8461d89e692fd0faa449');
      setSatsFee(100000);
      await generateResponse('3b5c0242f8925a4ab6c79b4c51e9b4ce6374e9b07b5e8461d89e692fd0faa449', 100000);
    }
    async function generateVariations() {
      setModel('7c399ba0e1b33ed8ec39ed30eb6b0a2d9e054462543c428c251293034af82a8e');
      setSatsFee(1000000);
      await generateResponse('7c399ba0e1b33ed8ec39ed30eb6b0a2d9e054462543c428c251293034af82a8e', satsFeeBase, null, prediction.output[prediction.output.length - 1]);
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
    function openModal() {
      setMintModalOpen(true);
    }
    function handleClose() {
      setMintModalOpen(false);
    }
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
                 {!loading && (
                  <div>
                      <Center>
                          <Flex
                            gap="md"
                            justify="flex-start"
                            align="flex-start"
                            direction="row"
                            wrap="wrap"
                            style={{ marginTop: '4px' }}
                          >
                              {/* <Button style={{ marginRight: '4px' }} onClick={generatePixelArt}>Make Pixel Art 50¢</Button> */}
                              {props.redshift && (<div style={{ width: '100%' }}>  <Button variant="outline" style={{ width: '100%' }} onClick={generateOpenJourney}>Realistic 6¢</Button> </div>)}
                              {props.dream && (<div style={{ width: '100%' }}>  <Button variant="gradient" style={{ width: '100%' }} onClick={generateStableDiffusion}>Dream 4¢</Button> </div>)}
                              {props.depth && (<div style={{ width: '100%' }}>  <Button variant="outline" style={{ width: '100%' }} onClick={generateArcane}>3D Cartoon 4¢</Button> </div>)}
                              {props.flat && (<div style={{ width: '100%' }}>  <Button variant="gradient" style={{ width: '100%' }} onClick={generateArcher}>Flat Cartoon 5¢</Button> </div>)}
                              {props.waifu && (<div style={{ width: '100%' }}>  <Button variant="gradient" style={{ width: '100%' }} onClick={generateWaifu}>Waifu 4¢</Button> </div>)}
                              {props.funko && (<div style={{ width: '100%' }}>  <Button variant="gradient" style={{ width: '100%' }} onClick={generateFunko}>Funko 4¢</Button> </div>)}
                              {props.pattern && (<div style={{ width: '100%' }}>  <Button variant="gradient" style={{ width: '100%' }} onClick={generatePattern}>Pattern 4¢</Button> </div>)}
                          </Flex>
                      </Center>
                  </div>
                )}
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
                          <div>
                            <Center>
                              <Image
                                src={selectedImageUrl}
                                alt="output"
                                width={420}
                                height={420}
                                radius="lg"
                              />
                            </Center>
                            <Center>
                            <Button
                              component="a"
                              href={`/results?path=${socialFragment}`}
                              target="_blank"
                              variant="outline"
                              leftIcon={<IconPhoto size={18} />}
                              // eslint-disable-next-line max-len
                              styles={(theme) => ({
                                  root: {
                                    border: 0,
                                    height: 42,
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    marginLeft: 6,
                                    marginTop: 6,

                                    '&:hover': {
                                      backgroundColor: theme.fn.darken('#000', 0.05),
                                    },
                                  },

                                  leftIcon: {
                                    marginRight: 15,
                                  },
                                })}
                            >
                                              Larger
                            </Button>
                            <Button
                              onClick={generateVariations}
                              leftIcon={<IconArrowsShuffle2 size={18} />}
                              variant="outline"
                              styles={(theme) => ({
                                root: {
                                  border: 0,
                                  height: 42,
                                  paddingLeft: 8,
                                  paddingRight: 8,
                                  marginLeft: 12,
                                  marginTop: 6,

                                  '&:hover': {
                                    backgroundColor: theme.fn.darken('#000', 0.05),
                                  },
                                },

                                leftIcon: {
                                  marginRight: 15,
                                },
                              })}
                            >
                              Variations
                            </Button>
                              <Button
                                component="a"
                                target="_blank"
                                variant="outline"
                                href={`https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fwww.askhapi.com%2F&text=I%20just%20created%20this%20on%20askhapi.com.%20%0AThanks%20%40ask_hapi%21%0A&url=https://www.askhapi.com/results?path=${socialFragment}`}
                                leftIcon={<IconBrandTwitter size={18} />}
                                styles={(theme) => ({
                                  root: {
                                    border: 0,
                                    height: 42,
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    marginLeft: 6,
                                    marginTop: 6,

                                    '&:hover': {
                                      backgroundColor: theme.fn.darken('#000', 0.05),
                                    },
                                  },

                                  leftIcon: {
                                    marginRight: 15,
                                  },
                                })}
                              >
                                              Share
                              </Button>
                            </Center>
                            <Center>
                            {/* <div> <Button onClick={generateAIUpgrade} variant="gradient"> Upscale</Button></div>
                              <div> <Text> *Upscale will not work on Pokemon</Text> </div> */}
                             {props.mint && (
                              <>
                              <Button
                                onClick={openModal}
                                leftIcon={<IconPhoto size={18} />}
                              // eslint-disable-next-line max-len
                                styles={(theme) => ({
                                  root: {
                                    background: theme.fn.linearGradient(45, 'red', 'blue'),
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
                                              Mint
                              </Button>
                              <MintModal
                                open={mintModalOpen}
                                imageUrl={selectedImageUrl}
                                imageName="Minted With AskHapi.com"
                                prompt={userInput}
                                handleClose={handleClose}
                              />
                              </>)}
                            </Center>
                          </div>
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
                {upscale && (
                  <div>
                    <p>{upscale.status === 'succeeded' ? '' : upscale.status }</p>
                    {upscale.output && (
                      <Center>
                        <Image
                          src={upscale.output}
                          alt="output"
                          width={500}
                          height={500}
                        />
                      </Center>
                    )}
                  </div>
                )}

            </Container>
            <Center shadow="xl" radius="lg" p="md" style={{ overflowX: 'scroll', backgroundColor: 'blue.3' }}>
              {previousImages.map((image) => (
                  <Paper shadow="xs" radius="lg" p="md" key="image">
                    <Image width="250px" height="250px" src={image} radius="lg" />
                    <Center>
                      <Button
                        component="a"
                        target="_blank"
                        variant="outline"
                        href={`/results?path=${image.split('/')[4]}/${image.split('/')[5]}`}
                        leftIcon={<IconPhoto size={18} />}
                      // eslint-disable-next-line max-len
                        styles={(theme) => ({
                          root: {
                            border: 0,
                            height: 22,
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginLeft: 6,
                            marginTop: 6,

                            '&:hover': {
                              backgroundColor: theme.fn.darken('#000', 0.05),
                            },
                          },

                          leftIcon: {
                            marginRight: 15,
                          },
                        })}
                      >
                                      View Large
                      </Button>
                    </Center>
                  </Paper>))}
            </Center>
            <Modal
              opened={errorModalOpened}
              onClose={() => setErrorModalOpened(false)}
              title="Error"
            >
              {error}
            </Modal>
            <Script src="https://one.relayx.io/relayone.js " strategy="lazyOnload" />
        </div>
    );
}
