PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: attr_class
DELETE FROM attr_class;

INSERT INTO attr_class VALUES(1000,'size',1);
INSERT INTO attr_class VALUES(1001,'distance',2);
INSERT INTO attr_class VALUES(1002,'satellites',3);
INSERT INTO attr_class VALUES(1003,'orbit',4);
INSERT INTO attr_class VALUES(1004,'spherical',5);
INSERT INTO attr_class VALUES(1005,'fusion',6);


-- Table: attr_class_desc
DELETE FROM attr_class_desc;

INSERT INTO attr_class_desc VALUES(1000,'en','Size');
INSERT INTO attr_class_desc VALUES(1000,'es','Tamaño');
INSERT INTO attr_class_desc VALUES(1001,'en','Distance');
INSERT INTO attr_class_desc VALUES(1001,'es','Distancia');
INSERT INTO attr_class_desc VALUES(1002,'en','Has satellites');
INSERT INTO attr_class_desc VALUES(1002,'es','Tiene satélites');
INSERT INTO attr_class_desc VALUES(1003,'en','Orbit');
INSERT INTO attr_class_desc VALUES(1003,'es','Órbita');
INSERT INTO attr_class_desc VALUES(1004,'en','Spherical');
INSERT INTO attr_class_desc VALUES(1004,'es','Esférico');
INSERT INTO attr_class_desc VALUES(1005,'en','Fusion');
INSERT INTO attr_class_desc VALUES(1005,'es','Fusión');


-- Table: attr_context_class
DELETE FROM attr_context_class;

INSERT INTO attr_context_class VALUES(1,1,1001,'y');
INSERT INTO attr_context_class VALUES(2,1,1001,'y');
INSERT INTO attr_context_class VALUES(3,1,1000,'y');
INSERT INTO attr_context_class VALUES(4,1,1000,'y');
INSERT INTO attr_context_class VALUES(5,1,1000,'y');
INSERT INTO attr_context_class VALUES(6,1,1002,'y');
INSERT INTO attr_context_class VALUES(7,1,1003,'y');
INSERT INTO attr_context_class VALUES(8,1,1003,'y');
INSERT INTO attr_context_class VALUES(9,1,1005,'y');
INSERT INTO attr_context_class VALUES(10,1,1004,'y');
INSERT INTO attr_context_class VALUES(11,1,1003,'y');


-- Table: attribute
DELETE FROM attribute;

INSERT INTO attribute VALUES(1,'x');
INSERT INTO attribute VALUES(2,'x');
INSERT INTO attribute VALUES(3,'x');
INSERT INTO attribute VALUES(4,'x');
INSERT INTO attribute VALUES(5,'x');
INSERT INTO attribute VALUES(6,'x');
INSERT INTO attribute VALUES(7,'x');
INSERT INTO attribute VALUES(8,'x');
INSERT INTO attribute VALUES(9,'x');
INSERT INTO attribute VALUES(10,'x');
INSERT INTO attribute VALUES(11,'x');


-- Table: attribute_context
DELETE FROM attribute_context;

INSERT INTO attribute_context VALUES(1,1);
INSERT INTO attribute_context VALUES(2,1);
INSERT INTO attribute_context VALUES(3,1);
INSERT INTO attribute_context VALUES(4,1);
INSERT INTO attribute_context VALUES(5,1);
INSERT INTO attribute_context VALUES(6,1);
INSERT INTO attribute_context VALUES(8,2);
INSERT INTO attribute_context VALUES(7,2);
INSERT INTO attribute_context VALUES(9,2);
INSERT INTO attribute_context VALUES(10,2);
INSERT INTO attribute_context VALUES(11,2);
INSERT INTO attribute_context VALUES(6,2);


-- Table: attribute_desc
DELETE FROM attribute_desc;

