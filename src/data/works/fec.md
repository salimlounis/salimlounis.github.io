---
title: "Messages du Cœur"
agence: "Moment Factory"
year: 2022
cover: "fec.jpg"
images:
  - 1.jpg
  - 2.jpg
  - 3.jpg
  - 4.jpg
link: "https://momentfactory.com/products/messages-from-the-heart"
---

**Messages du Cœur** est une projection architecturale pro bono réalisée pour **Montréal en Lumière 2022**, en soutien à la [_Fondation En Cœur_](https://en-coeur.org/). Deux façades, l’édifice Wilder et le pavillon Kennedy de la Place des Arts, ont été transformées en tableaux vivants de données, illustrant en temps réel les dons et les messages de soutien adressés aux enfants malades et à leurs familles.

Sur ce projet, j’ai développé l’ensemble du système interactif, de la collecte des données à l’affichage visuel :

- **Collecte et traitement des données** : réception quotidienne de fichiers CSV contenant les dons, les messages, les emails et un thème choisi (_Amour, Espoir, Courage, Rêve_). Mise en place d’un système sur mesure pour détecter les nouvelles entrées, éviter les doublons et générer les données nécessaires aux projections et pour l'infolettre.
- **Environnement 3D et visualisation** : Création de quatre univers virtuels, chacun associé à un thème, où des particules (cœurs, étoiles, avions en papier, planètes) représentent les dons. Les messages apparaissent en rotation, et les univers alternent tout au long de la soirée.
- **Synchronisation multi-sites** : diffusion de contenus synchronisés sur les deux façades, invitant le public à se rendre à l’édifice Wilder pour lire les messages complets.
- **Intégration en temps réel** : pendant la Nuit Blanche, les dons collectés via un lien affiché étaient intégrés quasi instantanément aux projections.
- **Lettre du Cœur** : intégration d’un système en Node-RED pour automatiser l’envoi d’infolettres personnalisées aux destinataires des messages, en fonction du thème choisi.
