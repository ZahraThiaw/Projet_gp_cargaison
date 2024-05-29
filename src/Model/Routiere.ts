import { Cargaison } from './Cargaison.js';
import { Produit } from './Produit.js';

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
    super(distance, 300, num, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee, etat, etape);
  }

  produitEstValide(produit: Produit): boolean {
    return true; // Add logic if necessary
  }
}
