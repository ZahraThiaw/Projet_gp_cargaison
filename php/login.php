<?php
// Lire le fichier JSON
$json = file_get_contents('../data/user.json');

if ($json === false) {
    echo json_encode(['status' => 'error', 'message' => 'Cannot read JSON file']);
    exit;
}

$users = json_decode($json, true);

if ($users === null) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON format']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer l'email et le mot de passe depuis la requête POST
    $email = $_POST['email'];
    $password = $_POST['password'];
    

    // Vérifier si l'utilisateur existe
    foreach ($users as $user) {
        if ($user['email'] === $email && $user['password'] === $password) {
            echo json_encode(['status' => 'success']);
            exit;
        }
    }

    echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
    exit;
} else {
    echo json_encode(['status' => 'invalid_method', 'message' => 'Invalid request method']);
    exit;
}
?>
