# Guide de contribution 

## Comment contribuer ? 

1. Forkez le dépôt :

Créez une copie du projet sur votre propre compte GitHub en cliquant sur le bouton "Fork".

2. Clonez votre fork localement :
    ```
    git clone <URL_DE_VOTRE_FORK>
    cd web_services
    ```
3. Créez une branche pour vos modifications :

Utilisez des noms de branches descriptifs pour identifier votre travail. Par exemple :

````
git checkout -b fix/nom-du-probleme
````

4. Faites vos modifications :

Assurez-vous de respecter les standards de code.

Ajoutez des commentaires pour expliquer vos changements.

5. Testez votre code en éxécutant la commande : 

````
npm run test
````

6. Commitez vos changements :
Rédigez un message de commit clair et précis :

````
git add .
git commit -m "Correction d'un bug dans le module de réservation"
````

7. Poussez votre branche :

````
git push origin fix/nom-du-probleme
````

8. Soumettez une Pull Request (PR) :
Créez une Pull Request depuis votre branche sur votre fork vers la branche main du dépôt principal. Expliquez vos modifications dans la description de la PR.

### Bonnes pratiques

Respectez les conventions de codage :
Ce projet utilise ESLint pour garantir la qualité du code. Lancez une vérification locale avec :

````
npm run lint
`````

Tests unitaires :

Toute nouvelle fonctionnalité ou correction de bug doit inclure des tests unitaires appropriés.

## Mise en place de l'environnement local

Suivez les étapes décrites dans le fichier [README.md](./README.md) pour configurer votre environnement de développement.