import { Produit } from './Produit.js';

export abstract class Cargaison {
  private _distance: number;
  protected _frais: number; // Rend _frais accessible par les sous-classes
  private _produits: Produit[];
  private _num: number;
  private _poidsMax: number;
  private _nbProduitsMax: number;
  private _lieuDepart: string;
  private _lieuArrivee: string;
  private _dateDepart: string;
  private _dateArrivee: string;
  private _etat: 'ouvert' | 'fermé';
  private _etape: 'en attente' | 'en cours' | 'arrivé';

  constructor(
    distance: number,
    frais: number,
    num: number,
    poidsMax: number,
    nbProduitsMax: number,
    lieuDepart: string,
    lieuArrivee: string,
    dateDepart: string,
    dateArrivee: string,
    etat: 'ouvert' | 'fermé',
    etape: 'en attente' | 'en cours' | 'arrivé'
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
    this._etat = etat;
    this._etape = etape;
  }

  get etat(): 'ouvert' | 'fermé' {
    return this._etat;
  }

  set etat(value: 'ouvert' | 'fermé') {
    this._etat = value;
  }

  get etape(): 'en attente' | 'en cours' | 'arrivé' {
    return this._etape;
  }

  set etape(value: 'en attente' | 'en cours' | 'arrivé') {
    this._etape = value;
  }

  get distance(): number {
    return this._distance;
  }

  ajouterProduit(produit: Produit): void {
    if (this._etat === 'fermé') {
      console.log("La cargaison est fermée, vous ne pouvez pas ajouter de produits");
      return;
    }
    if (this._produits.length >= this._nbProduitsMax || this.getPoidsTotal() + produit.poids > this._poidsMax) {
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

  abstract calculerFrais(produit: Produit): number;

  sommeTotale(): number {
    return this._produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
  }

  afficherMontant(): void {
    console.log(`Montant total de la cargaison: ${this.sommeTotale()} F`);
  }

  getPoidsTotal(): number {
    return this._produits.reduce((total, produit) => total + produit.poids, 0);
  }

  abstract produitEstValide(produit: Produit): boolean;
}
