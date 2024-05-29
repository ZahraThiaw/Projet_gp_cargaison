function greet(name: string): string {
    return `Bonjour, ${name}!`;
}

const user = "Alice";
console.log(greet(user));


import { Maritime } from './Model/Maritime.js';
import { Aerienne } from './Model/Aerienne.js';
import { Routiere } from './Model/Routiere.js';
import { Cargaison } from './Model/Cargaison.js';

document.addEventListener("DOMContentLoaded", () => {
  let cargaisons: Cargaison[] = [];
  let cargaisonCounter = 1;
  let page = 1;
  const itemsPerPage = 5; // Nombre d'éléments par page

  const form = document.getElementById("ajouter-cargaison-form") as HTMLFormElement;
  const dialog = document.getElementById("my_modal_3") as HTMLDialogElement;
  const cargaisonTableBody = document.querySelector("#cargaison-table tbody") as HTMLTableSectionElement;

  const searchInputs = {
    type: document.getElementById("search-type") as HTMLInputElement,
    lieuDepart: document.getElementById("search-lieu-depart") as HTMLInputElement,
    lieuArrivee: document.getElementById("search-lieu-arrivee") as HTMLInputElement
  };

  const searchInputsmores = {
    num: document.getElementById("search-num") as HTMLInputElement,
    dateDepart: document.getElementById("search-date-depart") as HTMLInputElement,
    dateArrivee: document.getElementById("search-date-arrivee") as HTMLInputElement,
  }

  const moreFiltersBtn = document.getElementById("more-filters-btn") as HTMLButtonElement;
  const moreFiltersPopup = document.getElementById("more-filters-popup") as HTMLDivElement;
  const applyFiltersBtn = document.getElementById("apply-filters-btn") as HTMLButtonElement;
  const closePopupBtn = document.getElementById("close-popup-btn") as HTMLButtonElement;
  const activeFiltersContainer = document.getElementById("active-filters") as HTMLDivElement;

  moreFiltersBtn.addEventListener("click", () => {
    moreFiltersPopup.classList.remove("hidden");
  });

  closePopupBtn.addEventListener("click", () => {
    moreFiltersPopup.classList.add("hidden");
  });

  applyFiltersBtn.addEventListener("click", () => {
    moreFiltersPopup.classList.add("hidden");
    updateActiveFilters();
    afficherCargaisons();
  });

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
    fetch("../php/data.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cargo: cargaisons.map(c => ({
        type: c instanceof Maritime ? 'Maritime' : c instanceof Aerienne ? 'Aerienne' : c instanceof Routiere ? 'Routiere' : 'inconnu',
        distance: c['_distance'],
        num: c['_num'],
        poidsMax: c['_poidsMax'],
        nbProduitsMax: c['_nbProduitsMax'],
        lieuDepart: c['_lieuDepart'],
        lieuArrivee: c['_lieuArrivee'],
        dateDepart: c['_dateDepart'],
        dateArrivee: c['_dateArrivee'],
        etat: c['_etat'],
        etape: c['_etape']
      })) })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      afficherCargaisons();
      form.reset();
      dialog.close(); // Fermer le dialogue après l'envoi réussi
    })
    .catch(error => {
      console.error("Erreur lors de l'envoi des cargaisons :", error);
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
      type: searchInputs.type.value.toLowerCase(),
      lieuDepart: searchInputs.lieuDepart.value.toLowerCase(),
      lieuArrivee: searchInputs.lieuArrivee.value.toLowerCase()
    };
    const searchQueriesmores = {
      num: searchInputsmores.num.value.toLowerCase(),
      dateDepart: searchInputsmores.dateDepart.value.toLowerCase(),
      dateArrivee: searchInputsmores.dateArrivee.value.toLowerCase()
    }

    const filteredCargaisons = cargaisons.filter(cargaison => {
      const type = cargaison instanceof Maritime ? "Maritime" :
                   cargaison instanceof Aerienne ? "Aerienne" :
                   cargaison instanceof Routiere ? "Routiere" : "Inconnu";

      return (
        cargaison['_num'].toString().includes(searchQueriesmores.num) &&
        type.toLowerCase().includes(searchQueries.type) &&
        cargaison['_lieuDepart'].toLowerCase().includes(searchQueries.lieuDepart) &&
        cargaison['_lieuArrivee'].toLowerCase().includes(searchQueries.lieuArrivee) &&
        cargaison['_dateDepart'].toLowerCase().includes(searchQueriesmores.dateDepart) &&
        cargaison['_dateArrivee'].toLowerCase().includes(searchQueriesmores.dateArrivee)
      );
    });

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const cargaisonsToDisplay = filteredCargaisons.slice(startIndex, endIndex);

    cargaisonsToDisplay.forEach(cargaison => {
      const row = document.createElement("tr");
      row.classList.add("mt-8");

      const type = cargaison instanceof Maritime ? "Maritime" :
                   cargaison instanceof Aerienne ? "Aerienne" :
                   cargaison instanceof Routiere ? "Routiere" : "Inconnu";

      row.innerHTML = `
        <td class="px-6 py-4">${cargaison['_num']}</td>
        <td class="px-6 py-4">${type}</td>
        <td class="px-6 py-4">${cargaison['_dateDepart']}</td>
        <td class="px-6 py-4">${cargaison['_dateArrivee']}</td>
        <td class="px-6 py-4">${cargaison['_lieuDepart']}</td>
        <td class="px-6 py-4">${cargaison['_lieuArrivee']}</td>
      `;
      cargaisonTableBody.appendChild(row);
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
});


