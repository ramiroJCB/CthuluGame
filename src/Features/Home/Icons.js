import Elf1 from "../../assets/elf1.svg";
import Elf2 from "../../assets/elf2.svg";
import Elf3 from "../../assets/elf3.svg";
import Human1 from "../../assets/human1.svg";
import Human2 from "../../assets/human2.svg";
import Human3 from "../../assets/human3.svg";
import Ogre1 from "../../assets/ogre1.svg";
import Ogre2 from "../../assets/ogre2.svg";
import Ogre3 from "../../assets/littleOgre3.svg";
import Swords from "../../assets/swords.svg";
import Axe from "../../assets/axes.svg";
import Bow from "../../assets/bow.svg";
import Wand from "../../assets/wand.svg";
import Scepter from "../../assets/scepter.svg";

export const Races = [
  { race: "Elf", characters: [Elf1, Elf2, Elf3] },
  { race: "Ogres", characters: [Ogre1, Ogre2, Ogre3] },
  { race: "Human", characters: [Human1, Human2, Human3] },
];

export const Weapons = {
  Elf: [Swords, Bow],
  Ogres: [Axe, Bow],
  Human: [Wand, Scepter],
};
