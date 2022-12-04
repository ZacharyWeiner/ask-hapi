import Script from 'next/script';
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
//import { HeroBullets } from '../components/HeroWithBullets/HeroWithBullets.component';
import AskHapi from '../components/AskHapi/AskHapi.component';
import WalletDetection from '../components/WalletDetection/WalletDetection.component';

export default function HomePage() {
  return (
    <div>
      <ColorSchemeToggle />
      <WalletDetection />
      <Welcome />
      <AskHapi />
      <Script src="https://one.relayx.io/relayone.js " strategy="lazyOnload" />
    </div>
  );
}
