# Mob App

## Nom
Application mobile d'émargement électronique
***
## Description
Cette application mobile codée en React Native permet d'effectuer l'émargement électronique des élèves avec l'intervenant. Elle sert uniquement à l'émargement en physique, elle ne permet pas de modifications manuelles des données. Cette application a été développé avec des téléphones physiques et Android SDK. iOS n'est pas supporté mais le code est prêt pour. Cette application fonctionne en parallèle de l'application web.
***
## Installation
To start, you need to set up your working environmment with Node.js and React Native CLI. Check : https://reactnative.dev/docs/environment-setup.

Then :
```
cd project/
git clone https://web.isen-ouest.fr/gitlab/projet-m1/application_emargement_electronique/mob_app.git
cd mob_app/ApplicationEmargement/
``` 
Use npm to install the missing dependancies.
```
npm install --force
```
Create the .env.local file. Update the REACT_APP_API_URL with your CAS server endpoint and the REACT_APP_API_URL with your API url.
```
cp .env .env.local
```

Run the metro server
```
npx react-native start
```

In another terminal, run the android app
```
npx react-native run-android
```
***
## Utilisation
L'application a deux versions, celle pour les intervenants et celle pour les élèves. L'intervenant et les élèves peuvent visualiser leurs sessions. En cliquant, sur une session, ils peuvent soit, démarrer la session pour l'intervenant, soit, démarrer le scan pour l'élève. En approchant les deux téléphones, l'échange NFC se fait et l'émargement est validé.
***
## Auteurs
Projet réalisé en 2023 par Yohann LE CAM et Clément YZIQUEL dans le cadre d'un projet M1 à l'ISEN Brest. <br>
Projet proposé et supervisé par Olivier PODEUR, dévoloppeur informatique à l'ISEN Brest.
