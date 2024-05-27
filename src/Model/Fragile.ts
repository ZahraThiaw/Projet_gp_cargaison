// Fragile.ts
import { Materiel } from './Materiel.js';

export class Fragile extends Materiel {
  info() {
    console.log(`Fragile: ${this.libelle}, ${this.poids}kg`);
  }
}
