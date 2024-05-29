import { Materiel } from './Materiel.js';
import { Cargaison } from './Cargaison.js';

export class Fragile extends Materiel {
  // info() {
  //   console.log(`Fragile: ${this.libelle}, ${this.poids}kg`);
  // }

  info(cargaison: Cargaison): void {
    const frais = cargaison.calculerFrais(this);
    console.log(`Fragile: ${this.libelle}, ${this.poids}kg, Frais de transport: ${frais}F`);
  }
}
