import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
//import { HeroBullets } from '../components/HeroWithBullets/HeroWithBullets.component';
import AskHapi from '../components/AskHapi/AskHapi.component';

export default function HomePage() {
  return (
    <div>
      <ColorSchemeToggle />
      <Welcome />
      <AskHapi />
    </div>
  );
}
