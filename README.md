# flappyBird
FlappyIA

Jeu flappy bird avec IA permettant d'esquiver les tuyaux automatiquement.

Fonctionnement de l'apprentissage :

L'IA est un mixte entre FNN et algorithme génétique.

Inputs : 
  - Distance X du centre du trou entre les tuyaux
  - Distance Y du centre du trou entre les tuyaux
  - Velocité Y (vitesse de monté ou de descente de flappy)
  
 Output :
  - Une valeur entre [0-1] décidant de si oui ou non nous devrions battre de l'aile à ce moment précis

Tous les 10 tuyaux une nouvelle génération se fait
Par défaut, les flappys ne peuvent pas mourir, cela permet d'apprendre plus rapidement en faisant une moyenne de points sur 10 tuyaux

Pour autoriser leur mort appuyez sur P.
