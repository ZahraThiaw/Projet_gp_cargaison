import { Produit } from './Produit.js';

export abstract class Cargaison {
  protected abstract type :string;
  private distance: number;
  private num: number;
  private poidsMax: number;
  private nbProduitsMax: number;
  private lieuDepart: string;
  private lieuArrivee: string;
  private dateDepart: string;
  private dateArrivee: string;
  private etat: 'ouvert' | 'fermé';
  private etape: 'en attente' | 'en cours' | 'arrivé';
  protected abstract produits: Produit[];
  

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
    this.distance = distance;
    this.num = num;
    this.poidsMax = poidsMax;
    this.nbProduitsMax = nbProduitsMax;
    this.lieuDepart = lieuDepart;
    this.lieuArrivee = lieuArrivee;
    this.dateDepart = dateDepart;
    this.dateArrivee = dateArrivee;
    this.etat = etat;
    this.etape = etape;
  }

  get _num(): number {
    return this.num;
  }

  set _num(value: number) {
    this.num = value;
  }

  get _etat(): 'ouvert' | 'fermé' {
    return this.etat;
  }

  set _etat(value: 'ouvert' | 'fermé') {
    this.etat = value;
  }

  get _etape(): 'en attente' | 'en cours' | 'arrivé' {
    return this.etape;
  }

  set _etape(value: 'en attente' | 'en cours' | 'arrivé') {
    this.etape = value;
  }

  get _distance(): number {
    return this.distance;
  }
  

  ajouterProduit(produit: Produit): void {
    if (this.etat !== 'ouvert') {
      alert("La cargaison n'est pas ouverte, vous ne pouvez pas ajouter de produits");
      return;
    }
    if (this.etape !== 'en attente') {
      alert("La cargaison n'est plus en attente, vous ne pouvez pas ajouter de nouveaux produits");
      return;
    }
    if (this.estPleine()) {
      alert("La cargaison est pleine, vous ne pouvez pas ajouter de nouveaux produits");
      return;
    }
    if (!this.produitEstValide(produit)) {
      alert("Produit non valide pour cette cargaison");
      return;
    }
    this.produits.push(produit);
    console.log(`${produit.libelle} ajouté à la cargaison`);
    alert(`${produit.libelle} ajouté à la cargaison`);
    this.afficherMontant();
  }

  estPleine() {
      // Vérifier si le nombre de produits est égal au nombre maximum de produits
      if (this.produits.length === this.nbProduitsMax) {
          return true;
      }

      // Calculer le poids total des produits
      const poidsTotal = this.produits.reduce((total, produit) => total + produit.poids, 0);

      // Vérifier si le poids total des produits est égal au poids maximum de la cargaison
      if (poidsTotal === this.poidsMax) {
          return true;
      }

      // Si aucun des critères n'est rempli, la cargaison n'est pas pleine
      return false;
  }

// Méthode pour obtenir le type de la cargaison
getType() {
  return "Cargaison";
}


  abstract calculerFrais(produit: Produit): number;

  sommeTotale(): number {
    return this.produits.reduce((total, produit) => total + this.calculerFrais(produit), 0);
  }

  afficherMontant(): void {
    console.log(`Montant total de la cargaison: ${this.sommeTotale()} F`);
  }

  getPoidsTotal(): number {
    return this.produits.reduce((total, produit) => total + produit.poids, 0);
  }

  abstract produitEstValide(produit: Produit): boolean;
}
