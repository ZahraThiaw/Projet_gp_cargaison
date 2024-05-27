function greet(name: string): string {
    return `Bonjour, ${name}!`;
}

const user = "Alice";
console.log(greet(user));

// fetch("../php/getCargaisons.php")
//     .then(response => response.json())
//     .then(data => {
//       console.log(data)
      
      
//     })
//     .catch(error => {
//       console.error(error);
//     });



// main.ts
// import { Maritime } from './Model/Maritime.js';
// import { Aerienne } from './Model/Aerrienne.js';
// import { Routiere } from './Model/Routiere.js';
// import { Cargaison } from './Model/Cargaison.js';

// document.addEventListener("DOMContentLoaded", () => {
//   let cargaisons: Cargaison[] = [];
//   let cargaisonCounter = 1;

//   const form = document.getElementById("ajouter-cargaison-form") as HTMLFormElement;
//   const cargaisonTableBody = document.querySelector("#cargaison-table tbody") as HTMLTableSectionElement;

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

//     switch (type) {
//       case 'maritime':
//         nouvelleCargaison = new Maritime(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
//         break;
//       case 'aerienne':
//         nouvelleCargaison = new Aerienne(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
//         break;
//       case 'routiere':
//         nouvelleCargaison = new Routiere(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
//         break;
//       default:
//         console.error('Type de cargaison inconnu');
//         return;
//     }

//     cargaisons.push(nouvelleCargaison);
//     afficherCargaisons();
//     form.reset();

//     form.classList.add("hidden");
//   });

//   function afficherCargaisons() {
//     cargaisonTableBody.innerHTML = '';
//     cargaisons.forEach(cargaison => {
//       const row = document.createElement("tr");

//       const type = cargaison instanceof Maritime ? "Maritime" :
//                    cargaison instanceof Aerienne ? "Aérienne" :
//                    cargaison instanceof Routiere ? "Routière" : "Inconnu";

//       row.innerHTML = `
//         <td>${cargaison['_num']}</td>
//         <td>${type}</td>
//         <td>${cargaison['_dateDepart']}</td>
//         <td>${cargaison['_dateArrivee']}</td>
//         <td>${cargaison['_lieuDepart']}</td>
//         <td>${cargaison['_lieuArrivee']}</td>
//       `;
//       cargaisonTableBody.appendChild(row);
//     });
//   }
// });


import { Maritime } from './Model/Maritime.js';
import { Aerienne } from './Model/Aerrienne.js';
import { Routiere } from './Model/Routiere.js';
import { Cargaison } from './Model/Cargaison.js';

// document.addEventListener("DOMContentLoaded", () => {
//   let cargaisons: Cargaison[] = [];
//   let cargaisonCounter = 1;

//   const form = document.getElementById("ajouter-cargaison-form") as HTMLFormElement;
//   const cargaisonTableBody = document.querySelector("#cargaison-table tbody") as HTMLTableSectionElement;

//   // Chargement initial des données
//   fetch("../php/data.php")
//     .then(response => response.json())
//     .then(data => {
//       data.cargo.forEach((cargo: any) => {
//         let cargaison: Cargaison;
//         if (cargo.type === 'maritime') {
//           cargaison = new Maritime(cargo.distance, cargo.num, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
//         } else if (cargo.type === 'aerienne') {
//           cargaison = new Aerienne(cargo.distance, cargo.num, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
//         } else if (cargo.type === 'routiere') {
//           cargaison = new Routiere(cargo.distance, cargo.num, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
//         }
//         cargaisons.push(cargaison);
//       });
//       afficherCargaisons();
//     })
//     .catch(error => {
//       console.error(error);
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

//     switch (type) {
//       case 'maritime':
//         nouvelleCargaison = new Maritime(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
//         break;
//       case 'aerienne':
//         nouvelleCargaison = new Aerienne(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
//         break;
//       case 'routiere':
//         nouvelleCargaison = new Routiere(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
//         break;
//       default:
//         console.error('Type de cargaison inconnu');
//         return;
//     }

//     fetch("../php/data.php")
//       .then(response => response.json())
//       .then(data => {
//         data.cargo.push({
//           type: type,
//           distance: distance,
//           num: cargaisonCounter - 1,
//           poidsMax: poidsMax,
//           nbProduitsMax: nbProduitsMax,
//           lieuDepart: lieuDepart,
//           lieuArrivee: lieuArrivee,
//           dateDepart: dateDepart,
//           dateArrivee: dateArrivee
//         });

//         // Envoie des données mises à jour au serveur
//         return fetch("../php/data.php", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(data)
//         });
//       })
//       .then(() => {
//         cargaisons.push(nouvelleCargaison);
//         afficherCargaisons();
//         form.reset();
//         form.classList.add("hidden");
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   });

//   function afficherCargaisons() {
//     cargaisonTableBody.innerHTML = '';
//     cargaisons.forEach(cargaison => {
//       const row = document.createElement("tr");

