import axios from 'axios';
import * as React from 'react';

export default function MintImage() {
    const deployEndpoint = 'api/run/deploy_contract';
    const mintEndpoint = 'api/run/mint_nft';
    //const imageUrl = 'https://replicate.delivery/pbxt/xpYAWPkDK64cC1d4StdLQtfk9GfGmYpNF0aA1BzxW7FYf1SgA/out-0.png';
    const imageUrl = 'https://replicate.delivery/pbxt/nIJxuyTp2aKPPpU2BfB1ew8uvi7g6cf27UOce5JaSfjleWaCE/out-0.png';
    const imageName = 'out-0.png';//`${imageUrl.split('/')[4]}.png`;
    console.log(imageName);
    const mintClassRequestBody = {
        type: 'NFT',
        symbol: 'HAPI',
        owner: '18YBehYD6hQGdLeWd8QcoHnFGUXh2g6csJ', //ASK_HAPI_TEST
        name: 'NFT FROM ASKHAPI.com',
        description: 'GoldBars with Bitcoin Logo',
        options: {
          numbered: false,
          image: {
            name: imageName,
            size: 10,
          },
        },
      };

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
            const token = await window.relayone.authBeta();
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
                <button type="button" onClick={mintClass}> Mint Class</button>
                <button type="button" onClick={login}> Login</button>
            </div>
        );
}
