// export abstract class Produit {
//   constructor(
//     private _libelle: string,
//     private _poids: number
//   ) {}

//   get libelle(): string {
//     return this._libelle;
//   }

//   set libelle(value: string) {
//     this._libelle = value;
//   }

//   get poids(): number {
//     return this._poids;
//   }

//   set poids(value: number) {
//     this._poids = value;
//   }

//   abstract info(): void;
// }

import { Cargaison } from './Cargaison.js';

export abstract class Produit {
  constructor(
    private _libelle: string,
    private _poids: number
  ) {}

  get libelle(): string {
    return this._libelle;
  }

  set libelle(value: string) {
    this._libelle = value;
  }

  get poids(): number {
    return this._poids;
  }

  set poids(value: number) {
    this._poids = value;
  }

  info(cargaison: Cargaison): void {
    const frais = cargaison.calculerFrais(this);
    console.log(`${this.constructor.name}: ${this.libelle}, ${this.poids}kg, Frais de transport: ${frais}F`);
  }
}
