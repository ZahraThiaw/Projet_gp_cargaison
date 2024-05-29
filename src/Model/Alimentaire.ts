// Alimentaire.ts
import { Produit } from './Produit.js';
import { Cargaison } from './Cargaison.js';

export class Alimentaire extends Produit {
  // info() {
  //   console.log(`Alimentaire: ${this.libelle}, ${this.poids}kg`);
  // }

  info(cargaison: Cargaison): void {
    const frais = cargaison.calculerFrais(this);
    console.log(`Alimentaire: ${this.libelle}, ${this.poids}kg, Frais de transport: ${frais}F`);
  }
}