INSERT INTO attribute_desc VALUES(1,1,'en','Near','Near','The object is near the Sun, that is, inside the asteroid belt.',NULL);
INSERT INTO attribute_desc VALUES(1,1,'es','Cerca','Cerca','El objeto está cerca del Sol, es decir, dentro del cinturón de asteroides.',NULL);
INSERT INTO attribute_desc VALUES(2,1,'en','Far','Far','The object is far from the Sun, that is, outside the asteroid belt.',NULL);
INSERT INTO attribute_desc VALUES(2,1,'es','Lejos','Lejos','El objeto está lejos del Sol, es decir, fuera del cinturón de asteroides.',NULL);
INSERT INTO attribute_desc VALUES(3,1,'en','Small','Small','The object is small in size.',NULL);
INSERT INTO attribute_desc VALUES(3,1,'es','Chico','Chico','El objeto es de tamaño pequeño.',NULL);
INSERT INTO attribute_desc VALUES(4,1,'en','Medium','Medium','The object has a medium size.',NULL);
INSERT INTO attribute_desc VALUES(4,1,'es','Mediano','Mediano','El objeto tiene un tamaño mediano.',NULL);
INSERT INTO attribute_desc VALUES(5,1,'en','Big','Big','The object is big in size.',NULL);
INSERT INTO attribute_desc VALUES(5,1,'es','Grande','Grande','El objeto es de tamaño grande.',NULL);
INSERT INTO attribute_desc VALUES(6,1,'en','Has satellites','Has satellites','The object has satellites.',NULL);
INSERT INTO attribute_desc VALUES(6,1,'es','Satelites','Sí tiene satélites','El objeto tiene satélites.',NULL);
INSERT INTO attribute_desc VALUES(7,1,'en','Around the sun','Around the Sun','The object orbits around the sun.',NULL);
INSERT INTO attribute_desc VALUES(7,1,'es','Alrededor del Sol','Alrededor del Sol','El objeto orbita alrededor del Sol.',NULL);
INSERT INTO attribute_desc VALUES(8,1,'en','Around a star','Around a star','The object orbits around another star',NULL);
INSERT INTO attribute_desc VALUES(8,1,'es','Alrededor de una estrella','Alrededor de una estrella','El objeto orbita alrededor de otra estrella',NULL);
INSERT INTO attribute_desc VALUES(9,1,'en','Fusion','Fusion','The object is massive enough to produce themonuclear fusion.',NULL);
INSERT INTO attribute_desc VALUES(9,1,'es','Fusion','Fusión','El objeto es lo suficientemente masivo como para producir la fusión nuclear.',NULL);
INSERT INTO attribute_desc VALUES(10,1,'en','Spherical','Spherical','The object is massive enough to be rounded by its own gravity.',NULL);
INSERT INTO attribute_desc VALUES(10,1,'es','Esferico','Esférico','El objeto es lo suficientemente masivo como para ser redondeado por su propia gravedad.',NULL);
INSERT INTO attribute_desc VALUES(11,1,'en','Clean','Clean orbit','The object has cleaned its orbit from solid objects thought to exist in protoplanetary disks and debris disks, called planetisimals.',NULL);
INSERT INTO attribute_desc VALUES(11,1,'es','Limpia','Órbita limpia','El objeto ha limpiado su órbita de objetos sólidos que se cree que existen en discos protoplanetarios y discos de escombros, llamados planetesimales.',NULL);


-- Table: context
DELETE FROM context;

INSERT INTO context VALUES(1,1,'SS');
INSERT INTO context VALUES(2,1,'SS-IAU');


-- Table: context_class
DELETE FROM context_class;

INSERT INTO context_class VALUES(1,'Additive');


-- Table: lang
DELETE FROM lang;

INSERT INTO lang VALUES('en','English');
INSERT INTO lang VALUES('es','Español');


-- Table: object
DELETE FROM object;

