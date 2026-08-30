import bowlsFlatlay from '../assets/matcha-bowls-flatlay.jpg'
import cupBlossoms from '../assets/matcha-cup-blossoms.jpg'
import trayTatami from '../assets/matcha-tray-tatami.jpg'

/**
 * The photography.
 *
 * Three real photographs, held in one place so a page asks for a picture by
 * what is in it rather than by filename, and so alt text is written once and
 * cannot drift between the places an image is used. Intrinsic dimensions are
 * carried alongside so every <img> can reserve its own space and the page does
 * not jump as the photographs load.
 */
export const photos = {
  bowlsFlatlay: {
    src: bowlsFlatlay,
    width: 1030,
    height: 684,
    alt: 'Stone-ground matcha powder, a whisked bowl and a bamboo whisk laid out on dark wood',
  },
  cupBlossoms: {
    src: cupBlossoms,
    width: 985,
    height: 585,
    alt: 'A scoop of matcha powder held in a cup under a branch of cherry blossom',
  },
  trayTatami: {
    src: trayTatami,
    width: 1064,
    height: 600,
    alt: 'A bowl of whisked matcha on a lacquered tray with a whisk and scoop, set on tatami',
  },
}
