# VANHAECKE_Leo_CC3

<h1>CC3 Tutoriel HTTP/Express Node.js<h1>

<h2>Partie 1 : serveur HTTP natif Node.js<h2>

<h3>Question 1.1 donner la liste des en-têtes de la réponse HTTP du serveur.<h3>

<code>
Les en-têtes de la réponse HTTP du serveur localhost peuvent être trouvées dans la page : http://localhost:8000 
avec l’option F12 dans l’onglet network, on peut voir l'en-tête 
Response Headers:
    HTTP/1.1 200 OK
    Connection: keep-alive
    Date: Wed, 20 Sep 2023 06:15:30 GMT
    Keep-Alive: timeout=5
    Transfer-Encoding: chunked
</code>

<h3>Question 1.2 donner la liste des en-têtes qui ont changé depuis la version précédente.<h3>

<pre><code>
Suite aux modifications apportées à la fonction requestListener, on remarque que le favicon n’est plus actif.
Et on peut voir que dans l’en-tête de la réponse il y a des lignes en moins : Transfert-encoding 
et des lignes en plus : content-length, et content-type
</code></pre>

<h3>Question 1.3 que contient la réponse reçue par le client?<h3>

<pre><code>
Sachant que la fonction : 

function requestListener(_request, response) {
  fs.readFile("index.html", "utf8")
}

ouvre le fichier « index.html » 
Si on en a un nommé de cette facon, la réponse recu par le client sera le contenu de la page.
Mais dans ce TP lors de cette étape le fichier est censé être nommé __index.html, il ne pourra donc pas être ouvert, on aura donc une erreur.
</code></pre>

<h3>Question 1.4 quelle est l’erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d’erreur affiché.<h3>

<pre><code>L’erreur affichée dans la console est l’erreur   numéro -4058, du code 'ENOENT'
voici la description de l’erreur sur le site de node.js :
ENOENT (no such file or directory): Commonly raised by fs operations to indicate that a component of the specified pathname does not exist.No entity. No entity (file or directory) could be found by the given path.
</code></pre>

<h3>Maintenant, renommer le fichier __index.html en index.html et tester à nouveau.<h3>

<pre><code>Cela fonctionne, la page s’affiche correctement.</code></pre>

<h3>Question 1.5 donner le code de requestListener() modifié avec gestion d’erreur en async/await.<h3>

<pre><code>
voici la fonction modifié : 
async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");

    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(contents);
  } catch (error) {
    console.error(error);

    response.setHeader("Content-Type", "text/plain");
    response.writeHead(500); // Définit le code d'erreur 500
    response.end("Erreur interne du serveur (500) : Le fichier index.html est introuvable.");
  }
}
</code></pre>

<h3>Question 1.6 indiquer ce que cette commande a modifié dans votre projet.<h3>

<pre><code>
Ces deux commandes ont ajouté des dépendances au projet,  cross-env peut être utilisé pour gérer les variables d'environnement, tandis que nodemon facilitera le processus de développement en surveillant les changements de fichiers et en redémarrant automatiquement le serveur Node.js.</code></pre>

<h3>Question 1.7 quelles sont les différences entre les scripts http-dev et http-prod ?</h3>

<pre><code>
http-dev :
      Ce script est destiné à être utilisé en mode de développement.
      Il peut activer des fonctionnalités de débogage telles que la sortie de logs détaillés, le rechargement automatique du serveur lorsqu'un fichier source est modifié, et il peut définir l'environnement de manière à faciliter le développement, par exemple en définissant NODE_ENV sur "development".
      Il peut également activer des outils de surveillance et de rechargement automatique tels que nodemon, comme dans votre cas.
http-prod :
      Ce script est destiné à être utilisé en mode de production.
      Il est généralement configuré pour désactiver les fonctionnalités de débogage, les logs détaillés et le rechargement automatique, car ces fonctionnalités sont moins nécessaires en production.
      Il peut définir l'environnement de manière à indiquer que l'application est en mode production, par exemple en définissant NODE_ENV sur "production".
      En production, l'objectif est généralement d'optimiser les performances et la stabilité de l'application.
</code></pre>

<h3>Tester les routes suivantes :<h3>

<pre><code>
    http://localhost:8000/index.html :
    affiche la page correctement, car on affiche le fichier index.html
    http://localhost:8000/random.html
    la page fonctionne correctement, cela affiche un nombre aléatoire.
    http://localhost:8000/
    ce lien n'affiche rien car on ne précise pas quel html utiliser.
    http://localhost:8000/dont-exist
    ce lien n'affiche rien non car dont-exist n'est pas un fichier present dans le projet.
</code></pre>

<h3>Question 1.8 donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes.<h3>

<pre><code>
        http://localhost:8000/index.html - code 200 (OK)
        http://localhost:8000/random.html - code 200 (OK)
        http://localhost:8000/ - code 404 (NOT FOUND)
        http://localhost:8000/dont-exist - code 404 (NOT FOUND)
</code></pre>

<h2>Partie 2 : framework Express<h2>

<h3>Question 2.1 donner les URL des documentations de chacun des modules installés par la commande précédente.<h3>

<pre><code>
Voici les liens des modules installés par la commande :

Express.js : "https://expressjs.com/en/5x/api.html"
http-errors : "https://www.npmjs.com/package/http-errors"
loglevel : "https://www.npmjs.com/package/loglevel"
morgan : "https://www.npmjs.com/package/morgan"
</code></pre>

<h3>Question 2.2 vérifier que les trois routes fonctionnent.<h3>

