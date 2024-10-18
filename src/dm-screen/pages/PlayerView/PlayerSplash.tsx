
import {
  Adventure
} from '@core/types';

import './PlayerSplash.css';

type PlayerSplashProps = {
  adventure: Adventure
}

function randomSplashImage() {
  const luckyNumber = Math.floor(Math.random() * 4);

  switch(luckyNumber) {
    case 0:
      return '/splash-screens/castle.jpeg'
    case 1:
      return '/splash-screens/dice.jpg'
    case 2:
      return '/splash-screens/dragon.jpeg'
    case 3:
      return '/splash-screens/armor.jpeg'
    case 4:
      return '/splash-screens/tavern.jpeg'
    default:
      return '/splash-screens/dice.jpg'
  }
}
  
export const PlayerSplash = ({
  adventure
}: PlayerSplashProps) => {
  const bgImg = adventure.splashImgSrc || randomSplashImage();

  return (
    <div
      className="dm-screen-design-system-splash"
      style={{backgroundImage: 'url(' + bgImg + ')'}}>
      <header>
        <h1 className="dm-screen-design-system-splash-title">
          {adventure.name}
        </h1>
      </header>
    </div>
  );
};