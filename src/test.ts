// function greet(name: string): string {
//     return `Bonjour, ${name}!`;
// }

// const user = "Alice";
// console.log(greet(user));


// //main.ts

// import { Maritime } from './Model/Maritime.js';
// import { Aerienne } from './Model/Aerrienne.js';
// import { Routiere } from './Model/Routiere.js';
// import { Cargaison } from './Model/Cargaison.js';

// document.addEventListener("DOMContentLoaded", () => {
//   let cargaisons: Cargaison[] = [];
//   let cargaisonCounter = 1;
//   let page = 1;
//   const itemsPerPage = 2; // Nombre d'éléments par page

//   const form = document.getElementById("ajouter-cargaison-form") as HTMLFormElement;
//   const cargaisonTableBody = document.querySelector("#cargaison-table tbody") as HTMLTableSectionElement;

//   // Charger les cargaisons existantes depuis le fichier JSON
//   fetch("../php/data.php")
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       data.cargo.forEach((cargo: any) => {
//         console.log('Traitement de la cargaison:', cargo);
//         let cargaison: Cargaison;
//         switch (cargo.type) {
//           case 'Maritime':
//             cargaison = new Maritime(cargo.distance, cargaisonCounter++, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
//             break;
//           case 'Aerienne':
//             cargaison = new Aerienne(cargo.distance, cargaisonCounter++, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
//             break;
//           case 'Routiere':
//             cargaison = new Routiere(cargo.distance, cargaisonCounter++, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
//             break;
//           default:
//             console.error('Type de cargaison inconnu', cargo.type);
//             return;
//         }
//         cargaisons.push(cargaison);
//       });
//       afficherCargaisons();
//     })
//     .catch(error => {
//       console.error('Erreur lors du chargement des cargaisons :', error);
//     });

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const type = (document.getElementById("type-cargaison") as HTMLSelectElement).value;
//     const dateDepart = (document.getElementById("dateDepart") as HTMLInputElement).value;
//     const dateArrivee = (document.getElementById("dateArrivee") as HTMLInputElement).value;
//     const poidsMax = (document.getElementById("poidsMax") as HTMLInputElement).valueAsNumber;
//     const nbProduitsMax = (document.getElementById("nbProduitsMax") as HTMLInputElement).valueAsNumber;
//     const lieuDepart = (document.getElementById("lieu-depart") as HTMLInputElement).value;
//     const lieuArrivee = (document.getElementById("lieu-arrivee") as HTMLInputElement).value;
//     const distance = parseFloat((document.getElementById("distance") as HTMLInputElement).value);

//     let nouvelleCargaison: Cargaison;

//     console.log('Création de la nouvelle cargaison:', {
//       type, dateDepart, dateArrivee, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, distance
//     });

//     switch (type) {
//       case 'Maritime':
//         nouvelleCargaison = new Maritime(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
//         break;
//       case 'Aerienne':
//         nouvelleCargaison = new Aerienne(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
//         break;
//       case 'Routiere':
//         nouvelleCargaison = new Routiere(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
//         break;
//       default:
//         console.error('Type de cargaison inconnu', type);
//         return;
//     }

//     cargaisons.push(nouvelleCargaison);

//     // Envoyer les cargaisons mises à jour au serveur
//     fetch("../php/data.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ cargo: cargaisons.map(c => ({
//         type: c instanceof Maritime ? 'Maritime' : c instanceof Aerienne ? 'Aerienne' : c instanceof Routiere ? 'Routiere' : 'inconnu',
//         distance: c['_distance'],
//         poidsMax: c['_poidsMax'],
//         nbProduitsMax: c['_nbProduitsMax'],
//         lieuDepart: c['_lieuDepart'],
//         lieuArrivee: c['_lieuArrivee'],
//         dateDepart: c['_dateDepart'],
//         dateArrivee: c['_dateArrivee'],
//       })) })
//     })
//     .then(response => response.text()) // Notez le changement de response.json() à response.text()
//     .then(data => {
//       console.log(data);
//       afficherCargaisons();
//       form.reset();
//       form.classList.add("hidden");
//     })
//     .catch(error => {
//       console.error('Erreur lors de l\'envoi des cargaisons :', error);
//     });
//   });

//   // function afficherCargaisons() {
//   //   cargaisonTableBody.innerHTML = '';
//   //   cargaisons.forEach(cargaison => {
//   //   const row = document.createElement("tr");
//   //   row.classList.add("mt-8");

//   //     const type = cargaison instanceof Maritime ? "Maritime" :
//   //                  cargaison instanceof Aerienne ? "Aerienne" :
//   //                  cargaison instanceof Routiere ? "Routiere" : "Inconnu";

//   //       row.innerHTML = `
//   //           <td class="px-6 py-4">
//   //           ${cargaison['_num']}
//   //           </td>
//   //           <td class="px- py-6">
//   //           ${type}
//   //           </td>
//   //           <td class="px-6 py-4">
//   //           ${cargaison['_dateDepart']}
//   //           </td>
//   //           <td class="px-6 py-4">
//   //           ${cargaison['_dateArrivee']}
//   //           </td>
//   //           <td class="px-6 py-4">
//   //           ${cargaison['_lieuDepart']}
//   //           </td>
//   //           <td class="px-6 py-4">
//   //           ${cargaison['_lieuArrivee']}
//   //           </td>
//   //     `;
//   //     cargaisonTableBody.appendChild(row);
//   //   });
//   // }

//   function afficherCargaisons() {
//     cargaisonTableBody.innerHTML = '';
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const cargaisonsToDisplay = cargaisons.slice(startIndex, endIndex);

//     cargaisonsToDisplay.forEach(cargaison => {
//       const row = document.createElement("tr");
//       row.classList.add("mt-8");

//       const type = cargaison instanceof Maritime ? "Maritime" :
//                    cargaison instanceof Aerienne ? "Aerienne" :
//                    cargaison instanceof Routiere ? "Routiere" : "Inconnu";

//       row.innerHTML = `
//         <td class="px-6 py-4">${cargaison['_num']}</td>
//         <td class="px- py-6">${type}</td>
//         <td class="px-6 py-4">${cargaison['_dateDepart']}</td>
//         <td class="px-6 py-4">${cargaison['_dateArrivee']}</td>
//         <td class="px-6 py-4">${cargaison['_lieuDepart']}</td>
//         <td class="px-6 py-4">${cargaison['_lieuArrivee']}</td>
//       `;
//       cargaisonTableBody.appendChild(row);
//     });

//     // Affichage des boutons de pagination
//     const paginationContainer = document.getElementById("pagination") as HTMLDivElement;
//     paginationContainer.innerHTML = '';
//     const totalPages = Math.ceil(cargaisons.length / itemsPerPage);
//     for (let i = 1; i <= totalPages; i++) {
//       const button = document.createElement("button");
//       button.textContent = i.toString();
//       button.classList.add("mx-2", "px-4", "py-1", "bg-blue-500", "text-white", "rounded");
//       if (i === page) {
//         button.classList.add("bg-blue-700");
//       }
//       button.addEventListener("click", () => {
//         page = i;
//         afficherCargaisons();
//       });
//       paginationContainer.appendChild(button);

//       // Ajouter un espace après chaque bouton, sauf le dernier
//       if (i < totalPages) {
//         const space = document.createTextNode(" ");
//         paginationContainer.appendChild(space);
//       }
//     }


//   }
// });


// import { Maritime } from './Model/Maritime.js';
// import { Aerienne } from './Model/Aerrienne.js';
// import { Routiere } from './Model/Routiere.js';
// import { Cargaison } from './Model/Cargaison.js';

// document.addEventListener("DOMContentLoaded", () => {
//   let cargaisons: Cargaison[] = [];
//   let cargaisonCounter = 1;
//   let page = 1;
//   const itemsPerPage = 3; // Nombre d'éléments par page

//   const form = document.getElementById("ajouter-cargaison-form") as HTMLFormElement;
//   const cargaisonTableBody = document.querySelector("#cargaison-table tbody") as HTMLTableSectionElement;
//   const searchInput = document.getElementById("search-input") as HTMLInputElement;

//   // Charger les cargaisons existantes depuis le fichier JSON
//   fetch("../php/data.php")
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       data.cargo.forEach((cargo: any) => {
//         console.log('Traitement de la cargaison:', cargo);
//         let cargaison: Cargaison;
//         switch (cargo.type) {
//           case 'Maritime':
//             cargaison = new Maritime(cargo.distance, cargaisonCounter++, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
//             break;
//           case 'Aerienne':
//             cargaison = new Aerienne(cargo.distance, cargaisonCounter++, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
//             break;
//           case 'Routiere':
//             cargaison = new Routiere(cargo.distance, cargaisonCounter++, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
//             break;
//           default:
//             console.error('Type de cargaison inconnu', cargo.type);
//             return;
//         }
//         cargaisons.push(cargaison);
//       });
//       afficherCargaisons();
//     })
//     .catch(error => {
//       console.error('Erreur lors du chargement des cargaisons :', error);
//     });

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const type = (document.getElementById("type-cargaison") as HTMLSelectElement).value;
//     const dateDepart = (document.getElementById("dateDepart") as HTMLInputElement).value;
//     const dateArrivee = (document.getElementById("dateArrivee") as HTMLInputElement).value;
//     const poidsMax = (document.getElementById("poidsMax") as HTMLInputElement).valueAsNumber;
//     const nbProduitsMax = (document.getElementById("nbProduitsMax") as HTMLInputElement).valueAsNumber;
//     const lieuDepart = (document.getElementById("lieu-depart") as HTMLInputElement).value;
//     const lieuArrivee = (document.getElementById("lieu-arrivee") as HTMLInputElement).value;
//     const distance = parseFloat((document.getElementById("distance") as HTMLInputElement).value);

//     let nouvelleCargaison: Cargaison;

//     console.log('Création de la nouvelle cargaison:', {
//       type, dateDepart, dateArrivee, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, distance
//     });

//     switch (type) {
//       case 'Maritime':
//         nouvelleCargaison = new Maritime(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
//         break;
//       case 'Aerienne':
//         nouvelleCargaison = new Aerienne(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
//         break;
//       case 'Routiere':
//         nouvelleCargaison = new Routiere(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
//         break;
//       default:
//         console.error('Type de cargaison inconnu', type);
//         return;
//     }

//     cargaisons.push(nouvelleCargaison);

//     // Envoyer les cargaisons mises à jour au serveur
//     fetch("../php/data.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ cargo: cargaisons.map(c => ({
//         type: c instanceof Maritime ? 'Maritime' : c instanceof Aerienne ? 'Aerienne' : c instanceof Routiere ? 'Routiere' : 'inconnu',
//         distance: c['_distance'],
//         poidsMax: c['_poidsMax'],
//         nbProduitsMax: c['_nbProduitsMax'],
//         lieuDepart: c['_lieuDepart'],
//         lieuArrivee: c['_lieuArrivee'],
//         dateDepart: c['_dateDepart'],
//         dateArrivee: c['_dateArrivee'],
//       })) })
//     })
//     .then(response => response.text()) // Notez le changement de response.json() à response.text()
//     .then(data => {
//       console.log(data);
//       afficherCargaisons();
//       form.reset();
//       form.classList.add("hidden");
//     })
//     .catch(error => {
//       console.error('Erreur lors de l\'envoi des cargaisons :', error);
//     });
//   });

//   searchInput.addEventListener("input", () => {
//     page = 1; // Reset to first page on new search
//     afficherCargaisons();
//   });

//   function afficherCargaisons() {
//     cargaisonTableBody.innerHTML = '';
//     const searchQuery = searchInput.value.toLowerCase();
//     const filteredCargaisons = cargaisons.filter(cargaison => {
//       const type = cargaison instanceof Maritime ? "Maritime" :
//                    cargaison instanceof Aerienne ? "Aerienne" :
//                    cargaison instanceof Routiere ? "Routiere" : "Inconnu";

//       return (
//         cargaison['_num'].toString().includes(searchQuery) ||
//         type.toLowerCase().includes(searchQuery) ||
//         cargaison['_lieuDepart'].toLowerCase().includes(searchQuery) ||
//         cargaison['_lieuArrivee'].toLowerCase().includes(searchQuery) ||
//         cargaison['_dateDepart'].toLowerCase().includes(searchQuery) ||
//         cargaison['_dateArrivee'].toLowerCase().includes(searchQuery)
//       );
//     });

//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const cargaisonsToDisplay = filteredCargaisons.slice(startIndex, endIndex);

//     cargaisonsToDisplay.forEach(cargaison => {
//       const row = document.createElement("tr");
//       row.classList.add("mt-8");

//       const type = cargaison instanceof Maritime ? "Maritime" :
//                    cargaison instanceof Aerienne ? "Aerienne" :
//                    cargaison instanceof Routiere ? "Routiere" : "Inconnu";

//       row.innerHTML = `
//         <td class="px-6 py-4">${cargaison['_num']}</td>
//         <td class="px- py-6">${type}</td>
//         <td class="px-6 py-4">${cargaison['_dateDepart']}</td>
//         <td class="px-6 py-4">${cargaison['_dateArrivee']}</td>
//         <td class="px-6 py-4">${cargaison['_lieuDepart']}</td>
//         <td class="px-6 py-4">${cargaison['_lieuArrivee']}</td>
//       `;
//       cargaisonTableBody.appendChild(row);
//     });

//     // Affichage des boutons de pagination
//     const paginationContainer = document.getElementById("pagination") as HTMLDivElement;
//     paginationContainer.innerHTML = '';
//     const totalPages = Math.ceil(filteredCargaisons.length / itemsPerPage);
//     for (let i = 1; i <= totalPages; i++) {
//       const button = document.createElement("button");
//       button.textContent = i.toString();
//       button.classList.add("mx-2", "px-4", "py-1", "bg-blue-500", "text-white", "rounded");
//       if (i === page) {
//         button.classList.add("bg-blue-700");
//       }
//       button.addEventListener("click", () => {
//         page = i;
//         afficherCargaisons();
//       });
//       paginationContainer.appendChild(button);

//       // Ajouter un espace après chaque bouton, sauf le dernier
//       if (i < totalPages) {
//         const space = document.createTextNode(" ");
//         paginationContainer.appendChild(space);
//       }
//     }
//   }
// });





import { Maritime } from './Model/Maritime.js';
import { Aerienne } from './Model/Aerrienne.js';
import { Routiere } from './Model/Routiere.js';
import { Cargaison } from './Model/Cargaison.js';

document.addEventListener("DOMContentLoaded", () => {
  let cargaisons: Cargaison[] = [];
  let cargaisonCounter = 1;
  let page = 1;
  const itemsPerPage = 3; // Nombre d'éléments par page

  const form = document.getElementById("ajouter-cargaison-form") as HTMLFormElement;
  const cargaisonTableBody = document.querySelector("#cargaison-table tbody") as HTMLTableSectionElement;
  const searchInput = document.getElementById("search-input") as HTMLInputElement;

  // Charger les cargaisons existantes depuis le fichier JSON
  fetch("../php/data.php")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.cargo.forEach((cargo: any) => {
        console.log('Traitement de la cargaison:', cargo);
        let cargaison: Cargaison;
        switch (cargo.type) {
          case 'Maritime':
            cargaison = new Maritime(cargo.distance, cargaisonCounter++, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
            break;
          case 'Aerienne':
            cargaison = new Aerienne(cargo.distance, cargaisonCounter++, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
            break;
          case 'Routiere':
            cargaison = new Routiere(cargo.distance, cargaisonCounter++, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
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

    // Validation des champs
    let isValid = true;
    const today = new Date().toISOString().split("T")[0];
    const errors: string[] = [];

    if (!type) {
      isValid = false;
      errors.push("Type de cargaison est requis.");
    }

    if (!dateDepart) {
      isValid = false;
      errors.push("Date de départ est requise.");
    } else if (dateDepart < today) {
      isValid = false;
      errors.push("Date de départ doit être aujourd'hui ou plus tard.");
    }

    if (!dateArrivee) {
      isValid = false;
      errors.push("Date d'arrivée est requise.");
    } else if (dateArrivee < dateDepart) {
      isValid = false;
      errors.push("Date d'arrivée doit être après la date de départ.");
    }

    if (!lieuDepart) {
      isValid = false;
      errors.push("Lieu de départ est requis.");
    }

    if (!lieuArrivee) {
      isValid = false;
      errors.push("Lieu d'arrivée est requis.");
    }

    if (!distance) {
      isValid = false;
      errors.push("Distance est requise.");
    }

    if (poidsOuProduits === "poidsMax") {
      if (!poidsMax) {
        isValid = false;
        errors.push("Poids maximum est requis.");
      }
    } else if (poidsOuProduits === "nbProduitsMax") {
      if (!nbProduitsMax) {
        isValid = false;
        errors.push("Nombre de produits maximum est requis.");
      }
    } else {
      isValid = false;
      errors.push("Sélectionnez une option pour Poids ou Nombre de produits.");
    }

    if (!isValid) {
      alert(errors.join("\n"));
      return;
    }

    let nouvelleCargaison: Cargaison;

    switch (type) {
      case 'Maritime':
        nouvelleCargaison = new Maritime(distance, cargaisonCounter++, parseFloat(poidsMax), parseInt(nbProduitsMax), lieuDepart, lieuArrivee, dateDepart, dateArrivee);
        break;
      case 'Aerienne':
        nouvelleCargaison = new Aerienne(distance, cargaisonCounter++, parseFloat(poidsMax), parseInt(nbProduitsMax), lieuDepart, lieuArrivee, dateDepart, dateArrivee);
        break;
      case 'Routiere':
        nouvelleCargaison = new Routiere(distance, cargaisonCounter++, parseFloat(poidsMax), parseInt(nbProduitsMax), lieuDepart, lieuArrivee, dateDepart, dateArrivee);
        break;
      default:
        console.error('Type de cargaison inconnu', type);
        return;
    }

    cargaisons.push(nouvelleCargaison);

    // Envoyer les cargaisons mises à jour au serveur
    fetch("../php/data.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cargo: cargaisons.map(c => ({
        type: c instanceof Maritime ? 'Maritime' : c instanceof Aerienne ? 'Aerienne' : c instanceof Routiere ? 'Routiere' : 'inconnu',
        distance: c['_distance'],
        poidsMax: c['_poidsMax'],
        nbProduitsMax: c['_nbProduitsMax'],
        lieuDepart: c['_lieuDepart'],
        lieuArrivee: c['_lieuArrivee'],
        dateDepart: c['_dateDepart'],
        dateArrivee: c['_dateArrivee'],
      })) })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      afficherCargaisons();
      form.reset();
      form.classList.add("hidden");
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi des cargaisons :', error);
    });
  });

  searchInput.addEventListener("input", () => {
    page = 1; // Reset to first page on new search
    afficherCargaisons();
  });

  function afficherCargaisons() {
    cargaisonTableBody.innerHTML = '';
    const searchQuery = searchInput.value.toLowerCase();
    const filteredCargaisons = cargaisons.filter(cargaison => {
      const type = cargaison instanceof Maritime ? "Maritime" :
                   cargaison instanceof Aerienne ? "Aerienne" :
                   cargaison instanceof Routiere ? "Routiere" : "Inconnu";

      return (
        cargaison['_num'].toString().includes(searchQuery) ||
        type.toLowerCase().includes(searchQuery) ||
        cargaison['_lieuDepart'].toLowerCase().includes(searchQuery) ||
        cargaison['_lieuArrivee'].toLowerCase().includes(searchQuery) ||
        cargaison['_dateDepart'].toLowerCase().includes(searchQuery) ||
        cargaison['_dateArrivee'].toLowerCase().includes(searchQuery)
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
        <td class="px- py-6">${type}</td>
        <td class="px-6 py-4">${cargaison['_dateDepart']}</td>
        <td class="px-6 py-4">${cargaison['_dateArrivee']}</td>
        <td class="px-6 py-4">${cargaison['_lieuDepart']}</td>
        <td class="px-6 py-4">${cargaison['_lieuArrivee']}</td>
      `;
      cargaisonTableBody.appendChild(row);
    });

    // Affichage des boutons de pagination
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

