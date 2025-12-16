<?php
// --- MODE DÉBOGAGE ACTIVÉ ---
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Vos identifiants
$api_token = '82be06d4-7bba-4bf2-8dd1-45078ba0a3f8'; 
$template_id = '7106054d-70b9-43b0-8233-9efed49d8053';

// Données de test
$data = [
    'template_id' => $template_id,
    'title' => 'Test Contrat Debug',
    'signers' => [
        [
            'name' => 'Test User',
            'email' => 'rayen.ben-ghorbal@securitrust.fr',
            'signature_request_delivery_method' => 'embedded',
        ]
    ],
    'locale' => 'fr',
    'test' => 'no',
];

echo "<h3>1. Envoi de la demande à eSignatures...</h3>";
echo "<pre>URL: https://esignatures.com/api/contracts?token=" . $api_token . "</pre>";
echo "<pre>Données envoyées:\n" . json_encode($data, JSON_PRETTY_PRINT) . "</pre>";

$ch = curl_init('https://esignatures.com/api/contracts?token=' . $api_token);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
// Cette option aide si vous testez en local (WAMP/MAMP) et avez des soucis SSL
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 

$response = curl_exec($ch);
$curl_error = curl_error($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "<h3>2. Code HTTP: " . $http_code . "</h3>";

if ($curl_error) {
    echo "<p style='color:red; font-weight:bold;'>Erreur de connexion cURL : " . $curl_error . "</p>";
    exit;
}

echo "<h3>3. Réponse brute de l'API :</h3>";
echo "<pre style='background:#f4f4f4; padding:15px; border:1px solid #ddd;'>";
echo htmlspecialchars($response);
echo "</pre>";

$result = json_decode($response, true);

echo "<h3>4. Analyse du résultat :</h3>";

if ($result === null) {
    echo "<p style='color:red; font-weight:bold;'>ERREUR : Impossible de décoder la réponse JSON</p>";
    exit;
}

echo "<pre>";
print_r($result);
echo "</pre>";

// Chercher l'URL de signature
$sign_url = null;

// Essayer différents chemins possibles
$paths = [
    'data.contract.signers.0.sign_page_url',
    'data.signers.0.sign_page_url',
    'contract.signers.0.sign_page_url',
    'signers.0.sign_page_url',
];

foreach ($paths as $path) {
    $parts = explode('.', $path);
    $temp = $result;
    $found = true;
    
    foreach ($parts as $part) {
        if (isset($temp[$part])) {
            $temp = $temp[$part];
        } else {
            $found = false;
            break;
        }
    }
    
    if ($found && is_string($temp)) {
        $sign_url = $temp;
        echo "<p style='color:green; font-weight:bold;'>✅ URL trouvée via le chemin: " . $path . "</p>";
        break;
    }
}

if ($sign_url) {
    echo "<p style='color:green; font-weight:bold;'>SUCCÈS !</p>";
    echo "<p>L'URL de signature est : <a href='" . $sign_url . "' target='_blank' style='color:blue; text-decoration:underline;'>Cliquez ici pour signer</a></p>";
    echo "<p><code>" . $sign_url . "</code></p>";
} else {
    echo "<p style='color:red; font-weight:bold;'>❌ ÉCHEC : URL de signature non trouvée dans la réponse</p>";
}
?>
