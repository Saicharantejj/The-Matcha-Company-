import latteStrawberry from '../assets/latte-strawberry.jpg'
import latteBlueberry from '../assets/latte-blueberry.jpg'
import latteMango from '../assets/latte-mango.jpg'
import latteUbe from '../assets/latte-ube.jpg'
import latteVanilla from '../assets/latte-vanilla.jpg'
import powderTexture from '../assets/matcha-powder-texture.jpg'
import layersMacro from '../assets/layers-macro.jpg'
import glassesOverhead from '../assets/glasses-overhead.jpg'
import counterKit from '../assets/counter-kit.jpg'
import toolsGreenWood from '../assets/tools-green-wood.jpg'
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
 *
 * Products and kits name their picture with a `photo` key that is looked up in
 * here (see FlavorPlate), which is how all five flavours are photographed as
 * the drink you would actually make rather than as the packet. A key with no
 * entry falls back to the drawn sachet, so a sixth flavour would not open a
 * hole in the page while it waited for a photographer.
 */
export const photos = {
  powderTexture: {
    src: powderTexture,
    width: 1154,
    height: 614,
    alt: '',
    decorative: true,
  },
  latteStrawberry: {
    src: latteStrawberry,
    width: 752,
    height: 768,
    alt: 'A tall glass of iced strawberry matcha in green, white and red layers, whole strawberries beside it',
  },
  latteBlueberry: {
    src: latteBlueberry,
    width: 576,
    height: 762,
    alt: 'An iced blueberry matcha latte layered over blueberry compote, a bottle of milk beside it',
  },
  latteMango: {
    src: latteMango,
    width: 444,
    height: 620,
    alt: 'An iced mango matcha latte over mango puree on a wooden board, with matcha cake behind it',
  },
  latteUbe: {
    src: latteUbe,
    width: 522,
    height: 652,
    alt: 'An iced ube matcha latte, purple over green, dusted with matcha powder',
  },
  latteVanilla: {
    src: latteVanilla,
    width: 470,
    height: 636,
    alt: 'An iced vanilla matcha in a tall glass with a vanilla pod resting across the rim',
  },
  layersMacro: {
    src: layersMacro,
    width: 760,
    height: 1008,
    alt: 'A close view through the side of a glass: matcha settling down through milk into crushed strawberry',
  },
  glassesOverhead: {
    src: glassesOverhead,
    width: 784,
    height: 778,
    alt: 'Half a dozen glasses of freshly whisked matcha seen from directly above on a pink counter',
  },
  counterKit: {
    src: counterKit,
    width: 446,
    height: 788,
    alt: 'A kitchen counter mid-make: a tin of matcha, a sifter, a whisk resting in a bowl and a finished iced glass',
  },
  toolsGreenWood: {
    src: toolsGreenWood,
    width: 784,
    height: 776,
    alt: 'Bowls of whisked matcha, a bamboo whisk, a scoop and loose powder arranged on weathered green wood',
  },
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
