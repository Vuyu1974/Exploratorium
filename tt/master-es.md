Exploratorium de retículos conceptuales
===========================================

```{ .json .config }
{
  "lang": "es",
  "strings": {
    "Close info box": "Cerrar caja de info",
    "Close legend": "Cerrar leyenda",
    "Diagram toolbar": "Barra de herramientas del diagrama",
    "Full Screen": "Pantalla completa",
    "Show Legend": "Mostrar leyenda",
    "Show Attributes": "Mostrar atributos",
    "Show Levels": "Mostrar niveles",
    "Select All": "Seleccionar todos",
    "Select None": "Seleccionar ninguno",
    "Toggle navigation": "Alternar navegación",
    "Download": "Descargar",
    "Download SVG": "Descargar SVG",
    "Download PNG": "Descargar PNG",
    "Zoom In": "Acercar",
    "Zoom Out": "Alejar",
    "Zoom Reset": "Restablecer acercamiento",
    "FCA simple object": "Objeto FCA simple",
    "FCA simple object with new attributes": "Objeto FCA simple, atributos nuevos",
    "FCA concept object": "Objeto concepto FCA",
    "FCA concept object with new attributes": "Objeto concepto FCA, atributos nuevos"
  }
}
```

## Navigation

- [Inicio](index-es.html)
- [Explorando](nav_exploring_menu)
- [Diagramas](nav_diagrams_menu)
- [MMSS](https://mmss.iimas.unam.mx/proyectos/aplicaciones-conceptos-formales-cienciometricos/)
- [REMO](https://remo.cua.uam.mx)
- [English](navlang)


## Author

por Mariana Espinosa Aldama

Con el apoyo de Arturo Espinosa Aldama, Carmina García Pérez, Pedro Cardón, Eduardo Robles Belmont y el Departamento de Modelización Matemática de Sistemas Sociales (MMSS-IIMAS-UNAM)\



## Diagrams Menu

- [Sistema Solar](planetas/es/SS)
- [Planetas](planetas/es/SS-IAU)


## Exploring Menu

- [Guía de Exploración](guidance-es.html)
- [Marco teórico](frame-es.html)
- [Metodología](methodology-es.html)
- [Bibliografía](bibliography-es.html)
- [Acerca](about-es.html)
- [Aviso legal](legal-es.html)

## Footer

### Acknowledgements

Este sitio es generado mediante el Exploratorium de retículos conceptuales, un generador de sitios Web, inicialmente concebido para el Exploratorium de teorías del espacio-tiempo. El Exploratorium continúa siendo desarrollado en el Departamento de Modelización Matemática de Sistemas Sociales del Instituto de Investigaciones en Matemáticas Aplicadas y en Sistemas de la Universidad Nacional Autónoma de México, con el apoyo de la SECIHTI a través del programa "Estancias Posdoctorales por México, Convocatoria 2023-1 (No. 5991306), bajo la supervisión del Dr. Eduardo Robles Belmont. Este proyecto ha sido auspiciado también por el proyecto PAPIIT-DGAPA-UNAM (IN302623).

### Copyright

Copyright © 2017-2024, Mariana Espinosa Aldama


## Pages


### Home

```{ .json .config }
{
  "template": "index.tt",
  "output": "index-es.html",
  "navlang": "index.html"
}
```

Proyectos de exploración de redes conceptuales en el Departamento de Modelación Matemática de Sistemas Sociales del IIMAS-UNAM:

#### Sistema Solar, un ejemplo sencillo

Este sitio funciona como una plantilla que puede ser clonada y rediseñada para diferentes propósitos. Utilizamos el famoso ejemplo de la clasificación de los planetas de nuestro Sistema Solar utilizado por Davey y Priestley en "Introduction to lattices and order".


#### Clasificación de planetas de la UAI

Aquí ampliamos el contexto para incluir una clasificación de planetas considerando los criterios de la Unión Astronómica Internacional.


### Guía de exploración

```{ .json .config }
{
  "template": "index.tt",
  "output": "guidance-es.html",
  "navlang": "guidance.html"
}
```

#### Explora la estructura de los retículos conceptuales mediante visualizaciones interactivas
#### Qué hacer:

- Construye tu base de datos usando nuestra plantilla de hoja de cálculo.
- Importa los contextos de tu proyecto al generador Exploratorium.
- Conoce la metodología del Análisis Formal de Conceptos (FCA).
- Aprende la lógica de las redes jerárquicas llamadas retículos.
- Familiarízate con la estructura conceptual de tu dominio.
- Consulta información al hacer clic en las etiquetas.
- Activa y desactiva las etiquetas y los niveles de nodos.
- Compara contextos con dominios compartidos.
- Visualiza en pantalla completa.
- Acerca, aleja o arrastra la red o los nodos seleccionados.
- Resalta subconceptos y supraconceptos.
- Identifica el retículo de la "punta del iceberg".
- Mueve los nodos para reorganizar la red y guarda tus propios ajustes.
- Resalta nodos específicos y encuentra algunos especialmente interesantes.
- Acompaña las lecturas de las fuentes con tu macroscopio.
- Obtén una vista aérea.
- Comparte tus resultados en línea y explora con tus colegas.

Descarga tu propia versión del Exploratorium en: (https://github.com/pupitetris/Exploratorium).


### Marco teórico

```{ .json .config }
{
  "template": "index.tt",
  "output": "frame-es.html",
  "navlang": "frame.html"
}
```


#### Escribe aquí tu marco teórico

La red teórica de clasificación de planetas, planetas enanos y exoplanetas de la Unión Astronómica Internacional (UAI) se basa en un marco sistemático de criterios que distinguen diferentes tipos de cuerpos celestes. Un planeta, según la definición de la UAI, debe orbitar alrededor del Sol, tener suficiente masa para adoptar una forma casi redonda y limpiar su órbita de otros desechos. Los planetas enanos, como Plutón, cumplen las dos primeras condiciones, pero comparten su zona orbital con otros objetos. Esta clasificación crea una red jerárquica que también incluye a los exoplanetas, es decir, planetas que orbitan estrellas fuera de nuestro sistema solar. Si bien los exoplanetas no están sujetos a la misma regla estricta de limpieza orbital que se aplica a los planetas del sistema solar, se clasifican de manera similar en función de su tamaño, masa y características orbitales. Esta red permite a los astrónomos comprender mejor la amplia gama de cuerpos planetarios del universo, lo que fomenta los estudios comparativos entre sistemas y, al mismo tiempo, mantiene distinciones claras entre las diferentes clases de objetos.

### Metodología

```{ .json .config }
{
  "template": "index.tt",
  "output": "methodology-es.html",
  "navlang": "methodology.html"
}
```

El enfoque metodológico del *Exploratorium* se basa en el examen y la construcción de redes jerárquicas conocidas como lattices. Esta clase de redes se distingue por sus propiedades como conjuntos parcialmente ordenados, estableciendo una jerarquía integral.

#### Redes jerárquicas

Las lattices tienen la propiedad de que para cualquier par de nodos solo hay un nodo mínimo y un nodo supremo.

#### Análisis de conceptos formales

A partir de contextos formales representados por tablas de incidencia (G,M,i), utilizamos la metodología del **Análisis de conceptos formales (FCA)**, una teoría matemática basada en la teoría de los retículos de Birkhoff y la conexión de Galois, para visualizar y explorar los retículos de conceptos. El FCA recupera sistemáticamente conceptos formales (ciertos pares ordenados de objetos y atributos), los organiza jerárquicamente y los representa como marcos, ofreciendo una visión profunda de las interdependencias estructurales de los conceptos.


### Bibliografía

```{ .json .config }
{
  "template": "index.tt",
  "output": "bibliography-es.html",
  "navlang": "bibliography.html"
}
```

Lecturas sugeridas para seguir durante la exploración:

- Ganter, B. and Obiedkov, S. "Conceptual Exploration", Springer (2016)
- Espinosa-Aldama, M. "Visualizaciones de redes conceptuales de teorías del
espacio-tiempo y la gravitación", PhD thesis, UAM-C. (http://ilitia.cua.uam.mx:8080/jspui/handle/123456789/1022),
- Readme (https://github.com/pupitetris/Exploratorium).



### Acerca

```{ .json .config }
{
  "template": "index.tt",
  "output": "about-es.html",
  "navlang": "about.html"
}
```

![Portrait of Mariana Espinosa Aldama](images/Mariana_Espinosa.jpg){.float-start .me-3 .mt-3 .portrait}

**Mariana Espinosa Aldama**, fotógrafa y licenciada en Física con una
maestría en Filosofía de la Ciencia de la UNAM, y Doctora en
Ciencias Sociales y Humanidades de la UAM-Cuajimalpa. Actualmente realiza una estancia posdoctoral en el IIMAS-UNAM. Especializada en
el análisis y visualización de datos meta-científicos y el Análisis de Conceptos Formales (FCA), Mariana se
dedica a la comunicación científica a través de textos de divulgación,
ciencia en las calles, imágenes, holografía, infografías, videos y visualización
de datos. Sus diversas contribuciones abarcan temas relacionados con las teorías físicas, la gravitación, relatividad, astronomía y cosmología.

```{ style="clear: left" }
```

![Portrait of Arturo Espinosa Aldama](images/Arturo_Espinosa.jpg){.float-start .me-3 .portrait}

**Arturo Espinosa Aldama** es un programador experto, desarrollador
full stack con 20 años de experiencia en todo el proceso de desarrollo
de software con capacidades confiables de autogestión, investigación y
diseño de arquitectura de software, y atención al detalle y
codificación y pruebas cuidadosas. Conocimiento en niveles altos y
bajos de abstracción: desde implementaciones de protocolo serial
binario RS232 hasta desarrollo rápido de aplicaciones gráficas.


### Aviso legal

```{ .json .config }
{
  "template": "index.tt",
  "output": "legal-es.html",
  "navlang": "legal.html"
}
```

Además del texto escrito por los autores, existen numerosas citas que han sido acreditadas en los cuadros informativos donde se muestran.

#### Imágenes

Las imágenes que utilizamos en el Exploratorium son propiedad de Mariana Espinosa o del dominio público. Aquí se acreditan las pocas excepciones. Si cree que posee los derechos de cualquiera de las imágenes que utilizamos, comuníquese con nosotros de acuerdo con nuestra *política de eliminación*.

#### Política de eliminación

Si cree que posee los derechos sobre cualquiera de los recursos que utilizamos, contáctenos con los siguientes detalles:

- Datos de contacto
- Detalles del recurso
- La dirección del sitio web donde encontró el contenido.
- Detalles de su queja
- Si se queja de una violación de los derechos de autor, indique si es el propietario de los derechos o está autorizado a actuar en su nombre.

Luego tomaremos las siguientes acciones:

- Acuse de recibo de la denuncia por correo electrónico.
- Retirar el elemento objeto de denuncia, pendiente de investigación.
- Podemos recibir asesoramiento de nuestro equipo legal.
- Nosotros o nuestro equipo legal buscaremos verificar la identidad y autoridad del denunciante (por ejemplo, que usted es el titular de los derechos o el agente del titular de los derechos).

Cuando hayamos verificado la autenticidad de la queja y la autoridad del denunciante y que la queja es aparentemente legítima, trabajaremos con usted para resolver la queja, con los siguientes resultados posibles:

- El material será eliminado definitivamente del sitio.
- El material será modificado adecuadamente y devuelto al sitio.
- El material será reintegrado al sitio sin cambios.

#### Informacion registrada

El *Exploratorium de teorías* es un proyecto educativo sin fines de lucro. Todas las reproducciones son bienvenidas siempre que se den los créditos correspondientes.


### Sistema Solar, un ejemplo sencillo

```{ .json .config }
{
  "template": "diagram-page.tt",
  "output": "planetas/es/SS/index.html",
  "navlang": "planetas/en/SS/index.html"
}
```

Clasificacion de los planetas del Sistema Solar, propuesta como un ejemplo sencillo de retículo conceptual por Davey y Priestley en *Introduction to Lattices and Order*.


### Clasificación de planetas de la UAI

```{ .json .config }
{
  "template": "diagram-page.tt",
  "output": "planetas/es/SS-IAU/index.html",
  "navlang": "planetas/en/SS-IAU/index.html"
}
```

En 2006, la Unión Astronómica Internacional (UAI) redefinió los criterios de clasificación de los planetas, lo que llevó a la reclasificación de Plutón como "planeta enano". Según los nuevos criterios, un cuerpo celeste debe cumplir tres condiciones para ser considerado un planeta: debe orbitar alrededor del Sol, tener forma esférica debido a su propia gravedad y haber limpiado su órbita de otros desechos. Plutón cumple los dos primeros criterios, pero no el tercero, ya que su órbita se superpone con otros objetos del Cinturón de Kuiper. Esta decisión provocó un importante debate, pero estableció una distinción más clara entre planetas y cuerpos celestes más pequeños, como los planetas enanos.





