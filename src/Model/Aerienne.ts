import { Cargaison } from './Cargaison.js';
import { Produit } from './Produit.js';
import { Alimentaire } from './Alimentaire.js';
import { Chimique } from './Chimique.js';
import { Incassable } from './Incassable.js';
import { Fragile } from './Fragile.js';

export class Aerienne extends Cargaison {
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
    return !(produit instanceof Chimique); // Les produits chimiques ne sont pas autorisés pour le transport aérien
  }

  calculerFrais(produit: Produit): number {
    let frais = 0;
    if (produit instanceof Alimentaire) {
      frais = 300 * produit.poids * this.distance; // 300F/kg/km pour les produits alimentaires
    } else if(produit instanceof Incassable || produit instanceof Fragile) {
      frais = 1000 * produit.poids; // 1000F/kg pour les matériels
    }
    return frais;
  }
}
