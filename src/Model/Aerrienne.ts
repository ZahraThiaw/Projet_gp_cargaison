// Aerienne.ts
import { Cargaison } from './Cargaison.js';
import { Produit } from './Produit.js';
import { Chimique } from './Chimique.js';

export class Aerienne extends Cargaison {
  constructor(
    distance: number,
    num: number,
    poidsMax: number,
    nbProduitsMax: number,
    lieuDepart: string,
    lieuArrivee:string,
    dateDepart: string,
    dateArrivee: string
  ) {
    super(distance, 100, num, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
  }

  produitEstValide(produit: Produit): boolean {
    return !(produit instanceof Chimique); // Les produits chimiques ne sont pas autorisés
  }
}
