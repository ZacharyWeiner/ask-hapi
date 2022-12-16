import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Button, Center, Image, Text } from '@mantine/core';

export default function MintImage({ imageUrl, imageName, prompt }) {
    const deployEndpoint = 'api/run/deploy_contract';
    const mintEndpoint = 'api/run/mint_nft';
    const [title, setTitle] = useState('NFT FROM ASKHAPI.com');
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
        // eslint-disable-next-line no-undef
        const w = window;
        const { address, paymail, error } = await login();
        if (error) {
            alert('there was an error logging in');
            console.log(error);
            return;
        }
        const mintClassRequestBody = {
            type: 'NFT',
            symbol: 'HAPI',
            owner: address, //ASK_HAPI_TEST
            name: title,
            description: prompt,
            options: {
              numbered: false,
              image: {
                name: imageName,
                size: 10,
              },
            },
          };
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
        console.log('recieves response from send:', sendResponse);
        const _location = `${sendResponse.txid}_o2`;
        console.log({ _location });
        const mintBody = { owner: address, amount: 1, location: _location };
        console.log({ mintBody });
        try {
            const mintTxResponse = await axios.post(`https://staging-backend.relayx.com/${mintEndpoint}`, mintBody);
            console.log(mintTxResponse.data.data.rawtx);
            const mintResponse =
                    await w.relayone.send(mintTxResponse.data.data.rawtx.toString());
                    console.log(mintResponse);
        } catch (err) { console.log(err); }
    }
    return (
            <div>
                <Center>
                  <Text> {title} </Text>
                </Center>
                <Center>
                    <Image src={imageUrl} height="100%" width="100%" radius="xl" style={{ maxHeight: '500px', maxWidth: '500px' }} />
                </Center>
                <Center style={{ margin: '12px' }}>
                    <Button type="button" onClick={mintClass}> Mint This On Relay!</Button>
                </Center>
            </div>
        );
}
