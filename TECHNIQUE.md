# Documentation Technique

## 06/02/2025

### Louis Teilliais
### Luke Jones
### Arnaud Clavier
### Tao Bourmaud

## WEB SERVICES

1. Choix Techniques


   a. **Frameworks utilisés**
- Pourquoi NestJS ?
- Autres frameworks et bibliothèques


b. **Structure du code**

- Organisation des fichiers et des dossiers


c. **Base de données**

- Choix de la technologie
- Modèle de données

## Choix Techniques

---
### Frameworks utilisés

#### I. Pourquoi NESTJS ?
NestJS est un framework backend basé sur TypeScript permettant la mise en place d’une architecture modulaire et de la gestion de dépendances. 

Il facilite la gestion des bases de données et intègre des outils pratiques pour gérer les entrées, sorties et erreurs.

#### II. Autres frameworks et bibliothèques
Prisma est un excellent choix pour NestJS car il rend la gestion des bases de données vraiment simple. 

Grâce à la génération automatique de types TypeScript, vous pouvez facilement travailler avec vos modèles et requêtes. 

Les migrations sont également très faciles à gérer, et Prisma est performant pour les requêtes complexes. 

En plus, il s'intègre parfaitement avec NestJS, ce qui en fait un outil idéal pour optimiser votre développement backend.

---
### Structure du code

#### III. Organisation des fichiers et des dossiers
###### Architecture Modulaire du Projet

Votre projet est organisé selon une architecture modulaire qui favorise la séparation des responsabilités et l'évolutivité.

##### Principaux Dossiers

- **migrations/** :
    - Contient des fichiers liés à la gestion de la base de données, tels que les migrations et le schéma (`schema.prisma`).

- **sql/** :
    - Probablement dédié aux scripts SQL spécifiques ou personnalisés.

- **src/** (échantillon de l'architecture):
    - Regroupe tout le code source, divisé en modules fonctionnels :
        - **auth/** : Fonctionnalités liées à l'authentification d'un user.
        - **mailer/** : Fonctionnalités liées aux services de mailing.
        - **sessions/** : Module pour gérer les sessions. Sous-structure :
            - **controllers/** : Contient la logique des contrôleurs (ex. : `session.controller.ts`).
            - **models/** : Définit les objets de transfert de données (DTO) pour valider les entrées/sorties.
            - **services/** :
                - **controllers/** : Services spécifiques pour gérer la logique métier.
                - **repositories/** : Interactions avec la base de données.
            - `session.module.ts` : Point d'entrée pour le module sessions.
        - **user/** : Fonctionnalités liées aux users.
        - **utils/** : Fournit des entités réutilisables (par ex., `base.entity.ts`, `session.entity.ts`).

###### Avantages de l'architecture

Le projet adopte une architecture modulaire claire et scalable. 

Chaque module, comme ceux dédiés aux sessions ou au sport, est autonome, ce qui facilite les évolutions et la maintenance. 

Les entités réutilisables dans utils/entities réduisent la duplication de code, et la séparation des couches (Controller, Service, Repository) garantit une organisation propre et lisible. 

Cette structure bien pensée simplifie l’ajout de nouvelles fonctionnalités tout en restant accessible aux développeurs.

---
### Base de données

#### IV. Choix de la technologie
Pour le choix de la base de données, nous avons décidé d’utiliser PostgreSQL pour sa simplicité et sa gratuité.

Afin de pouvoir gérer le calcul de données géographiques, nous utilisons également l’extension Postgis de PostgreSQL pour avoir une base de données spatiale.


Pour créer la base de données, nous avons utilisé Prisma comme ORM afin de gérer nos migrations.


#### V. Modèle de données
![test](/prisma/diagram.png)

Le schéma Prisma comprend trois tables principales :

**Session** : Représente une session sportive avec un titre, une description, une date, un nombre de places (disponibles/restantes) et une localisation. Elle peut être associée à un sport (`sportId`).

**User** : Représente un utilisateur avec un email, un nom et les sessions auxquelles il est inscrit (`sessions`).

**Sport** : Représente un type de sport avec un nom et les sessions associées.

### Relations :

- Une session peut être liée à un sport (`sportId`).
- Une session peut accueillir plusieurs utilisateurs (`users`), et un utilisateur peut participer à plusieurs sessions (`sessions`), établissant une relation bidirectionnelle.

Cette structure facilite la gestion des inscriptions et l'association des sessions aux sports.
