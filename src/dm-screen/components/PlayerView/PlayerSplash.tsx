import {
    Adventure
  } from '@core/types';
//   import { 
//     Container,
//     Grid,
//     GridRow,
//     Item,
//     Modal
//   } from '@designSystem/components';

type PlayerSplashProps = {
    adventure: Adventure
}
  
export const PlayerSplash = ({adventure}: PlayerSplashProps) => {
    return (
        <div>hi {adventure.name}</div>
    )
};