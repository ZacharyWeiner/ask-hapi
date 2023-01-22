import Script from 'next/script';

export default function ARComponent() {
    return (

    <div>
    <Script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js" strategy="beforeInteractive" />
    HI
    <a-scene embedded arjs>
    <a-marker preset="hiro">
      <a-entity id="dalle-image" scale="0.1 0.1 0.1" />
    </a-marker>
    <a-entity camera />
    </a-scene>
    </div>);
}
