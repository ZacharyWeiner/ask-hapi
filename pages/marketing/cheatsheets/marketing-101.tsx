import Script from 'next/script';
import CheatSheet101 from '../../../components/Marketing/Cheatsheet101';

export default function Marketing101() {
    return (
   <div>
        <CheatSheet101 />
        <Script src="https://one.relayx.io/relayone.js " />
        <Script src="https://unpkg.com/bsv@1.5.6" />
   </div>
    );
}
