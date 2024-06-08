<!doctype html>
<html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../src/output.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
        <title>GP du Monde</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"  rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css" rel="stylesheet" type="text/css" />
        <script src="https://cdn.tailwindcss.com"></script>
        
    </head>

    <body class="bg-gray-100 flex">

        <div id="user-page" class="container mx-auto px-5 min-h-screen">
            <header>
            <h1 class="text-3xl font-bold text-center p-6 bg-white rounded-b-xl">GP du Monde Transporter vos produits en toute sécurité</h1>
            </header>

            <div>
                <h1 class="text-3xl font-bold text-blue-600 text-center mt-5">Voir l'état de votre produit</h1>
            </div>
            <div class="flex justify-between items-center mt-10">
                
                <!-- Input de recherche produit par code -->
                <div class="mb-6">
                    <label for="search-code-produit" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Entrer le code du produit</label>
                    <input type="search" id="search-code-produit" name="search-code-produit" placeholder="Rechercher un produit" class="p-2 rounded-lg border-2 border-gray-300">
                </div>

                <!-- Bouton se connecter -->
                <button id="login-btn" class="bg-blue-500 text-white py-2 px-4 rounded-md">Se connecter</button>
            </div>

            <div id="product-details" class="mt-10 bg-white p-6 rounded-lg shadow-md hidden">
                <h2 class="text-2xl font-bold text-blue-600 mb-4">Détails du produit</h2>
                <div id="product-info" class="text-lg"></div>
            </div>
            
        </div>

        <div id="login-page" class="container mx-auto px-5 min-h-screen hidden">
            <header>
                <h1 class="text-3xl font-bold text-center p-6 bg-white rounded-b-xl">GP du Monde Transporter vos produits en toute sécurité</h1>
            </header>

            <div id="login-form-container" class="flex justify-between items-center mt-20 p-1 max-w-xl mx-auto shadow-md  bg-white rounded-xl">
                <form id="login-form" class="space-y-4 mt-2 bg-white p-4 rounded-xl w-full mx-auto flex flex-col items-center">
                    <h2 class="text-2xl font-bold text-center text-blue-600">Se connecter</h2>
                    
                    <div class="w-full">
                        <label for="email-user" class="block text-base font-medium text-blue-600">Entrer votre email</label>
                        <input type="text" id="email-user" name="email-user"
                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-4 border-2" placeholder="Entrer votre email">
                        <span class="error-message text-red-600 text-sm"></span>
                    </div>
                    <div class="w-full">
                        <label for="password" class="block text-base font-medium text-blue-600">Entrer votre mot de passe</label>
                        <input type="text" id="password" name="password"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-4 border-2" placeholder="Entrer votre mot de passe">
                        <span class="error-message text-red-600 text-sm"></span>
                    </div>
                    
                    <button type="submit" id="connexion-btn" class="bg-blue-500 text-white py-2 rounded-md shadow-sm p-5">Connexion</button>
                </form>
            </div>
            
        <div>

        <script>
            // Interface pour un utilisateur simplement capable de chercher un produit par code

            const productdetails = document.getElementById('product-details') as HTMLDivElement;
            const productinfos = document.getElementById('product-info') as HTMLDivElement;
            const searchproduct = document.getElementById('search-code-produit') as HTMLInputElement;
            
            searchproduct.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    const searchValue = searchproduct.value.trim();
                    if (searchValue) {
                        const searchNum = Number(searchValue); // Conversion en nombre
                        //Parcourir la liste des cargaisons et trouver le produit correspondant
                        
                        Cargos.forEach((cargaison) => {
                            const products = cargaison._produits.find(product => product._code === searchNum);
                            console.log(cargaison._produits);
                            
                            
                            productdetails.classList.remove('hidden');
                            if (products) {
                                // Afficher les informations du produit
                                const detail = document.createElement("div");
                                detail.classList.add("max-w-5xl", "mx-auto", "bg-white", "shadow-md", "rounded-lg", "p-6");
                                detail.innerHTML = `
                                <div class="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                                    <h1 class="text-2xl py-3 font-bold bg-gradient-to-tl from-blue-400 to-blue-700 text-white mb-4 text-center rounded">Etat d'avancement de votre produit ${products._code}</h1>
                                    <div class="mb-20 space-y-2">
                                        <div class="mb-20 grid grid-cols-3">
                                            <p><i class="fas fa-barcode"></i> <strong>Code:</strong> ${products._code}</p>
                                            <p><i class="fas fa-box"></i> <strong>Libelle:</strong> ${products.libelle}</p>
                                            <p><i class="fas fa-clock"></i> <strong>Statut:</strong> ${products.statut}</p>
                                        </div>
                                        <div class="mb-20 mt-10 grid grid-cols-3">
                                            <p><i class="fas fa-calendar-alt"></i> <strong>Date de Départ:</strong> ${cargaison.getDateDepart()}</p>
                                            <p><i class="fas fa-calendar-alt"></i> <strong>Date d'Arrivée:</strong> ${cargaison.getDateArrivee()}</p>
                                        </div>
                                    </div>
                                </div>
                                `;

                                detail.appendChild(productinfos);
                                
                            } else {
                                productinfos.innerHTML = '<p class="text-center">Aucun produit correspondant.</p>';
                            }
                        });
                        
                    } else {
                        productdetails.classList.add('hidden');
                    }
                }
            });

            const loginbtn = document.getElementById('login-btn');
            const loginpage = document.getElementById('login-page');
            const userpage = document.getElementById('user-page');
            const main_gestionnaire = document.getElementById('main_gestionnaire');
            const loginform = document.getElementById('login-form');

            loginbtn.addEventListener('click', () => {
                loginpage.classList.remove('hidden');
                userpage.classList.add('hidden');

            });


            loginform.addEventListener('submit', async (e) => {
                e.preventDefault();

                const email = document.getElementById('email-user').value;
                const password = document.getElementById('password').value;
                const errorMessage = document.querySelectorAll('.error-message');

                const response = await fetch('../php/login.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({ email, password })
                });

                const result = await response.json();

                if (result.success) {
                    window.location.href = 'index.php';  // Redirige vers index.php
                } else {
                    errorMessage.forEach((span) => {
                        span.textContent = result.message;
                    });
                }
            });
        </script>

    </body>

</html>