INSERT INTO object VALUES(1,'Mer',NULL,NULL);
INSERT INTO object VALUES(2,'Ven',NULL,NULL);
INSERT INTO object VALUES(3,'Earth','De Revolutionibus Orbium Coelestium, Nicolás Copérnico',1543);
INSERT INTO object VALUES(4,'Mars',NULL,NULL);
INSERT INTO object VALUES(5,'Jup',NULL,NULL);
INSERT INTO object VALUES(6,'Sat',NULL,NULL);
INSERT INTO object VALUES(7,'Uran','Herschel, William; «Account of a Comet. By Mr. Herschel, F. R. S.; communicated by Dr. Watson, Jun. of Bath, F. R. S.» Philosophical Transactions of the Royal Society of London, Vol. 71, pp. 492-501.',1781);
INSERT INTO object VALUES(8,'Nep','Urbain LeVerrier, “Account of the Discovery of the Planet of Le Verrier at Berlin”, Monthly Notices of the Royal Astronomical Society, Vol. 7, No. 9, pp. 153–157.',1846);
INSERT INTO object VALUES(9,'Pluto','Tombaugh, Clyde W.; «The Search for the Ninth Planet, Pluto.» Astronomical Society of the Pacific Leaflets, Vol. 5, No. 209 , pp. 73-80.',1930);
INSERT INTO object VALUES(10,'Ceres','Giuseppe Piazzi',1801);
INSERT INTO object VALUES(11,'Planet','IAU',2006);
INSERT INTO object VALUES(12,'Kepler','NASA-Kepler Telescope',2014);
INSERT INTO object VALUES(13,'Sun',NULL,NULL);


-- Table: object_attribute
DELETE FROM object_attribute;

