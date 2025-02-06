# Web Services 

## Contexte du projet

Ce projet, a été réalisé dans le cadre d'un cours sur le développement de services web. L'objectif principal était de concevoir et de développer une API permettant la réservation de sessions de sport. Cette API inclut plusieurs fonctionnalités clés :

- Gestion des utilisateurs (inscription, rôles, authentification, etc.).
- Gestion des sessions de sport (création, réservation, annulation).
- Envoi de notifications par email (confirmation de réservation, rappels, etc.).
- Intégration avec une base de données relationnelle.

L'API a été conçue pour être modulaire, maintenable et déployable automatiquement.


## Configuration de l'environnement de développement

Prérequis

Pour configurer l'environnement de développement, vous aurez besoin des outils suivants :

- Node.js (v18 ou plus récent)
- Docker (et Docker Compose)
- Git

## Installation 

1 - Clôner le dépôt 

```git
git clone <url_du_dépot>
```

2 - Installer les dépendances 

```
npm install
```

3 - Configurez les variables d'environnement :
Créez un fichier .env à la racine du projet avec le contenu suivant :

```
MAIL_USER=votre-adresse-email@gmail.com
MAIL_PASSWORD=mot-de-passe-app
DATABASE_URL=postgresql://sa:password@localhost:5432/webservices_db
````

Lancez la base de données avec Docker :

````
docker-compose up -d
````

Cela démarrera un conteneur PostgreSQL configuré pour le projet.

Démarrez le serveur de développement :

````
npm run start:dev
````
OU 

En utilisant le debugger VSCode en cliquant sur la flèche vert avec 😺 Nest sélectionné.

#### Accédez à la documentation de l'API :
L'API expose une documentation Swagger accessible à l'adresse suivante :
http://localhost:3000/docs.

### Fonctionnement du déploiement

Le projet intègre un processus de déploiement automatisé grâce à un pipeline CI/CD. Voici les principales étapes :

#### Push sur la branche main :
Chaque fois qu'une modification est poussée sur la branche main, un pipeline CI/CD est exécuté.

#### Build et tests :

Le code est construit et les tests unitaires sont exécutés.

#### Déploiement :

Le pipeline déploie automatiquement l'application sur l'environnement de production configuré (serveur ou cloud).

#### Notifications :

En cas de succès ou d'échec, une notification est envoyée pour informer les développeurs.

## Structure du projet

src/ : Contient le code source de l'application.

prisma/ : Contient les migrations générée et le schema de la base

docker-compose.yml : Configuration Docker pour la base de données.

.github/ : Fichiers de configuration pour le pipeline CI/CD.

.env : Variables d'environnement (non inclus dans le dépôt).


## Contributeurs

- Louis TEILLIAIS
- Luke JONES
- Tao BOURMAUD 
- Arnaud CLAVIER

### Lien utiles

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [DOC TECHNIQUE](./TECHNIQUE.md)