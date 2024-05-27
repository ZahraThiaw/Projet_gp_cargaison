// Alimentaire.ts
import { Produit } from './Produit.js';

export class Alimentaire extends Produit {
  info() {
    console.log(`Alimentaire: ${this.libelle}, ${this.poids}kg`);
  }
}
