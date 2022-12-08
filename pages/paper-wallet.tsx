import { useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@mantine/core';
import { ExplainationHeader } from '../components/PaperWallet/Header/ExplanationHeader.component';
import WalletsList from '../components/PaperWallet/card-list/card-list.component';

declare const window: any;
export default function PaperWallet() {
    const [accounts, setAccounts] = useState([]);
    function createKeys() {
        // const mnemonic = new window.bsvMnemonic(window.bsvMnemonic.Words.ENGLISH);
        // console.log({ mnemonic });
        // // eslint-disable-next-line new-cap
        // const hd = new window.bsvMnemonic(mnemonic.toString()).toHDPrivateKey();
        // console.log(hd);

        for (let x = 0; x < 10; x++) {
            // let path = `m/44'/0'/1'/${x}/0`;
            // const derivedChild = hd.deriveChild(path).privateKey.toString();
            //console.log(path, derivedChild);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { bsv } = window;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { nimble } = window;
            const privateKey = nimble.PrivateKey.fromRandom();
            const account = { pk: privateKey.toString(),
                            pubKey: privateKey.toPublicKey().toString(),
                            address: privateKey.toAddress().toString(),
                        };
            console.log(account);
            setAccounts((arr: any) => [...arr, account]);
        }
    }

    //     const runOwner = hd.deriveChild("m/44'/666'/0'/2/0").privateKey.toString();
    //     const runPurse = hd.deriveChild("m/44'/236'/9999'/1/0").privateKey.toString();
    //     console.log({ runOwner, runPurse });
    // //     const run = new window.Run({
    // //       trust: '*',
    // //       timeout: 1000000,
    // //       purse: runPurse,
    // //       owner: runPurse,
    // //       splits: 4,
    // //   });
    //   console.log(run.purse.address);

    return (<>
                <Link href="/"> &lt; Back </Link>
                <ExplainationHeader onClickHandler={createKeys} />
                <WalletsList accounts={accounts} />
                <Script src="https://unpkg.com/bsv@1.5.6" />
                <Script src="https://unpkg.com/bsv@1.5.6/bsv-message.min.js" />
                <Script src="https://unpkg.com/bsv@1.5.6/bsv-mnemonic.min.js" />
                <Script src="https://unpkg.com/@runonbitcoin/nimble" />
                {/* <Script src="https://unpkg.com/bsv@1.5.6/bsv-crypto.min.js" /> */}
                <Script src="https://unpkg.com/run-sdk" />
                {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js" /> */}
            </>);
}
