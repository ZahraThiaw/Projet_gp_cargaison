// Chimique.ts
import { Produit } from './Produit.js';

export class Chimique extends Produit {
  constructor(
    libelle: string,
    poids: number,
    private _degreToxicite: number
  ) {
    super(libelle, poids);
  }

  get degreToxicite(): number {
    return this._degreToxicite;
  }

  set degreToxicite(value: number) {
    this._degreToxicite = value;
  }

  info() {
    console.log(`Chimique: ${this.libelle}, ${this.poids}kg, Toxicité: ${this.degreToxicite}`);
  }
}