INSERT INTO object_attribute VALUES(1,1,1,1,1);
INSERT INTO object_attribute VALUES(1,1,3,1,1);
INSERT INTO object_attribute VALUES(2,1,1,1,1);
INSERT INTO object_attribute VALUES(2,1,3,1,1);
INSERT INTO object_attribute VALUES(3,1,1,1,1);
INSERT INTO object_attribute VALUES(3,1,3,1,1);
INSERT INTO object_attribute VALUES(3,1,6,1,1);
INSERT INTO object_attribute VALUES(4,1,1,1,1);
INSERT INTO object_attribute VALUES(4,1,3,1,1);
INSERT INTO object_attribute VALUES(4,1,6,1,1);
INSERT INTO object_attribute VALUES(5,1,2,1,1);
INSERT INTO object_attribute VALUES(5,1,5,1,1);
INSERT INTO object_attribute VALUES(5,1,6,1,1);
INSERT INTO object_attribute VALUES(6,1,2,1,1);
INSERT INTO object_attribute VALUES(6,1,5,1,1);
INSERT INTO object_attribute VALUES(6,1,6,1,1);
INSERT INTO object_attribute VALUES(7,1,2,1,1);
INSERT INTO object_attribute VALUES(7,1,4,1,1);
INSERT INTO object_attribute VALUES(7,1,6,1,1);
INSERT INTO object_attribute VALUES(8,1,2,1,1);
INSERT INTO object_attribute VALUES(8,1,4,1,1);
INSERT INTO object_attribute VALUES(8,1,6,1,1);
INSERT INTO object_attribute VALUES(9,1,2,1,1);
INSERT INTO object_attribute VALUES(9,1,3,1,1);
INSERT INTO object_attribute VALUES(9,1,6,1,1);
INSERT INTO object_attribute VALUES(1,2,7,2,1);
INSERT INTO object_attribute VALUES(1,2,10,2,1);
INSERT INTO object_attribute VALUES(1,2,11,2,1);
INSERT INTO object_attribute VALUES(2,2,7,2,1);
INSERT INTO object_attribute VALUES(2,2,10,2,1);
INSERT INTO object_attribute VALUES(2,2,11,2,1);
INSERT INTO object_attribute VALUES(3,2,7,2,1);
INSERT INTO object_attribute VALUES(3,2,10,2,1);
INSERT INTO object_attribute VALUES(3,2,11,2,1);
INSERT INTO object_attribute VALUES(3,2,6,2,1);
INSERT INTO object_attribute VALUES(4,2,7,2,1);
INSERT INTO object_attribute VALUES(4,2,10,2,1);
INSERT INTO object_attribute VALUES(4,2,11,2,1);
INSERT INTO object_attribute VALUES(4,2,6,2,1);
INSERT INTO object_attribute VALUES(5,2,7,2,1);
INSERT INTO object_attribute VALUES(5,2,10,2,1);
INSERT INTO object_attribute VALUES(5,2,11,2,1);
INSERT INTO object_attribute VALUES(5,2,6,2,1);
INSERT INTO object_attribute VALUES(6,2,7,2,1);
INSERT INTO object_attribute VALUES(6,2,10,2,1);
INSERT INTO object_attribute VALUES(6,2,11,2,1);
INSERT INTO object_attribute VALUES(6,2,6,2,1);
INSERT INTO object_attribute VALUES(7,2,7,2,1);
INSERT INTO object_attribute VALUES(7,2,10,2,1);
INSERT INTO object_attribute VALUES(7,2,11,2,1);
INSERT INTO object_attribute VALUES(7,2,6,2,1);
INSERT INTO object_attribute VALUES(8,2,7,2,1);
INSERT INTO object_attribute VALUES(8,2,10,2,1);
INSERT INTO object_attribute VALUES(8,2,11,2,1);
INSERT INTO object_attribute VALUES(8,2,6,2,1);
INSERT INTO object_attribute VALUES(9,2,7,2,1);
INSERT INTO object_attribute VALUES(9,2,6,2,1);
INSERT INTO object_attribute VALUES(10,2,7,2,1);
INSERT INTO object_attribute VALUES(11,2,7,2,1);
INSERT INTO object_attribute VALUES(11,2,10,2,1);
INSERT INTO object_attribute VALUES(11,2,11,2,1);
INSERT INTO object_attribute VALUES(12,2,8,2,1);
INSERT INTO object_attribute VALUES(12,2,10,2,1);
INSERT INTO object_attribute VALUES(12,2,11,2,1);
INSERT INTO object_attribute VALUES(13,2,7,2,1);
INSERT INTO object_attribute VALUES(13,2,9,2,1);
INSERT INTO object_attribute VALUES(13,2,10,2,1);
INSERT INTO object_attribute VALUES(13,2,11,2,1);
INSERT INTO object_attribute VALUES(13,2,6,2,1);


-- Table: object_context
DELETE FROM object_context;

INSERT INTO object_context VALUES(1,1);
INSERT INTO object_context VALUES(2,1);
INSERT INTO object_context VALUES(3,1);
INSERT INTO object_context VALUES(4,1);
INSERT INTO object_context VALUES(5,1);
INSERT INTO object_context VALUES(6,1);
INSERT INTO object_context VALUES(7,1);
INSERT INTO object_context VALUES(8,1);
INSERT INTO object_context VALUES(9,1);
INSERT INTO object_context VALUES(1,2);
INSERT INTO object_context VALUES(2,2);
INSERT INTO object_context VALUES(3,2);
INSERT INTO object_context VALUES(4,2);
INSERT INTO object_context VALUES(5,2);
INSERT INTO object_context VALUES(6,2);
INSERT INTO object_context VALUES(7,2);
INSERT INTO object_context VALUES(8,2);
INSERT INTO object_context VALUES(9,2);
INSERT INTO object_context VALUES(10,2);
INSERT INTO object_context VALUES(11,2);
INSERT INTO object_context VALUES(12,2);
INSERT INTO object_context VALUES(13,2);


-- Table: object_desc
DELETE FROM object_desc;

