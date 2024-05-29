import { Cargaison } from './Cargaison.js';
import { Produit } from './Produit.js';
import { Alimentaire } from './Alimentaire.js';

export class Routiere extends Cargaison {
  constructor(
    distance: number,
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
    super(distance, 100, num, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee, etat, etape);
  }

  produitEstValide(produit: Produit): boolean {
    return true; // Tous les produits sont acceptés pour le transport routier
  }

  calculerFrais(produit: Produit): number {
    let frais = 0;
    if (produit instanceof Alimentaire) {
      frais = 100 * produit.poids * this.distance; // 100F/kg/km pour les produits alimentaires
    } else {
      frais = 200 * produit.poids * this.distance; // 200F/kg/km pour les matériels
    }
    return frais;
  }
}
