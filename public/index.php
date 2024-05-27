<!doctype html>
<html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../src/output.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <title>GP du Monde</title>
        
</head>

<body class="bg-gray-100 flex">
  <!-- Barre de navigation verticale -->
  <nav class="bg-white w-96 min-h-screen p-4 text-black ">
    <!-- <h2 class="text-4xl font-bold mb-4">GP du Monde</h2> -->
    <div class="flex justify-center">
    <img src="../public/images/logo.png" class="w-2/3 mt-10" alt="logo">
    </div>

    <ul class="mt-20">
      <li class="mb-5 flex justify-center">
        <a href="#dashboard"
          class="block w-4/5 py-2 px-4 border-2 border-blue-700 text-blue-700 rounded-lg hover:bg-slate-700 hover:text-white text-2xl text-center"
          onclick="showSection('dashboard')">Dashboard</a>
      </li>
      <li class="mb-5 flex justify-center">
        <a href="#cargaison"
          class="block w-4/5 py-2 px-4 border-2 border-blue-700 text-blue-700 rounded-lg hover:bg-slate-700 hover:text-white text-2xl text-center"
          onclick="showSection('cargaison')">Cargaison</a>
      </li>
      <li class="flex justify-center">
        <a href="#produit"
          class="block w-4/5 py-2 px-4 border-2 border-blue-700 text-blue-700 rounded-lg hover:bg-slate-700 hover:text-white text-2xl text-center"
          onclick="showSection('produit')">Produits</a>
      </li>
    </ul>
  </nav>

  <div class="container mx-auto px-5 flex-1">
    <header>
      <h1 class="text-3xl font-bold text-center p-6 bg-white rounded-b-xl">GP du Monde - Gestion des Cargaisons</h1>
    </header>
    <main class="py-5">
        <div class="flex flex-col space-y-8">
            <!-- Section Dashboard -->
            <section id="dashboard" class="section">
            <h2 class="text-2xl font-bold">Dashboard</h2>
            <p>Bienvenue sur le tableau de bord de la gestion des cargaisons et des produits.</p>
            </section>

            <section id="cargaison" class="section hidden relative">
                
            <!-- You can open the modal using ID.showModal() method -->
            <button class="btn bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm absolute right-0" onclick="my_modal_3.showModal()">Ajouter Cargaison</button>
            <dialog id="my_modal_3" class="modal">
            <div class="modal-box w-11/12 max-w-5xl">
                <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <div id="cargaison-form-container">
                    <form id="ajouter-cargaison-form" class="space-y-4 mt-2 bg-white p-4 rounded-xl w-full flex flex-wrap">
                        <h2 class="text-2xl font-bold text-center text-blue-600">Ajouter une Cargaison</h2>
                        <div class="w-full">
                            <label for="type-cargaison" class="block text-base font-medium text-blue-600">Type de Cargaison</label>
                            <select id="type-cargaison" name="type-cargaison"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border-2">
                                <option value="Aerienne">Aérienne</option>
                                <option value="Maritime">Maritime</option>
                                <option value="Routiere">Routière</option>
                            </select>
                        </div>
                        <div class="w-1/2">
                            <label for="dateDepart" class="block text-base font-medium text-blue-600">Date de Départ</label>
                            <input type="date" id="dateDepart" name="dateDepart"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border-2">
                        </div>
                        <div class="w-1/2">
                            <label for="dateArrivee" class="block text-base font-medium text-blue-600">Date d'Arrivée</label>
                            <input type="date" id="dateArrivee" name="dateArrivee"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border-2">
                        </div>
                        <div class="flex flex-col w-1/2">
                            <label for="lieu-depart" class="block text-base font-medium text-blue-600">Lieu de Départ</label>
                            <input type="text" id="lieu-depart" name="lieu-depart" placeholder="Lieu de Départ"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border-2">
                        </div>
                        <div class="flex flex-col w-1/2">
                            <label for="lieu-arrivee" class="block text-base font-medium text-blue-600">Lieu d'Arrivée</label>
                            <input type="text" id="lieu-arrivee" name="lieu-arrivee" placeholder="Lieu d'Arrivée"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border-2">
                        </div>
                        <div class="w-1/2">
                            <label for="poidsOuProduits" class="block text-base font-medium text-blue-600">Choisir Limite</label>
                            <select id="poidsOuProduits" name="poidsOuProduits"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border-2" onchange="toggleFields()">
                                <option value="">Sélectionner une option</option>
                                <option value="poidsMax">Poids Max</option>
                                <option value="nbProduitsMax">Nombre de Produits Max</option>
                            </select>
                        </div>
                        <div id="poidsMaxDiv" class="w-1/2 hidden">
                            <label for="poidsMax" class="block text-base font-medium text-blue-600">Poids Max</label>
                            <input type="number" id="poidsMax" name="poidsMax" placeholder="Poids Max"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border-2">
                        </div>
                        <div id="nbProduitsMaxDiv" class="w-1/2 hidden">
                            <label for="nbProduitsMax" class="block text-base font-medium text-blue-600">Nombre de produits Max</label>
                            <input type="number" id="nbProduitsMax" name="nbProduitsMax" placeholder="Nombre de Produits Max"
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border-2">
                        </div>
                        <div id="map" class="h-64 mt-4 w-full"></div>
                        <div class="w-1/2">
                            <label for="distance" class="block text-base font-medium text-blue-600">Distance</label>
                            <input type="text" id="distance" name="distance" readonly
                                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border-2">
                        </div>
                        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md shadow-sm">Ajouter Cargaison</button>
                    </form>
                </div>
            </div>
            </dialog>

                <div class="w-full">
                    <h2 class="text-2xl font-bold mt-4">Liste des Cargaisons</h2>
                    
                    <div id="cargaison-container" class="relative overflow-x-auto mt-8">
                        <input type="text" id="search-input" placeholder="Rechercher..." class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border-2">
                        <table id="cargaison-table" class="mt-10 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2">
                            <thead class="text-xl text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Numéro
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Type
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Date de départ
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Date d'arrivée
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Lieu de départ
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Lieu d'arrivée
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="text-xl">
                                <!-- Les cargaisons seront ajoutées ici -->
                            </tbody>
                        </table>

                        <div id="pagination" class="mt-10">
                            <!-- Les boutons de pagination seront ajoutés ici par JavaScript -->
                        </div>
                    </div>

                </div>
            </section>

        
        </div>
    </main>
  </div>

  <script>
    function showSection(sectionId) {
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        if (section.id === sectionId) {
          section.classList.remove('hidden');
        } else {
          section.classList.add('hidden');
        }
      });
    }

    // Affiche la section dashboard par défaut
    showSection('dashboard');
  </script>


  <script src="../dist/test.js" type="module"></script>
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <script>
        function toggleFields() {
            const poidsOuProduits = document.getElementById('poidsOuProduits').value;
            document.getElementById('poidsMaxDiv').classList.toggle('hidden', poidsOuProduits !== 'poidsMax');
            document.getElementById('nbProduitsMaxDiv').classList.toggle('hidden', poidsOuProduits !== 'nbProduitsMax');
        }

        const map = L.map('map').setView([48.8566, 2.3522], 13); // Paris par défaut
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        let startMarker, endMarker;
        const startInput = document.getElementById('lieu-depart');
        const endInput = document.getElementById('lieu-arrivee');
        const distanceInput = document.getElementById('distance');

        map.on('click', function (e) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

            if (!startMarker || startInput.value === "") {
                // Effacer le marqueur de départ s'il existe
                if (startMarker) {
                    map.removeLayer(startMarker);
                }
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const cityName = data.address.city || data.address.town || data.address.village || data.address.country || "Lieu inconnu";
                        startInput.value = cityName;
                    })
                    .catch(error => {
                        console.error(error);
                        startInput.value = "Erreur de géocodage";
                    });

                startMarker = L.marker(e.latlng, { draggable: true }).addTo(map)
                    .bindPopup('Lieu de Départ')
                    .openPopup();

                startMarker.on('dragend', function () {
                    getCityName(startMarker.getLatLng(), startInput);
                    calculateDistance();
                });

            } else if (!endMarker || endInput.value === "") {
                // Effacer le marqueur d'arrivée s'il existe
                if (endMarker) {
                    map.removeLayer(endMarker);
                }
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const cityName = data.address.city || data.address.town || data.address.village || data.address.country || "Lieu inconnu";
                        endInput.value = cityName;
                    })
                    .catch(error => {
                        console.error(error);
                        endInput.value = "Erreur de géocodage";
                    });

                endMarker = L.marker(e.latlng, { draggable: true }).addTo(map)
                    .bindPopup('Lieu d\'Arrivée')
                    .openPopup();

                endMarker.on('dragend', function () {
                    getCityName(endMarker.getLatLng(), endInput);
                    calculateDistance();
                });

                calculateDistance();
            }
        });

        function calculateDistance() {
            if (startMarker && endMarker) {
                const startLatLng = startMarker.getLatLng();
                const endLatLng = endMarker.getLatLng();
                const distance = map.distance(startLatLng, endLatLng) / 1000; // distance en kilomètres
                distanceInput.value = distance.toFixed(2) + ' km';
            } else {
                distanceInput.value = '';
            }
        }

        function getCityName(latlng, inputElement) {
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const address = data.address;
                    const cityName = address.city || address.town || address.village || address.country || "Lieu inconnu";
                    inputElement.value = cityName;
                })
                .catch(error => {
                    console.error('Error:', error);
                    inputElement.value = "Erreur de géocodage";
                });
        }
    </script>
</body>

</html>