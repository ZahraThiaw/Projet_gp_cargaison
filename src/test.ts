
import { Maritime } from './Model/Maritime.js';
import { Aerienne } from './Model/Aerienne.js';
import { Routiere } from './Model/Routiere.js';
import { Cargaison } from './Model/Cargaison.js';

import { Alimentaire } from './Model/Alimentaire.js';
import { Chimique } from './Model/Chimique.js';
import { Fragile } from './Model/Fragile.js';
import { Incassable } from './Model/Incassable.js';
import { Produit, statut, client, destinataire } from './Model/Produit.js';


// const cargaison = new Routiere(
//   1000,    // distance
//   1,       // num
//   10000,   // poidsMax
//   5,       // nbProduitsMax
//   'Port A', // lieuDepart
//   'Port B', // lieuArrivee
//   '2024-06-01', // dateDepart
//   '2024-06-05', // dateArrivee
//   'ouvert',     // etat
//   'en attente'  // etape
// );

// const prod1 = new Alimentaire('Pomme', 200);
// const prod2 = new Chimique('Produit Chimique', 100, 2);
// const prod3 = new Incassable('Boîte en métal', 300);

// cargaison.ajouterProduit(prod1);
// cargaison.ajouterProduit(prod2);
// cargaison.ajouterProduit(prod3);

// console.log(cargaison);


// // Afficher les produits ajoutés et la somme totale
// console.log("Produits dans la cargaison:");
// cargaison.produits.forEach(produit => console.log(`${produit.libelle}: ${produit.poids} kg`));

// console.log(`Poids total de la cargaison: ${cargaison.getPoidsTotal()} kg`);
// console.log(`Montant total de la cargaison: ${cargaison.sommeTotale()} F`);

// console.log(cargaison);