<pre><code>
Les 3 routes foncionnent :

GET : http://localhost:8000/index.html
État : 200 OK
Version : HTTP/1.1
Transfert : 1,26 Ko (taille 940 o)
Priorité de la requête : Highest
Résolution DNS : Système

GET : http://localhost:8000/random/5
État : 200 OK
Version : HTTP/1.1
Transfert : 308 o (taille 80 o)
Priorité de la requête : Highest
Résolution DNS : Système

GET : http://localhost:8000/
État : 200 OK
Version : HTTP/1.1
Transfert : 1,26 Ko (taille 940 o)
Priorité de la requête : Highest
Résolution DNS : Système
</code></pre>

<h3>Question 2.3 lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP ?<h3>

<pre><code>
voici les en-têtes des réponses fournies par Express : 

Accept-Ranges : bytes
Cache-Control :	public, max-age=0
Connection : keep-alive
Content-Length : 940
Content-Type : text/html; charset=UTF-8
Date : Wed, 27 Sep 2023 22:06:24 GMT
ETag : W/"3ac-18abba24bd9"
Keep-Alive : timeout=5
Last-Modified : Fri, 22 Sep 2023 06:44:50 GMT
X-Powered-By : Express

Les nouvelles lignes sont : Accept-Ranges, Cache-Control, Content-Length, ETag, Last-Modified, et X-Powered-By.
</code></pre>

<h3>Question 2.4 quand l’événement listening est-il déclenché ?<h3>

<pre><code>
L'événement listening est déclenché lorsque le servur Express commence a écouter sur le port 8000,
cela ce produit après : 'app.listen(port, host);' de server-express.mjs 
Dès que le server sera prêt, cela vas déclancher l'evement "listening", qui vas executer la fonction : 'server.on("listening", () => ...)'
</code></pre>

<h3>Question 2.5 indiquer quelle est l’option (activée par défaut) qui redirige / vers /index.html ?<h3>

<pre><code>
L'option d'Express qui redirige automatiquement une requête vers "/index.html" lorsqu'un chemin de fichier est manquant est appelée "fallthrough". Par défaut, cette option est activée dans le middleware express.static
</code></pre>

<h3>Question 2.6 visiter la page d’accueil puis rafraichir (Ctrl+R) et ensuite forcer le rafraichissement (Ctrl+Shift+R). Quels sont les codes HTTP sur le fichier style.css ? Justifier.<h3>

<pre><code>
Lors du raffraichissement de la page avec ctrl + r, on a :
GET : http://localhost:8000/style.css
État : 304 Not Modified
Version : HTTP/1.1
Transfert : 751 o (taille 486 o)
Politique de référent : strict-origin-when-cross-origin
Résolution DNS : Système

Lors du raffraichissement de la page avec ctrl + shift + r, on a :
GET :http://localhost:8000/style.css
État : 200 OK
Version : HTTP/1.1
Transfert : 801 o (taille 486 o)
Politique de référent : strict-origin-when-cross-origin
Résolution DNS : Système

Ceci est dû au cache qui vas etre utiliser plutot que de recharger une nouvelle fois les données de la page.
si le cache est désactivé, lors de chaque rechargement de page l'on aura une requete 200.
</code></pre>

<h3>Question 2.7 vérifier que l’affichage change bien entre le mode production et le mode development.<h3>

<pre><code>
En mode developpement, on a cet affichage :
ReferenceError: concole is not defined
    at file:///c:/Users/Utilisateur/Desktop/S4%20UNC/devweb/devwebTP5/VANHAECKE_Leo_CC3/server-express.mjs:40:5
    at Layer.handle_error (c:\Users\Utilisateur\Desktop\S4 UNC\devweb\devwebTP5\VANHAECKE_Leo_CC3\node_modules\express\lib\router\layer.js:71:5)
    at trim_prefix (c:\Users\Utilisateur\Desktop\S4 UNC\devweb\devwebTP5\VANHAECKE_Leo_CC3\node_modules\express\lib\router\index.js:326:13)
    at c:\Users\Utilisateur\Desktop\S4 UNC\devweb\devwebTP5\VANHAECKE_Leo_CC3\node_modules\express\lib\router\index.js:286:9
    at Function.process_params (c:\Users\Utilisateur\Desktop\S4 UNC\devweb\devwebTP5\VANHAECKE_Leo_CC3\node_modules\express\lib\router\index.js:346:12)
    at next (c:\Users\Utilisateur\Desktop\S4 UNC\devweb\devwebTP5\VANHAECKE_Leo_CC3\node_modules\express\lib\router\index.js:280:10)
    at Layer.handle_error (c:\Users\Utilisateur\Desktop\S4 UNC\devweb\devwebTP5\VANHAECKE_Leo_CC3\node_modules\express\lib\router\layer.js:67:12)
    at trim_prefix (c:\Users\Utilisateur\Desktop\S4 UNC\devweb\devwebTP5\VANHAECKE_Leo_CC3\node_modules\express\lib\router\index.js:326:13)
    at c:\Users\Utilisateur\Desktop\S4 UNC\devweb\devwebTP5\VANHAECKE_Leo_CC3\node_modules\express\lib\router\index.js:286:9
    at Function.process_params (c:\Users\Utilisateur\Desktop\S4 UNC\devweb\devwebTP5\VANHAECKE_Leo_CC3\node_modules\express\lib\router\index.js:346:12)

En mode production, on a cet affichage :

Internal Server Error
</code></pre>
