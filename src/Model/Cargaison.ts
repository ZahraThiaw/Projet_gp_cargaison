// Cargaison.ts
import { Produit } from './Produit.js';

export abstract class Cargaison {
  private _distance: number;
  private _frais: number;
  private _produits: Produit[];
  private _num: number;
  private _poidsMax: number;
  private _nbProduitsMax: number;
  private _lieuDepart: string;
  private _lieuArrivee: string;
  private _dateDepart: string;
  private _dateArrivee: string;

  constructor(
    distance: number,
    frais: number,
    num: number,
    poidsMax: number,
    nbProduitsMax: number,
    lieuDepart: string,
    lieuArrivee: string,
    dateDepart: string,
    dateArrivee: string
  ) {
    this._distance = distance;
    this._frais = frais;
    this._num = num;
    this._poidsMax = poidsMax;
    this._nbProduitsMax = nbProduitsMax;
    this._lieuDepart = lieuDepart;
    this._lieuArrivee = lieuArrivee;
    this._dateDepart = dateDepart;
    this._dateArrivee = dateArrivee;
    this._produits = [];
  }

  // Getter and setter methods...

  ajouterProduit(produit: Produit): void {
    if (this._produits.length >= this._nbProduitsMax) {
      console.log('La cargaison est pleine');
      return;
    }
    if (!this.produitEstValide(produit)) {
      console.log("Produit non valide pour cette cargaison");
      return;
    }
    this._produits.push(produit);
    console.log(`${produit.libelle} ajouté à la cargaison`);
    this.afficherMontant();
  }

  calculerFrais(produit: Produit): number {
    return this._frais * produit.poids * this._distance;
  }

  sommeTotale(): number {
    return this._produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
  }

  afficherMontant(): void {
    console.log(`Montant total de la cargaison: ${this.sommeTotale()} F`);
  }

  abstract produitEstValide(produit: Produit): boolean;
}
