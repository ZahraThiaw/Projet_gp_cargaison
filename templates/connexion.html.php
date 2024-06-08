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
    </body>
    

</html>