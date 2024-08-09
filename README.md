# Application de Gestion de Produits

Ce projet est une application web full-stack pour la gestion des produits, construite avec un backend NestJS et un frontend React. Elle dispose d'une API RESTful avec des mécanismes d'authentification et d'autorisation, utilisant des tokens JWT. Le frontend est stylisé avec Material-UI et utilise React Router pour la navigation.

Les informations d'identification suivantes sont volontairement partagées pour vous permettre de tester :

- **Nom d'utilisateur :** <reviewer@ennov.io>
- **Mot de passe :** <reviewerpassword@ennov.io-test>

## Prérequis

- Docker
- Docker Compose
- Node.js

## Installation

Clonez le dépôt :

```bash
git clone git@github.com:herimalala-ranaivoarisoa-rivomanana/ENNOV-FINAL.git
```

### Configuration du Backend

1. Accédez au répertoire backend :

   ```bash
   cd backend
   ```

2. Démarrez les services backend :

   ```bash
   docker-compose up -d
   ```

3. Installez les dépendances du backend :

   ```bash
   npm install
   ```

4. Exécutez les migrations de la base de données et remplissez la base de données :

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Démarrez le backend en mode développement :

   ```bash
   npm run start:dev
   ```

6. Accédez à la documentation de l'API via Swagger à : [http://localhost:4000/api](http://localhost:4000/api)

### Configuration du Frontend

1. Depuis le répertoire racine du projet, accédez au répertoire frontend :

   ```bash
   cd frontend
   ```

2. Installez les dépendances du frontend :

   ```bash
   npm install
   ```

3. Démarrez l'application React :

   ```bash
   npm start
   ```

## Fonctionnalités

- **Backend :**
  - Développement d'une API RESTful utilisant NestJS.
  - Authentification et autorisation avec des tokens JWT.
  - Gestion des erreurs et validation suivant les principes RESTful.

- **Frontend :**
  - Application React stylisée avec Material-UI.
  - Navigation utilisant React Router.
  - Gestion de l'état avec Redux Toolkit, y compris des sélecteurs pour une récupération efficace des données.
  - Validation des formulaires et gestion des erreurs.

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
