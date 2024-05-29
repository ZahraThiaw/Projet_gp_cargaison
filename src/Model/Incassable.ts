import { Materiel } from './Materiel.js';
import { Cargaison } from './Cargaison.js';

export class Incassable extends Materiel {
  // info() {
  //   console.log(`Incassable: ${this.libelle}, ${this.poids}kg`);
  // }

  info(cargaison: Cargaison): void {
    const frais = cargaison.calculerFrais(this);
    console.log(`Incassable: ${this.libelle}, ${this.poids}kg, Frais de transport: ${frais}F`);
  }
}
