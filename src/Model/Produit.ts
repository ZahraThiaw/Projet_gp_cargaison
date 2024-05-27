// Produit.ts
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
  
    abstract info(): void;
  }
  