document.addEventListener("DOMContentLoaded", async () => {
  let cargaisons: Cargaison[] = [];
  let cargaisonCounter = 1;
  let page = 1;
  const itemsPerPage = 5; // Nombre d'éléments par page

  const form = document.getElementById("ajouter-cargaison-form") as HTMLFormElement;
  const dialog = document.getElementById("my_modal_3") as HTMLDialogElement;
  const cargaisonTableBody = document.querySelector("#cargaison-table tbody") as HTMLTableSectionElement;

  const searchInputs = {
    type: document.getElementById("search-type") as HTMLInputElement
  };

  const searchInputsmores = {
    num: document.getElementById("search-num") as HTMLInputElement,
    dateDepart: document.getElementById("search-date-depart") as HTMLInputElement,
    dateArrivee: document.getElementById("search-date-arrivee") as HTMLInputElement,
    lieuDepart: document.getElementById("search-lieu-depart") as HTMLInputElement,
    lieuArrivee: document.getElementById("search-lieu-arrivee") as HTMLInputElement
  }

  const moreFiltersBtn = document.getElementById("more-filters-btn") as HTMLButtonElement;
  const moreFiltersPopup = document.getElementById("more-filters-popup") as HTMLDivElement;
  //const applyFiltersBtn = document.getElementById("apply-filters-btn") as HTMLButtonElement;
  const closePopupBtn = document.getElementById("close-popup-btn") as HTMLButtonElement;
  const activeFiltersContainer = document.getElementById("active-filters") as HTMLDivElement;

  moreFiltersBtn.addEventListener("click", () => {
    moreFiltersPopup.classList.remove("hidden");
  });

  closePopupBtn.addEventListener("click", () => {
    moreFiltersPopup.classList.add("hidden");
  });

  // applyFiltersBtn.addEventListener("click", () => {
  //   moreFiltersPopup.classList.add("hidden");
  //   updateActiveFilters();
  //   afficherCargaisons();
  // });

  // Charger les cargaisons existantes à partir du fichier JSON
  fetch("../php/data.php")
    .then(response => response.json())
    .then(data => {
      data.cargo.forEach((cargo: any) => {
        let cargaison: Cargaison;
        switch (cargo.type) {
          case 'Maritime':
            cargaison = new Maritime(cargo.distance, cargaisonCounter++, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee, cargo.etat, cargo.etape);
            break;
          case 'Aerienne':                  
            cargaison = new Aerienne(cargo.distance, cargaisonCounter++, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee, cargo.etat, cargo.etape);
            break;
          case 'Routiere':
            cargaison = new Routiere(cargo.distance, cargaisonCounter++, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee, cargo.etat, cargo.etape);
            break;
          default:
            console.error('Type de cargaison inconnu', cargo.type);
            return;
        }
        cargaisons.push(cargaison);
      });
      afficherCargaisons();
    })
    .catch(error => {
      console.error('Erreur lors du chargement des cargaisons :', error);
    });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const type = formData.get("type-cargaison") as string;
    const dateDepart = formData.get("dateDepart") as string;
    const dateArrivee = formData.get("dateArrivee") as string;
    const poidsOuProduits = formData.get("poidsOuProduits") as string;
    const poidsMax = formData.get("poidsMax") as string;
    const nbProduitsMax = formData.get("nbProduitsMax") as string;
    const lieuDepart = formData.get("lieu-depart") as string;
    const lieuArrivee = formData.get("lieu-arrivee") as string;
    const distance = parseFloat(formData.get("distance") as string);

    // Réinitialiser les messages d'erreur
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    // Validation des champs
    let isValid = true;
    const today = new Date().toISOString().split("T")[0];

    if (!type) {
      isValid = false;
      setError("type-cargaison", "Type de cargaison est requis.");
    }

    if (!dateDepart) {
      isValid = false;
      setError("dateDepart", "Date de départ est requise.");
    } else if (dateDepart < today) {
      isValid = false;
      setError("dateDepart", "Date de départ doit être supérieure ou égale à aujourd'hui.");
    }

    if (!dateArrivee) {
      isValid = false;
      setError("dateArrivee", "Date d'arrivée est requise.");
    } else if (dateArrivee < dateDepart) {
      isValid = false;
      setError("dateArrivee", "Date d'arrivée doit être supérieure ou égale à la date de départ.");
    }

    if (!lieuDepart) {
      isValid = false;
      setError("lieu-depart", "Lieu de départ est requis.");
    }

    if (!lieuArrivee) {
      isValid = false;
      setError("lieu-arrivee", "Lieu d'arrivée est requis.");
    }

    if (!poidsOuProduits) {
      isValid = false;
      setError("poidsOuProduits", "Veuillez choisir une limite.");
    } else if (poidsOuProduits === "poidsMax" && (!poidsMax || parseFloat(poidsMax) <= 0)) {
      isValid = false;
      setError("poidsMax", "Poids max est requis et doit être supérieur à 0.");
    } else if (poidsOuProduits === "nbProduitsMax" && (!nbProduitsMax || parseInt(nbProduitsMax) <= 0)) {
      isValid = false;
      setError("nbProduitsMax", "Nombre de produits max est requis et doit être supérieur à 0.");
    }

    if (!isValid) {
      return;
    }

    let nouvelleCargaison: Cargaison;
    const etat = "ouvert";
    const etape = "en attente";

    switch (type) {
      case 'Maritime':
        nouvelleCargaison = new Maritime(distance, cargaisonCounter++, parseFloat(poidsMax), parseInt(nbProduitsMax), lieuDepart, lieuArrivee, dateDepart, dateArrivee, etat, etape);
        break;
      case 'Aerienne':
        nouvelleCargaison = new Aerienne(distance, cargaisonCounter++, parseFloat(poidsMax), parseInt(nbProduitsMax), lieuDepart, lieuArrivee, dateDepart, dateArrivee, etat, etape);
        break;
      case 'Routiere':
        nouvelleCargaison = new Routiere(distance, cargaisonCounter++, parseFloat(poidsMax), parseInt(nbProduitsMax), lieuDepart, lieuArrivee, dateDepart, dateArrivee, etat, etape);
        break;
      default:
        console.error("Type de cargaison inconnu:", type);
        return;
    }

    cargaisons.push(nouvelleCargaison);

    console.log(nouvelleCargaison);

    // Envoyer les cargaisons mises à jour au serveur
    // fetch("../php/data.php", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ cargo: cargaisons.map(c => ({
    //     type: c instanceof Maritime ? 'Maritime' : c instanceof Aerienne ? 'Aerienne' : c instanceof Routiere ? 'Routiere' : 'inconnu',
    //     distance: c['distance'],
    //     num: c['num'],
    //     poidsMax: c['poidsMax'],
    //     nbProduitsMax: c['nbProduitsMax'],
    //     lieuDepart: c['lieuDepart'],
    //     lieuArrivee: c['lieuArrivee'],
    //     dateDepart: c['dateDepart'],
    //     dateArrivee: c['dateArrivee'],
    //     etat: c['etat'],
    //     etape: c['etape'],
    //     produits: c['produits'] // Ajouter les produits
    //   })) })
    // })
    // .then(response => response.text())
    // .then(data => {
    //   console.log(data);
    //   afficherCargaisons();
    //   form.reset();
    //   dialog.close(); // Fermer le dialogue après l'envoi réussi
    // })
    // .catch(error => {
    //   console.error("Erreur lors de l'envoi des cargaisons :", error);
    // });


    fetch("../php/data.php", {
      method: "POST",
      body: JSON.stringify(cargaisons),
    })
      .then((response) => response.json())
      .then((data) => {
        data.cargo.push(nouvelleCargaison); // Ajouter les cargaisons mises à jour au tableau cargaisons;
        save(data);
      })
      .catch((error) => {
        console.error(error);
      });

  });

  Object.values(searchInputs).forEach(input => {
    input.addEventListener("input", () => {
      page = 1; // Réinitialiser à la première page lors d'une nouvelle recherche
      afficherCargaisons();
    });
  });

  Object.values(searchInputsmores).forEach(input => {
    input.addEventListener("input", () => {
      page = 1; // Réinitialiser à la première page lors d'une nouvelle recherche
      updateActiveFilters();
      afficherCargaisons();
    });
  })

  

  function setError(fieldId: string, message: string) {
    const errorMessageElement = document.querySelector(`#${fieldId} ~ .error-message`) as HTMLSpanElement;
    if (errorMessageElement) {
      errorMessageElement.textContent = message;
    }
  }

  function updateActiveFilters() {
    activeFiltersContainer.innerHTML = "";

    Object.keys(searchInputsmores).forEach(key => {
      const input = searchInputsmores[key as keyof typeof searchInputsmores];
      if (input.value) {
        const filterElement = document.createElement("span");
        filterElement.classList.add("px-4", "py-2", "bg-white", "text-gray-700",  "rounded", "flex", "items-center", "gap-2");
        filterElement.textContent = `${input.placeholder}: ${input.value}`;
        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "&times;";
        removeBtn.classList.add("ml-2", "text-red-500", "font-bold");
        removeBtn.addEventListener("click", () => {
          input.value = "";
          updateActiveFilters();
          afficherCargaisons();
        });
        filterElement.appendChild(removeBtn);
        activeFiltersContainer.appendChild(filterElement);
      }
    });
  }

  function afficherCargaisons() {
    cargaisonTableBody.innerHTML = "";
    const searchQueries = {
      type: searchInputs.type.value.toLowerCase()
    };
    const searchQueriesmores = {
      num: searchInputsmores.num.value.toLowerCase(),
      dateDepart: searchInputsmores.dateDepart.value.toLowerCase(),
      dateArrivee: searchInputsmores.dateArrivee.value.toLowerCase(),
      lieuDepart: searchInputsmores.lieuDepart.value.toLowerCase(),
      lieuArrivee: searchInputsmores.lieuArrivee.value.toLowerCase()
    }
  
    const filteredCargaisons = cargaisons.filter(cargaison => {
      const type = cargaison instanceof Maritime ? "Maritime" :
                   cargaison instanceof Aerienne ? "Aerienne" :
                   cargaison instanceof Routiere ? "Routiere" : "Inconnu";
  
      return (
        cargaison['num'].toString().includes(searchQueriesmores.num) &&
        type.toLowerCase().includes(searchQueries.type) &&
        cargaison['lieuDepart'].toLowerCase().includes(searchQueriesmores.lieuDepart) &&
        cargaison['lieuArrivee'].toLowerCase().includes(searchQueriesmores.lieuArrivee) &&
        cargaison['dateDepart'].toLowerCase().includes(searchQueriesmores.dateDepart) &&
        cargaison['dateArrivee'].toLowerCase().includes(searchQueriesmores.dateArrivee)
      );
    });
  
    filteredCargaisons.forEach(cargaison => {
      const row = document.createElement("tr");
      row.classList.add("mt-8");
  
      const type = cargaison instanceof Maritime ? "Maritime" :
                   cargaison instanceof Aerienne ? "Aerienne" :
                   cargaison instanceof Routiere ? "Routiere" : "Inconnu";
  
      row.innerHTML = `
        <td class="px-6 py-4">
          <input type="radio" name="select-cargaison" class="select-cargaison" data-num="${cargaison['_num']}">
        </td>
        <td class="px-6 py-4">${cargaison['num']}</td>
        <td class="px-6 py-4">${type}</td>
        <td class="px-6 py-4">${cargaison['dateDepart']}</td>
        <td class="px-6 py-4">${cargaison['dateArrivee']}</td>
        <td class="px-6 py-4">${cargaison['lieuDepart']}</td>
        <td class="px-6 py-4">${cargaison['lieuArrivee']}</td>
      `;
      cargaisonTableBody.appendChild(row);
    });

    const productForm = document.getElementById("product-form") as HTMLFormElement;
    const productModal = document.getElementById("my_modal_4") as HTMLDialogElement;
  
    // Ajouter des écouteurs pour les sélecteurs radio
    document.querySelectorAll(".select-cargaison").forEach(radio => {
      radio.addEventListener("change", () => {
          const selectedCargaisonNum = parseInt(radio.getAttribute("data-num") || "");
          const selectedCargaison = cargaisons.find(c => c['_num'] === selectedCargaisonNum);

          console.log(selectedCargaison);
          
          // Vérifier si une cargaison est sélectionnée
          if (selectedCargaison) {
            // Vérifier les conditions pour afficher le modal
            //if (selectedCargaison._etat === 'ouvert' && selectedCargaison._etape === 'en attente' && !selectedCargaison.estPleine()) {
            // Afficher le modal d'ajout de produit
            productModal.showModal();
            
              // Ajouter un écouteur d'événements au formulaire de produit pour gérer l'ajout de produit
              productForm.addEventListener("submit", (event) => {
                  event.preventDefault();

                  // Récupérer les données du formulaire de produit
                  const formData = new FormData(productForm);
                  
                  const clientName = formData.get("client-name") as string;
                  const clientPrenom = formData.get("client-prenom") as string;
                  const clientAdresse = formData.get("client-adresse") as string;
                  const clientTel = formData.get("client-telephone") as string;
                  const clientEmail = formData.get("client-email") as string;
                  const recipientName = formData.get("recipient-name") as string;
                  const recipientPrenom = formData.get("recipient-prenom") as string;
                  const recipientAdresse = formData.get("recipient-adresse") as string;
                  const recipientTel = formData.get("recipient-telephone") as string;
                  const recipientEmail = formData.get("recipient-email") as string;
                  const productName = formData.get("product-name") as string;
                  const productWeight = parseFloat(formData.get("product-weight") as string);
                  const productType = formData.get("product-type") as string;
                  const degreDeToxicite = formData.get("degre-de-toxicite") ? parseInt(formData.get("degre-de-toxicite") as string) : 0;

                  // Créer un nouveau produit en fonction du type de la cargaison sélectionnée
                  const statut: statut = 'en attente';
                  const client: client = {name: clientName, username: clientPrenom, address: clientAdresse, phone: clientTel, email: clientEmail};
                  const destinataire: destinataire = {name: recipientName, username: recipientPrenom, address: recipientAdresse, phone: recipientTel, email: recipientEmail};
                  // Créer un nouveau produit
                  let newProduct: Produit;
                  switch (productType) {
                      case 'Alimentaire':
                          newProduct = new Alimentaire(productName, productWeight, statut, client, destinataire);
                          break;
                      case 'Chimique':
                          newProduct = new Chimique(productName, productWeight, statut, client, destinataire, degreDeToxicite); // Ajouter le degré de toxicité si nécessaire
                          break;
                      case 'Incassable':
                          newProduct = new Incassable(productName, productWeight, statut, client, destinataire);
                          break;
                      case 'Fragile':
                          newProduct = new Fragile(productName, productWeight, statut, client, destinataire);
                          break;
                      default:
                          console.error("Type de produit inconnu:", productType);
                          return;
                  }

                  // Ajouter le produit à la cargaison sélectionnée
                  //selectedCargaison.ajouterProduit(newProduct);
                  //alert ("Produit ajouté à la cargaison");
                  let newCargos : Cargaison[] = [];
                  console.log(selectedCargaison);
                  Cargos.forEach(cargaison => {
                    if(cargaison._num === selectedCargaison._num) {
                      cargaison.ajouterProduit(newProduct);
                    }
                    newCargos.push(cargaison);
                  })
                  console.log(newCargos);

                  fetch("../php/data.php", {
                    method: "POST",
                    body: JSON.stringify(newCargos),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      data.cargo = newCargos;
                      save(data);
                    })
                    .catch((error) => {
                      console.error(error);
                    });

                  // Réinitialiser le formulaire et fermer le modal
                  productForm.reset();
                  productModal.close();
              });
            // } else {
            //   // Si les conditions ne sont pas remplies, afficher un message ou effectuer une action appropriée
            //   console.log("Impossible d'ajouter un produit à cette cargaison pour le moment.");
            //   alert ("Impossible d'ajouter un produit à cette cargaison pour le moment.");
            // }
          } else {
          console.error(`Aucune cargaison sélectionnée`);
          }
 
        });
    });
  
  


    // Afficher les boutons de pagination
    const paginationContainer = document.getElementById("pagination") as HTMLDivElement;
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(filteredCargaisons.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i.toString();
      button.classList.add("mx-2", "px-4", "py-1", "bg-blue-500", "text-white", "rounded");
      if (i === page) {
        button.classList.add("bg-blue-700");
      }
      button.addEventListener("click", () => {
        page = i;
        afficherCargaisons();
      });
      paginationContainer.appendChild(button);

      // Ajouter un espace après chaque bouton, sauf le dernier
      if (i < totalPages) {
        const space = document.createTextNode(" ");
        paginationContainer.appendChild(space);
      }
    }
  }

  // Toggle toxicity level field based on product type
  document.getElementById("product-type")?.addEventListener("change", () => {
    const productType = (document.getElementById("product-type") as HTMLSelectElement).value;
    const toxicityLevel = document.getElementById("degre-de-toxicite") as HTMLDivElement;
    if (productType === "Chimique") {
      toxicityLevel.classList.remove("hidden");
    } else {
      toxicityLevel.classList.add("hidden");
    }
  });






  interface Icargo {
    type: string;
    distance: number;
    num: string;
    lieuDepart: string;
    lieuArrivee: string;
    dateDepart: string;
    dateArrivee: string;
    poidsMax?: number;
    nbProduitsMax?: number;
    etat: string;
    etape: string;
    produits: (Alimentaire[]|Incassable[]|Chimique[]|Fragile[]);
  }
  const GetData = async (): Promise<Icargo[]> => {
    const response = await fetch("../php/data.php");
    const data = await response.json();
    return data.cargo;
  }
  
    const dt = await GetData();
    console.log(dt);
    var Cargos:Cargaison[] = [];
  dt.forEach((cargo: any) => {
   switch(cargo.type) {
     case "Maritime":
       let m = new Maritime(
         cargo.distance,
         cargo.num,
         cargo.poidsMax,
         cargo.nbProduitsMax,
         cargo.lieuDepart,
         cargo.lieuArrivee,
         cargo.dateDepart,
         cargo.dateArrivee,
         cargo.etat,
         cargo.etape
       )
       m._num = parseInt(cargo.num);
       m.produits = cargo.produits.map((product: any) => {
         switch(product.type) {
           case "Alimentaire":
            const  f = new Alimentaire(
               product._libelle,
               product._poids,
               product._statut,
               product._client,
               product._destinataire,

             )
             f.statut = product._statut as statut
             return f;
             break;
           case "Incassable":
             const u = new Incassable(
              product._libelle,
              product._poids,
              product._statut,
              product._client,
              product._destinataire,
             )
             u.statut = product._statut as statut
             return u
             break;
           case "Chimique":
             const c = new Chimique(
               product._libelle,
               product._poids,
               product._statut,
               product._client,
               product._destinataire,
               product._toxicity,
             )
             c.statut = product._statut as statut
             return c
             break;
          case "Fragile":
            const s = new Fragile(
              product._libelle,
              product._poids,
              product._statut,
              product._client,
              product._destinataire,
            )
            s.statut = product._statut as statut
            return s
            break;
          
  
         }
       })
       
       Cargos.push(m);
       break;
     case "Routiere":
       let t = new Routiere(
          cargo.distance,
          cargo.num,
          cargo.poidsMax,
          cargo.nbProduitsMax,
          cargo.lieuDepart,
          cargo.lieuArrivee,
          cargo.dateDepart,
          cargo.dateArrivee,
          cargo.etat,
          cargo.etape
       )
       t._num = parseInt(cargo.num);
       t.produits = cargo.produits.map((product: any) => {
        switch(product.type) {
          case "Alimentaire":
           const  f = new Alimentaire(
            product._libelle,
            product._poids,
            product._statut,
            product._client,
            product._destinataire,
            )
            f.statut = product._statut as statut
            return f
            break;
          case "Incassable":
            const u = new Incassable(
              product._libelle,
              product._poids,
              product._statut,
              product._client,
              product._destinataire,
            )
            u.statut = product._statut as statut
            return u
            break;
            case "Chimique":
              const c = new Chimique(
                product._libelle,
                product._poids,
                product._statut,
                product._client,
                product._destinataire,
                product._toxicity,
              )
              c.statut = product._statut as statut
              return c
              break;
              case "Fragile":
                const s = new Fragile(
                  product._libelle,
                  product._poids,
                  product._statut,
                  product._client,
                  product._destinataire,
                )
                s.statut = product._statut as statut
                return s
                break;
         
        }
      })
    
       Cargos.push(t);
       break;
      case "Aerienne":
        let a = new Aerienne(
          cargo.distance,
          cargo.num,
          cargo.poidsMax,
          cargo.nbProduitsMax,
          cargo.lieuDepart,
          cargo.lieuArrivee,
          cargo.dateDepart,
          cargo.dateArrivee,
          cargo.etat,
          cargo.etape
        )
        a._num = parseInt(cargo.num);
        a.produits = cargo.produits.map((product: any) => {
          switch(product.type) {
            case "Alimentaire":
            const  f = new Alimentaire(
               product._libelle,
               product._poids,
               product._statut,
               product._client,
               product._destinataire,

             )
             f.statut = product._statut as statut
             return f;
             break;
           case "Incassable":
             const u = new Incassable(
              product._libelle,
              product._poids,
              product._statut,
              product._client,
              product._destinataire,
             )
             u.statut = product._statut as statut
             return u
             break;
           case "Chimique":
             const c = new Chimique(
               product._libelle,
               product._poids,
               product._statut,
               product._client,
               product._destinataire,
               product._toxicity,
             )
             c.statut = product._statut as statut
             return c
             break;
          case "Fragile":
            const s = new Fragile(
              product._libelle,
              product._poids,
              product._statut,
              product._client,
              product._destinataire,
            )
            s.statut = product._statut as statut
            return s
            break;
           
   
          }
  
        })
        
  
        Cargos.push(a);
        break;
  
   }
  })
  console.log(Cargos);


  const save = (data: Cargaison[]) => {
  
    fetch("../php/data.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      // Traitez les données renvoyées par PHP
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const misajJson = (c:Cargaison[]) :void => {

    fetch("../php/data.php", {
       method: "POST",
       body: JSON.stringify(c),
     })
       .then((response) => response.json())
       .then((data) => {
         data.cargo = c;
         save(data);
       })
       .catch((error) => {
         console.error(error);
       });
     
   }
});


