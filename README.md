# PracJeR
## GDD: BOMB-OUT! <br> Game Design Document

### Royal Flush
##### Luis Mateos Sánchez l.mateos.2020@alumnos.urjc.es<br>Daniel Gárate Díaz d.garate.2020@alumnos.urjc.es<br>Álvaro Lozano de Osma a.lozanod.2020@alumnos.urjc.es<br> Javier Barriga Piñero j.barriga.2018@alumnos.urjc.es<br> Alejandro Cavero Sebastián a.cavero.2020@alumnos.urjc.es

## ÍNDICE

**Contenidos**

INTRODUCCIÓN 2 <br> DISEÑO DE NIVEL 2<br> AMBIENTE 3 <br>GAMEPLAY 3 <br>ARTE 5 <br>SONIDO Y MÚSICA 6<br> INTERFAZ DE USUARIO 6<br> RECURSOS 14

### INTRODUCCIÓN 
En este documento se presentarán las características de “Bomb-Out!”, un frenético videojuego 2D en el que dos jugadores se enfrentan en una batalla a contrarreloj en la que se lanzarán bombas y tratarán de esquivar los disparos del enemigo moviéndose entre muros colocados sobre el campo de batalla.


### DISEÑO DE NIVEL
El escenario sobre el que se desarrolla la acción es una arena dividida en 2 espacios iguales por una barrera que no pueden atravesar los personajes. Cada jugador se puede mover libremente por su espacio, en este caerán bombas del cielo las cuales podrá coger para arrojarlas al rival.
Las partidas se dividen en dos fases, en la primera fase cada jugador tiene un periodo de tiempo de 30 segundos para poder distribuir los obstáculos de su campo y así tener una serie de barricadas para sacar ventaja a su rival; en la segunda fase comienza la acción, las bombas aparecen en cada campo de forma aleatoria y a medida que avanza el tiempo aparecen más frecuentemente. La duración de la segunda fase es de 2 minutos.
Habrá varios mapas que se diferenciarán principalmente en estética, en la distribución del terreno y en características especiales:

- **Arena Bomb-Out:** es el nivel más básico, consta de una arena rectangular dividida a la mitad como un campo de fútbol.
- **Cenote milenario:** Un nivel en forma de anillo con un círculo en medio que no se puede atravesar. El campo seguirá dividido en 2 por la mitad del círculo.
- **Night Distrit:** Un mapa con forma de rombo, en el que los rebotes en las paredes cambian las propiedades de los lanzamientos dependiendo del color de estas. El naranja acelera los rebotes, el azul los ralentiza, el morado hace que reboten con retardo y el amarillo hace que aparezcan en la pared del lado opuesto.

- **Refinería Bum Bum:** Un escenario rectangular en el cual las estructuras son más frágiles y al perder toda su resistencia estallan y hacen daño en área.
- **Caos en la carretera:** un mapa cuadrado con la peculiaridad de que en la parte central hay dos barreras que delimitan un rectángulo, por dicho rectángulo circulan coches, si la bomba impacta un coche este rebota esta rebota hacia el campo del que la ha lanzado.
- **Portal-Mania**: similar al primer estadio, pero con portales de colores que hacen que la pelota se teletransporte.

### AMBIENTE
En un mundo en el que los deportes convencionales se han quedado obsoletos se han inventado nuevas formas de entretener al público, ¿la mejor de todas? El festival Bomb-Out, un explosivo evento en el que retadores de todo el mundo construyen sus defensas y se arrojan explosivos por doquier en escenarios de lo más dispares para hacerse con la gloria de la Copa Bomba (y su jugoso premio en metálico). Para todo aquel lo suficientemente chalado como para ponerse en la línea de fuego, para aquel que adora el fresco olor a C4 por la mañana este es su espectáculo.

