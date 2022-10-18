# PracJeR

GDD: BOMB-OUT!
Game Design Document




Royal Flush
Luis Mateos
Daniel Gárate
Álvaro Lozano
Javier Barriga
Alejandro Cavero



ÍNDICE
INTRODUCCIÓN	2
DISEÑO DE NIVEL	2
AMBIENTE	3
GAMEPLAY	3
ARTE	5
SONIDO Y MÚSICA	6
INTERFAZ DE USUARIO	6










INTRODUCCIÓN
En este documento se presentarán las características de “Bomb-Out!”, un frenético videojuego 2D en el que dos jugadores se enfrentan en una batalla a contrarreloj en la que se lanzarán bombas y tratarán de esquivar los disparos del enemigo moviéndose entre muros colocados sobre el campo de batalla.

DISEÑO DE NIVEL
El escenario sobre el que se desarrolla la acción es una arena dividida en 2 espacios iguales por una barrera que no pueden atravesar los personajes. Cada jugador se puede mover libremente por su espacio, en este caerán bombas del cielo las cuales podrá coger para arrojarlas al rival.
Las partidas se dividen en dos fases, en la primera fase cada jugador tiene un periodo de tiempo de 30 segundos para poder distribuir los obstáculos de su campo y así tener una serie de barricadas para sacar ventaja a su rival; en la segunda fase comienza la acción, las bombas aparecen en cada campo de forma aleatoria y a medida que avanza el tiempo aparecen más frecuentemente. La duración de la segunda fase es de 2 minutos.
Habrá varios mapas que se diferenciarán principalmente en estética y en la distribución del terreno:
• Arena Bomb-Out: es el nivel más básico, consta de una arena rectangular dividida a la mitad como un campo de fútbol.
• Cenote milenario: Un nivel en forma de anillo con un círculo en medio que no se puede atravesar. El campo seguirá dividido en 2 por la mitad del círculo.
• Night Distrit: Un mapa con forma de rombo, en el que los rebotes en las paredes cambian las propiedades de los lanzamientos dependiendo del color de estas. El naranja acelera los rebotes, el azul los ralentiza, el morado hace que reboten con retardo y el amarillo hace que aparezcan en la pared del lado opuesto.
• Refinería Bum Bum: Un escenario rectangular en el cual las estructuras son más frágiles y al perder toda su resistencia estallan y hacen daño en área.
• Caos en la carretera: un mapa cuadrado con la peculiaridad de que en la parte central hay dos barreras que delimitan un rectángulo, por dicho rectángulo circulan coches, si la bomba impacta un coche este rebota esta rebota hacia el campo del que la ha lanzado.
• Portal-Mania: similar al primer estadio, pero con portales de colores que hacen que la pelota se teletransporte.
AMBIENTE
En un mundo en el que los deportes convencionales se han quedado obsoletos se han inventado nuevas formas de entretener al público, ¿la mejor de todas? El festival Bomb-Out, un explosivo evento en el que retadores de todo el mundo construyen sus defensas y se arrojan explosivos por doquier en escenarios de lo más dispares para hacerse con la gloria de la Copa Bomba (y su jugoso premio en metálico). Para todo aquel lo suficientemente chalado como para ponerse en la línea de fuego, para aquel que adora el fresco olor a C4 por la mañana este es tu espectáculo

