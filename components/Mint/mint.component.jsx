import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Anchor, Button, Flex, Center, Image, Text } from '@mantine/core';

export default function MintImage({ imageUrl, imageName, prompt, close }) {
    const deployEndpoint = 'api/run/deploy_contract';
    const mintEndpoint = 'api/run/mint_nft';
    const [title, setTitle] = useState('NFT FROM ASKHAPI.com');
    const [loading, setLoading] = useState('');
    const [status, setStatus] = useState('');
    const [classTxid, setClassTxid] = useState('');
    const [imageTxid, setImageTxid] = useState('');
    const [error, setError] = useState('');
    console.log(imageName);

     function _bufferToAsm(b, type, name) {
        const script = [
          '0',
          'OP_RETURN',
          Buffer.from('19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut').toString('hex'),
          b.toString('hex'),
          Buffer.from(type).toString('hex'),
          Buffer.from('binary').toString('hex'),
          Buffer.from(name).toString('hex'),
        ];
        return script.filter(Boolean).join(' ');
      }

    async function getFileBuffer(url) {
        const axiosResponse = await axios.get(url, {
          responseType: 'arraybuffer',
        });
        console.log('Axios Get Response', axiosResponse);
        return Buffer.from(axiosResponse.data, 'base64');
    }

     async function fileToAsm(url, name) {
        const result = await getFileBuffer(url);
        console.log('fileToASM result:', result);
        const script = _bufferToAsm(Buffer.from(result), 'image/png', name);
        console.log('Result of Bufer to scrypt:', script);
        return script;
    }
    async function login() {
        try {
            // eslint-disable-next-line no-undef
            const w = window;
            const token = await w.relayone.authBeta();
            const [payload, signature] = token.split('.');
            const data = JSON.parse(atob(payload)); // Buffer.from(payload, 'base64')
            console.log('Relay Payment Info:', data);
            console.log(data.paymail);
            const addressResponse = await axios.get(`https://api.relayx.io/v1/paymail/run/${data.paymail}`);
            const address = addressResponse.data.data;
            console.log(address);
            return { address, paymail: data.paymail };
        } catch (error) {
            return { error };
        }
    }
    async function mintClass() {
        setLoading(true);
        // eslint-disable-next-line no-undef
        setStatus('Checking Account ...');
        const w = window;
        const { address, paymail, error } = await login();
        if (error) {
            alert('There was an error logging in. Try using Chrome or Safari');
            console.log(error);
            setLoading(false);
            return;
        }
        setStatus('Preparing For Mint ...');
        const mintClassRequestBody = {
            type: 'NFT',
            symbol: 'HAPI',
            owner: address, //ASK_HAPI_TEST
            name: title,
            description: prompt,
            options: {
              numbered: true,
              image: {
                name: imageName,
                size: 10,
              },
            },
          };
        try {
          setStatus('Minting Class...');
          //First get the contract transaction template;
          const response = await axios.post(`https://staging-backend.relayx.com/${deployEndpoint}`, mintClassRequestBody);
          console.log('Gets a raw transaction:', response.data);

          //Then get the image Buffer to append to TX
          const fileASM = await fileToAsm(imageUrl, imageName);
          const asScript = w.bsv.Script.fromASM(fileASM);
          const bsvtx = new w.bsv.Transaction(response.data.data.rawtx);
          console.log('Empty TX', bsvtx);
          const output = new w.bsv.Transaction.Output({
              satoshis: '1',
              script: asScript,
            });
            console.log(output);
          bsvtx.outputs[0] = output;

          //Broadcast the Returned TX
          const sendResponse = await w.relayone.send(bsvtx.toString());
          setClassTxid(sendResponse.txid);
          console.log('recieves response from send:', sendResponse);
          setStatus('Minting Class Complete ...');
          const _location = `${sendResponse.txid}_o2`;
          console.log({ _location });
          const mintBody = { owner: address, amount: 1, location: _location };
          console.log({ mintBody });
          setStatus('Minting NFT ...');
          const mintTxResponse = await axios.post(`https://staging-backend.relayx.com/${mintEndpoint}`, mintBody);
          console.log(mintTxResponse.data.data.rawtx);
          const mintResponse =
                  await w.relayone.send(mintTxResponse.data.data.rawtx.toString());
          console.log(mintResponse);
          setImageTxid(mintResponse.txid);
          setStatus('success');
        } catch (err) { setError(err.message); console.log(err); setStatus('Failed :*|'); }
    }
    return (
            <div>
                <Center>
                  <Text size="xl" padding="md"> {title} </Text>
                </Center>
                <Center>
                    <Image src={imageUrl} height="100%" width="100%" radius="xl" style={{ maxHeight: '420px', maxWidth: '420px' }} />
                </Center>
                <Center style={{ margin: '12px' }}><Text color="red" size="xs">You must be logged into Relay to mint. </Text></Center>
                <Center style={{ margin: '12px' }}>
                  <div>
                    { (status !== 'success') && (<Button type="button" variant="outline" onClick={mintClass} style={{ width: '100%' }}> {loading ? status : 'Mint This On Relay!'} </Button>)}
                    { (status === 'success') && (<div> <Button type="button" variant="outline" onClick={close} style={{ width: '100%' }}> Close </Button></div>)}
                    { (status === 'success') && (<div style={{ marginTop: '16px' }}> <Anchor width="100%" type="button" href={`https://www.relayx.com/assets/${classTxid}_o2/${imageTxid}_o2`} target="_blank" rel="noreferrer"> <Button> View This On Relay!  </Button></Anchor></div>)}
                  </div>
                </Center>
                <Text> {error}</Text>
            </div>
        );
}