### GAMEPLAY
En este apartado se explicarán las mecánicas de juego diferenciando entre los diferentes objetos que se encuentran en el juego y acciones que puede realizar el jugador en sí mismo y con cada personaje:
- **Bombas**: las bombas aparecerán cada 7 segundos; durante el transcurso de la partida, este tiempo irá disminuyendo hasta llegar a 3 segundos. Las bombas se pueden lanzar en la dirección y distancia que se desee (pudiendo alcanzar una longitud máxima de 50 casillas); si se lanzan contra una pared rebotarán (la distancia de rebote será igual a (distancia Lanzada - distancia Recorrida)/2. Si pasa un cierto tiempo desde que aparecen, se recogen o se lanzan explotan. Tienen además un área de impacto de 9 casillas. Una vez lanzadas las bombas no podrán ser recogidas de nuevo. 

- **Muros:** los muros no pueden ser atravesados ni por el jugador ni por las bombas (con excepción de habilidades) pero sí podrán ser destruidos (cada bomba al impactar resta 1 de vida a los muros a los que afecte). Cada muro cuenta con 10 puntos de vida y podrán rotarse o moverse para ser distribuidos, pero una vez colocados no podrán editarse. Además, cada muro ocupará 3x1 casillas.

- **Acciones del jugador:** en el menú de la partida, el jugador podrá seleccionar el personaje que desea entre los 4 existentes. Durante el desarrollo de la misma, el jugador sólo podrá moverse por su área establecida, por su mitad del campo. Por lo tanto, sólo podrá recoger o lanzar bombas y construir muros en su lado de juego. Respecto a las dos fases de la partida:
-  **En la primera fase de la partida** (fase de construcción), el jugador podrá construir un total de 8 muros. Tendrá que construir el total establecido, ni uno más ni uno menos. Tampoco podrán montarse unos encima de otros. Esto significa que una casilla ocupada por un muro ya puesto no podrá ser ocupada por otro. Por último, el jugador no va a poder construir muros de forma consecutiva tapando una vertical entera del campo de juego (no se podrá dividir el área de juego por completo, debe existir al menos un espacio por el que el otro jugador pueda lanzar las bombas). 
- **En la segunda fase** (fase de batalla) el jugador no podrá lanzar bombas a menos que haya recogido una antes (con excepción de un personaje); no podrá acumular bombas recogidas ni tampoco soltarlas para más tarde recogerlas. Esto último se debe a que cuando las bombas se generan de manera aleatoria por el campo tienen un tiempo de 3 segundos hasta que explotan. Este tiempo se reinicia cada vez que el jugador recoge una en el suelo, sin embargo, podrá explotarle al jugador también en la mano. 

- **Acciones del personaje:** todas las posibles acciones sólo tienen efecto en la segunda fase de la partida. Sabiendo esto, las posibles acciones de cada personaje son:
- ** Salta muros:** este personaje podrá saltar un muro siempre que no haya más de 2 juntos o siempre que la habilidad esté activa y no en espera. Cada vez que se utilice habrá un tiempo de espera de 15 segundos.
- **Rebotes más lejanos**: la distancia de rebote de la bomba en este caso será igual a (distancia Lanzada - Distancia Recorrida)*2 
- **Atravesar un muro con una bomba**: este personaje podrá lanzar una bomba a través de un muro siempre que la habilidad esté activa y no en espera. Cada vez que se utilice habrá un tiempo de espera de 15 segundos.
-  **Lanzar 2 bombas en vez de 1**: podrá lanzar 2 bombas siempre que la habilidad esté activa y no en espera. Cada vez que se utilice habrá un tiempo de espera de 15 segundos.

### ARTE
Bomb Out es pixel-art. Su estilo es futurista, pero no deja de lado espacio para la fantasía. 
![](https://th.bing.com/th/id/OIP.jLnDDn45xe9U7MsiWNqoHgAAAA?pid=ImgDet&rs=1) <br>
Su vista es cenital, para tener una perspectiva más general del campo de juego que estos cambiarán a lo largo de los mapas o de manera personalizable.
Los personajes tendrán diferentes tipos de atuendos, que se podrán desbloquear a medida que se avanza o se compran en el juego.

Las bombas de aspecto más reconocible posible, una bomba negra clásica, que su tamaño se ve relacionado inmediatamente con el tiempo que duran, más grande siete segundos, más pequeña tres segundos.
Los muros tienen determinada vida, que se van reduciendo en proporción de cuánta les queda.

### SONIDO Y MÚSICA
Para el diseño de la música y efectos de sonido se ha concretado que el juego dispondrá de un estilo musical 8-bits parecido a los sonidos de juegos “retro” como el “Mega-Man 2” o “Castlevania (NES)”. Para esto se dispondrá de los siguientes efectos de sonidos:
- Menús
- Cambio de opción
- Seleccionar opción
- Explosión de bomba
- Romper barrera
- Recoger bomba

La **banda sonora** se ha creado una canción con el estilo acordado y priorizando el uso de la percusión ya que concuerda más con el tipo de videojuego. A medida que pase el tiempo de la partida, la banda sonora irá haciéndose más complicada (incrementando el número de instrumentos) y haciendo la partida más intensa. 
**Banda sonora:**
https://youtu.be/H1g6ncbmIvg


### INTERFAZ DE USUARIO
En este apartado se explicarán las distintas interfaces que se encontraran en el juego, sus características principales además de diseños básicos de estas.




**Menú principal**
La interfaz que encontrará el jugador nada más iniciar el juego, está compuesta por el título del juego y tres botones.
![PANTALLAINIC](https://user-images.githubusercontent.com/74834169/204024665-b9956c4c-b2c2-4517-97b6-bd724ff048e8.png)

**Botón local**: Selecciona el modo para jugar de forma local.
**Botón online**: Selecciona el modo para jugar de forma online.
**Botón créditos**: Accede a la pantalla de créditos.





**Pantalla de créditos**
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
Click izquierdo : Disparo del proyectil del jugador y colocación de muros en la primera fase.





Pantalla de controles local

Tecla W : Movimiento hacia arriba del jugador 1.
Tecla S : Movimiento hacia abajo del jugador 1.
Tecla D : Movimiento hacia la derecha del jugador 1.
Tecla A : Movimiento hacia la izquierda del jugador 1.
Tecla E : Disparo del proyectil del jugador 1 y colocación de muros en la primera fase.

Flecha superior : Movimiento hacia arriba del jugador 2.
Flecha inferior : Movimiento hacia abajo del jugador 2.
Flecha derecha : Movimiento hacia la derecha del jugador 2.
Flecha izquierda : Movimiento hacia la izquierda del jugador 2 .
Tecla L : Disparo del proyectil del jugador 2 y colocación de muros en la primera fase.
Pantalla de juego
Es la interfaz que se encontrará una vez que comience la partida, está compuesta por el campo de juego, un temporizador y dos contadores uno para cada jugador representados por una pequeña avatar de su personaje.



Pantalla de victoria
Interfaz que aparece una vez terminada la partida, aparece el nombre del jugador ganador y como ha ganado (puntuación o muerte súbita).

Botón Volver a jugar: Vuelve a la pantalla de selección de personajes.
Botón Salir: Vuelve al menú principal.


## CAMBIOS REALIZADOS RESPECTO AL GDD (Fase 2)
<br>
-Las bombas permanecerán en la arena en lugar de explotar. Se ha añadido como mecánica llenar el campo del rival de minas. En lugar de explotar al tiempo tras pararse, se ha implementado que vayan desapareciendo hasta volverse casi invisibles. De esta manera, el jugador tendrá que recordar donde puso bombas su rival.
<br>
-Las bombas se recogeran de un totem y una vez que se coja una el totem cambiara de posición. De esta manera el jugador tendra que moverse por todo el escenario para poder disparar.
<br>
-Las partidas (por el momento) tienen una única fase y los muros siempre se colocan de igual manera para los dos jugadores. De esta forma los dos jugadores inicialmente disponen de las mismas posibilidades de ganar.
<br>
-Las partidas duran un minuto tras el cual el ganador sera decidido por su puntuacion.
<br>
-Los muros se destruyen tras tres impactos (en vez de 10) logrando asi que la partida sea mas dinamica.
<br>
-Pantalla de inicio: Muestra los controles y tiene dos botones: Play y Credits.
  ![PANTALLAINIC](https://github.com/DanielGarate/PracJeR/blob/main/PracJeR-Fase3/PracJeR-Juego/resources/img/PANTALLAINIC.png)
<br>
-Pantalla de juego: En esta pantalla se muestra la escena game y es en la que se desarrolla la partida.
<br>
-Pantalla de Créditos: En esta pantalla se muestran los participantes en el proyecto.
  ![PANTALLACREDITOS](https://github.com/DanielGarate/PracJeR/blob/main/PracJeR-Fase3/PracJeR-Juego/resources/img/pantallacreditos.png)
<br>
-Pantalla de Pausa: En medio de un apartida se puede pausar la acción y luego volver a jugar.
  ![PANTALLAPAUSA](https://github.com/DanielGarate/PracJeR/blob/main/PracJeR-Fase3/PracJeR-Juego/resources/img/pantallaPausa.png)
<br>
-Pantalla de victoria Player 1: Si el jugador 1 tiene más puntuación Se muestra por pantalla que ha ganado.
  ![P1WIN](https://github.com/DanielGarate/PracJeR/blob/main/PracJeR-Fase3/PracJeR-Juego/resources/img/jugador1Ganado.png)
<br>
-Pantalla de victoria Player 2: Si el jugador 2 tiene más puntuación Se muestra por pantalla que ha ganado.
  ![P2WIN](https://github.com/DanielGarate/PracJeR/blob/main/PracJeR-Fase3/PracJeR-Juego/resources/img/jugador2Ganado.png)
<br>
![DIAGRAMA](https://media.discordapp.net/attachments/789091325550919680/1047423667287621652/Diagrama_flujo_pantallas.png)

-Arte adicional:
  <br>
  **Arenas:** 
    ![ARENAPIXELCLEAR](https://github.com/DanielGarate/PracJeR/blob/main/PracJeR-Fase3/PracJeR-Juego/resources/img/Campo.png)
  <br>
  **Sprites:** 
    ![BOMB](https://github.com/DanielGarate/PracJeR/blob/main/PracJeR-Fase3/PracJeR-Juego/resources/img/bomb.png)
  <br>
  **Animaciones:**
    ![REALDUDE](https://github.com/DanielGarate/PracJeR/blob/main/PracJeR-Fase3/PracJeR-Juego/resources/img/realDude.png)
-UML:
  <br>
    ![UML]([[https://github.com/DanielGarate/PracJeR/blob/fase3Inicio/src/main/resources/static/resources/img/Clase_UML.png](https://github.com/DanielGarate/PracJeR/blob/fase3Inicio/src/main/resources/static/resources/img/Clase_UML.png?raw=true))
### RECURSOS<br>
[Porcunipine « PCGamesTorrents](https://pcgamestorrents.com/porcunipine.html)  Barricadas <br>
[Pixel Soccer | 🕹️ Play Pixel Soccer Online On GamePix Ejemplo](https://www.gamepix.com/play/pixel-soccer) Mapa