GAMEPLAY
En este apartado se explicarán las mecánicas de juego diferenciando entre los diferentes objetos que se encuentran en el juego y acciones que puede realizar el jugador en sí mismo y con cada personaje:
Bombas: las bombas aparecerán cada 7 segundos; durante el transcurso de la partida, este tiempo irá disminuyendo hasta llegar a 3 segundos. Las bombas se pueden lanzar en la dirección y distancia que se desee (pudiendo alcanzar una longitud máxima de 50 casillas); si se lanzan contra una pared rebotarán (la distancia de rebote será igual a (distancia Lanzada - distancia Recorrida)/2. Si pasa un cierto tiempo desde que aparecen, se recogen o se lanzan explotan. Tienen además un área de impacto de 9 casillas. Una vez lanzadas las bombas no podrán ser recogidas de nuevo. 

Muros: los muros no pueden ser atravesados ni por el jugador ni por las bombas (con excepción de habilidades) pero sí podrán ser destruidos (cada bomba al impactar resta 1 de vida a los muros a los que afecte). Cada muro cuenta con 10 puntos de vida y podrán rotarse o moverse para ser distribuidos, pero una vez colocados no podrán editarse. Además, cada muro ocupará 3x1 casillas.

Acciones del jugador: en el menú de la partida, el jugador podrá seleccionar el personaje que desea entre los 4 existentes. Durante el desarrollo de la misma, el jugador sólo podrá moverse por su área establecida, por su mitad del campo. Por lo tanto, sólo podrá recoger o lanzar bombas y construir muros en su lado de juego. Respecto a las dos fases de la partida:
• En la primera fase de la partida (fase de construcción), el jugador podrá construir un total de 8 muros. Tendrá que construir el total establecido, ni uno más ni uno menos. Tampoco podrán montarse unos encima de otros. Esto significa que una casilla ocupada por un muro ya puesto no podrá ser ocupada por otro. Por último, el jugador no va a poder construir muros de forma consecutiva tapando una vertical entera del campo de juego (no se podrá dividir el área de juego por completo, debe existir al menos un espacio por el que el otro jugador pueda lanzar las bombas). 
• En la segunda fase (fase de batalla) el jugador no podrá lanzar bombas a menos que haya recogido una antes (con excepción de un personaje); no podrá acumular bombas recogidas ni tampoco soltarlas para más tarde recogerlas. Esto último se debe a que cuando las bombas se generan de manera aleatoria por el campo tienen un tiempo de 3 segundos hasta que explotan. Este tiempo se reinicia cada vez que el jugador recoge una en el suelo, sin embargo, podrá explotarle al jugador también en la mano. 

Acciones del personaje: todas las posibles acciones sólo tienen efecto en la segunda fase de la partida. Sabiendo esto, las posibles acciones de cada personaje son:
• Salta muros: este personaje podrá saltar un muro siempre que no haya más de 2 juntos o siempre que la habilidad esté activa y no en espera. Cada vez que se utilice habrá un tiempo de espera de 15 segundos.
• Rebotes más lejanos: la distancia de rebote de la bomba en este caso será igual a (distancia Lanzada - Distancia Recorrida)*2 
• Atravesar un muro con una bomba: este personaje podrá lanzar una bomba a través de un muro siempre que la habilidad esté activa y no en espera. Cada vez que se utilice habrá un tiempo de espera de 15 segundos.
• Lanzar 2 bombas en vez de 1: podrá lanzar 2 bombas siempre que la habilidad esté activa y no en espera. Cada vez que se utilice habrá un tiempo de espera de 15 segundos.

ARTE
Bomb Out es pixel-art. Su estilo es futurista, pero no deja de lado espacio para la fantasía. 

Su vista es cenital, para tener una perspectiva más general del campo de juego que estos cambiarán a lo largo de los mapas o de manera personalizable.
Los personajes tendrán diferentes tipos de atuendos, que se podrán desbloquear a medida que se avanza o se compran en el juego.

Las bombas de aspecto más reconocible posible, una bomba negra clásica, que su tamaño se ve relacionado inmediatamente con el tiempo que duran, más grande siete segundos, más pequeña tres segundos.
Los muros tienen determinada vida, que se van reduciendo en proporción de cuánta les queda.




SONIDO Y MÚSICA
















INTERFAZ DE USUARIO
En este apartado se explicarán las distintas interfaces que se encontraran en el juego, sus características principales además de diseños básicos de estas.
Menú principal
La interfaz que encontrará el jugador nada más iniciar el juego, está compuesta por el título del juego y tres botones.


Botón local: Selecciona el modo para jugar de forma local.
Botón online: Selecciona el modo para jugar de forma online.
Botón créditos: Accede a la pantalla de créditos.

Pantalla de créditos 
En esta pantalla se encontrarán los distintos roles y la asignación de estos.

Pantalla de selección de personaje
Esta es la interfaz que se encontrará una vez se seleccione el modo local u online, estará compuesta por una etiqueta donde los jugadores pueden poner su nombre, la imagen de los personajes y las habilidades que estos poseen.


Botón flecha: Te mueve entre los distintos personajes disponibles.
Pantalla de controles
Pantalla que aparecerá antes de comenzar la partida, existen dos pantallas que variarán dependiendo de si se está jugando en modo local o modo online.








Pantalla de controles online

Tecla W : Movimiento hacia arriba.
Tecla S : Movimiento hacia abajo.
Tecla D : Movimiento hacia la derecha.
Tecla A : Movimiento hacia la izquierda.
Ratón: Con el ratón se elegirá la dirección de lanzamiento.
Click izquierdo : Disparo del proyectil del jugador.






Pantalla de controles local

Tecla W : Movimiento hacia arriba del jugador 1.
Tecla S : Movimiento hacia abajo del jugador 1.
Tecla D : Movimiento hacia la derecha del jugador 1.
Tecla A : Movimiento hacia la izquierda del jugador 1.
Tecla E : Disparo del proyectil del jugador 1.

Flecha superior : Movimiento hacia arriba del jugador 2.
Flecha inferior : Movimiento hacia abajo del jugador 2.
Flecha derecha : Movimiento hacia la derecha del jugador 2.
Flecha izquierda : Movimiento hacia la izquierda del jugador 2.
Barra espaciadora : Disparo del proyectil del jugador 2.