INSERT INTO object_desc VALUES(1,'en','Mercury','Mercury','Small, rocky, and closest to the Sun');
INSERT INTO object_desc VALUES(1,'es','Mercurio','Mercurio','Pequeño, rocoso y el más cercano al Sol.');
INSERT INTO object_desc VALUES(2,'en','Venus','Venus','Hot, with thick clouds and extreme greenhouse effect.');
INSERT INTO object_desc VALUES(2,'es','Venus','Venus','Caluroso, con nubes espesas y un efecto invernadero extremo.');
INSERT INTO object_desc VALUES(3,'en','Earth','Earth','The only planet known to support life, with oceans and land.');
INSERT INTO object_desc VALUES(3,'es','Tierra','Tierra','El único planeta conocido que alberga vida, con océanos y tierra.');
INSERT INTO object_desc VALUES(4,'en','Mars','Mars','Red, dusty, and potentially home to ancient water.');
INSERT INTO object_desc VALUES(4,'es','Marte','Marte','Rojo, polvoriento y potencialmente hogar de agua antigua.');
INSERT INTO object_desc VALUES(5,'en','Jupiter','Jupiter','Massive gas giant with a Great Red Spot storm.');
INSERT INTO object_desc VALUES(5,'es','Júpiter','Júpiter','Gigante gaseoso masivo con una tormenta llamada Gran Mancha Roja.');
INSERT INTO object_desc VALUES(6,'en','Saturn','Saturn','Gas giant with prominent, beautiful rings.');
INSERT INTO object_desc VALUES(6,'es','Saturno','Saturno','Gigante gaseoso con anillos prominentes y hermosos.');
INSERT INTO object_desc VALUES(7,'en','Uranus','Uranus','Ice giant tilted on its side, with faint rings.');
INSERT INTO object_desc VALUES(7,'es','Urano','Urano','Gigante de hielo inclinado de lado, con anillos tenues.');
INSERT INTO object_desc VALUES(8,'en','Neptune','Neptune','Cold, blue ice giant with strong winds.');
INSERT INTO object_desc VALUES(8,'es','Neptuno','Neptuno','Gigante de hielo azul y frío con fuertes vientos.');
INSERT INTO object_desc VALUES(9,'en','Pluto','Pluto','A small, icy dwarf planet in the Kuiper Belt, with a highly elliptical orbit.');
INSERT INTO object_desc VALUES(9,'es','Pluton','Pluton','Un pequeño planeta enano helado en el Cinturón de Kuiper, con una órbita altamente elíptica.');
INSERT INTO object_desc VALUES(10,'en','Ceres','Ceres','The largest object in the asteroid belt, a dwarf planet with a rocky surface and possible water-ice beneath.');
INSERT INTO object_desc VALUES(10,'es','Ceres','Ceres','El objeto más grande del cinturón de asteroides, un planeta enano con una superficie rocosa y posible hielo de agua debajo.');
INSERT INTO object_desc VALUES(11,'en','Planet','Planet','Model of planet according to the IAU');
INSERT INTO object_desc VALUES(11,'es','Planeta','Planeta','Modelo de planeta de acuerdo a la IAU.');
INSERT INTO object_desc VALUES(12,'en','Kepler-186f','Kepler-186f','An Earth-sized planet in the habitable zone of its star Kepler 186.');
INSERT INTO object_desc VALUES(12,'es','Kepler-186f','Kepler-186f','Un exoplaneta del tamaño de la Tierra en la zona habitable de la estrella Kepler 186.');
INSERT INTO object_desc VALUES(13,'en','Sun','Sun','A massive, glowing ball of hot plasma, the central star of our solar system, providing heat and light to support life on Earth through nuclear fusion at its core.');
INSERT INTO object_desc VALUES(13,'es','Sol','Sol','Una enorme y brillante bola de plasma caliente, la estrella central de nuestro Sistema Solar, que proporciona calor y luz para sustentar la vida en la Tierra a través de la fusión nuclear en su núcleo.');


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