//       const type = cargaison instanceof Maritime ? "Maritime" :
//                    cargaison instanceof Aerienne ? "Aérienne" :
//                    cargaison instanceof Routiere ? "Routière" : "Inconnu";

//       row.innerHTML = `
//         <td>${cargaison['_num']}</td>
//         <td>${type}</td>
//         <td>${cargaison['_dateDepart']}</td>
//         <td>${cargaison['_dateArrivee']}</td>
//         <td>${cargaison['_lieuDepart']}</td>
//         <td>${cargaison['_lieuArrivee']}</td>
//       `;
//       cargaisonTableBody.appendChild(row);
//     });
//   }
// });


document.addEventListener("DOMContentLoaded", () => {
    let cargaisons: Cargaison[] = [];
    let cargaisonCounter = 1;

    const form = document.getElementById("ajouter-cargaison-form") as HTMLFormElement;
    const cargaisonTableBody = document.querySelector("#cargaison-table tbody") as HTMLTableSectionElement;

    // Chargement initial des données
    fetch("../php/data.php")
        .then(response => response.json())
        .then(data => {
            data.cargo.forEach((cargo: any) => {
                let cargaison: Cargaison | undefined; // Déclarer la variable avec un type potentiellement indéfini
                if (cargo.type === 'maritime') {
                    cargaison = new Maritime(cargo.distance, cargo.num, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
                } else if (cargo.type === 'aerienne') {
                    cargaison = new Aerienne(cargo.distance, cargo.num, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
                } else if (cargo.type === 'routiere') {
                    cargaison = new Routiere(cargo.distance, cargo.num, cargo.poidsMax, cargo.nbProduitsMax, cargo.lieuDepart, cargo.lieuArrivee, cargo.dateDepart, cargo.dateArrivee);
                } else {
                    console.error('Type de cargaison inconnu');
                    return;
                }
                if (cargaison !== undefined) { // Vérifier si cargaison a été initialisée
                    cargaisons.push(cargaison);
                }
            });
            afficherCargaisons();
        })
        .catch(error => {
            console.error(error);
        });

    form.addEventListener("submit", (event) => {
            event.preventDefault();
        
            const type = (document.getElementById("type-cargaison") as HTMLSelectElement).value;
            const dateDepart = (document.getElementById("dateDepart") as HTMLInputElement).value;
            const dateArrivee = (document.getElementById("dateArrivee") as HTMLInputElement).value;
            const poidsMax = (document.getElementById("poidsMax") as HTMLInputElement).valueAsNumber;
            const nbProduitsMax = (document.getElementById("nbProduitsMax") as HTMLInputElement).valueAsNumber;
            const lieuDepart = (document.getElementById("lieu-depart") as HTMLInputElement).value;
            const lieuArrivee = (document.getElementById("lieu-arrivee") as HTMLInputElement).value;
            const distance = parseFloat((document.getElementById("distance") as HTMLInputElement).value);
        
            let nouvelleCargaison: Cargaison;
        
            switch (type) {
              case 'maritime':
                nouvelleCargaison = new Maritime(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
                break;
              case 'aerienne':
                nouvelleCargaison = new Aerienne(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
                break;
              case 'routiere':
                nouvelleCargaison = new Routiere(distance, cargaisonCounter++, poidsMax, nbProduitsMax, lieuDepart, lieuArrivee, dateDepart, dateArrivee);
                break;
              default:
                console.error('Type de cargaison inconnu');
                return;
            }
        
            fetch("../php/data.php")
              .then(response => response.json())
              .then(data => {
                data.cargo.push({
                  type: type,
                  distance: distance,
                  num: cargaisonCounter - 1,
                  poidsMax: poidsMax,
                  nbProduitsMax: nbProduitsMax,
                  lieuDepart: lieuDepart,
                  lieuArrivee: lieuArrivee,
                  dateDepart: dateDepart,
                  dateArrivee: dateArrivee
                });
        
                // Envoie des données mises à jour au serveur
                return fetch("../php/data.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(data)
                });
              })
              .then(() => {
                cargaisons.push(nouvelleCargaison);
                afficherCargaisons();
                form.reset();
                form.classList.add("hidden");
              })
              .catch(error => {
                console.error(error);
              });
          });

    function afficherCargaisons() {
        cargaisonTableBody.innerHTML = '';
        cargaisons.forEach(cargaison => {
            const row = document.createElement("tr");

            const type = cargaison instanceof Maritime ? "Maritime" :
                cargaison instanceof Aerienne ? "Aérienne" :
                cargaison instanceof Routiere ? "Routière" : "Inconnu";

            row.innerHTML = `
                <td>${cargaison['_num']}</td>
                <td>${type}</td>
                <td>${cargaison['_dateDepart']}</td>
                <td>${cargaison['_dateArrivee']}</td>
                <td>${cargaison['_lieuDepart']}</td>
                <td>${cargaison['_lieuArrivee']}</td>
            `;
            cargaisonTableBody.appendChild(row);
        });
    }
});


