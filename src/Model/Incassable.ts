// Incassable.ts
import { Materiel } from './Materiel.js';

export class Incassable extends Materiel {
  info() {
    console.log(`Incassable: ${this.libelle}, ${this.poids}kg`);
  }
}
