PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: attr_class
DROP TABLE IF EXISTS attr_class;

CREATE TABLE attr_class (
	attr_class_id INTEGER
		PRIMARY KEY AUTOINCREMENT,
	code TEXT
		UNIQUE NOT NULL
		COLLATE NOCASE,
	ord INTEGER
		UNIQUE NOT NULL,
	CHECK (code <> ''))
STRICT;


-- Table: attr_class_desc
DROP TABLE IF EXISTS attr_class_desc;

CREATE TABLE attr_class_desc (
	attr_class_id INTEGER
		REFERENCES attr_class (attr_class_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	lang_code TEXT
		REFERENCES lang (lang_code)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	title TEXT
		NOT NULL
		COLLATE NOCASE,
	PRIMARY KEY (attr_class_id, lang_code),
	CHECK (title <> ''))
STRICT;


-- Table: attr_diagram_class
DROP TABLE IF EXISTS attr_diagram_class;

CREATE TABLE attr_diagram_class (
	attribute_id INTEGER
		REFERENCES attribute (attribute_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	diagram_class_id INTEGER
		REFERENCES diagram_class (diagram_class_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	attr_class_id INTEGER
		REFERENCES attr_class (attr_class_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	reference TEXT,
	PRIMARY KEY (attribute_id, diagram_class_id),
	CHECK (reference <> ''))
STRICT;


-- Table: attribute
DROP TABLE IF EXISTS attribute;

CREATE TABLE attribute (
	attribute_id INTEGER
		PRIMARY KEY AUTOINCREMENT,
	formula TEXT,
	CHECK (formula <> ''))
STRICT;


-- Table: attribute_desc
DROP TABLE IF EXISTS attribute_desc;

CREATE TABLE attribute_desc (
	attribute_id INTEGER,
	diagram_class_id INTEGER,
	lang_code TEXT
		REFERENCES lang (lang_code)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	label TEXT
		NOT NULL
		COLLATE NOCASE,
	title TEXT
		DEFAULT NULL,
	explanation TEXT
		DEFAULT NULL,
	obs TEXT,
	PRIMARY KEY (attribute_id, diagram_class_id, lang_code),
	FOREIGN KEY (attribute_id, diagram_class_id)
		REFERENCES attr_diagram_class (attribute_id, diagram_class_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	UNIQUE (diagram_class_id, lang_code, label),
	CHECK (label <> '' and title <> '' AND explanation <> '' and obs <> ''))
STRICT;


-- Table: attribute_diagram
DROP TABLE IF EXISTS attribute_diagram;

CREATE TABLE attribute_diagram (
	attribute_id INTEGER
		REFERENCES attribute (attribute_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	diagram_id INTEGER
		REFERENCES diagram (diagram_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (attribute_id, diagram_id))
STRICT;


-- Table: diagram
DROP TABLE IF EXISTS diagram;

CREATE TABLE diagram (
	diagram_id INTEGER
		PRIMARY KEY AUTOINCREMENT,
	diagram_class_id INTEGER
		REFERENCES diagram_class (diagram_class_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	code TEXT
		NOT NULL
		UNIQUE COLLATE NOCASE,
	CHECK (code <> ''))
STRICT;


-- Table: diagram_class
DROP TABLE IF EXISTS diagram_class;

CREATE TABLE diagram_class (
	diagram_class_id INTEGER
		PRIMARY KEY AUTOINCREMENT,
	code TEXT
		UNIQUE COLLATE NOCASE
		NOT NULL,
	CHECK (code <> ''))
STRICT;


-- Table: lang
DROP TABLE IF EXISTS lang;

CREATE TABLE lang (
	lang_code TEXT
		PRIMARY KEY
		COLLATE NOCASE,
	lang_label TEXT
		UNIQUE COLLATE NOCASE
		NOT NULL,
	CHECK (lang_label <> ''))
STRICT;


-- Table: object
DROP TABLE IF EXISTS object;

CREATE TABLE object (
	object_id INTEGER
		NOT NULL
		PRIMARY KEY AUTOINCREMENT,
	code TEXT
		UNIQUE NOT NULL
		COLLATE NOCASE,
	CHECK (code <> ''))
STRICT;


-- Table: object_attribute
DROP TABLE IF EXISTS object_attribute;

CREATE TABLE object_attribute (
	object_id INTEGER,
	object_diagram_id INTEGER,
	attribute_id INTEGER,
	attr_diagram_id INTEGER,
	x INTEGER
		DEFAULT (1)
		NOT NULL,
	PRIMARY KEY (object_id, object_diagram_id, attribute_id, attr_diagram_id),
	FOREIGN KEY (object_id, object_diagram_id)
		REFERENCES object_diagram (object_id, diagram_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY (attribute_id, attr_diagram_id)
		REFERENCES attribute_diagram (attribute_id, diagram_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	CHECK (object_diagram_id = attr_diagram_id),
	CHECK (x = 1))
STRICT;


-- Table: object_desc
DROP TABLE IF EXISTS object_desc;

CREATE TABLE object_desc (
	object_id INTEGER
		REFERENCES object (object_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	lang_code TEXT
		REFERENCES lang (lang_code)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	label TEXT
		NOT NULL
		COLLATE NOCASE,
	PRIMARY KEY (object_id, lang_code),
	UNIQUE (lang_code, label),
	CHECK (label <> ''))
STRICT;


-- Table: object_diagram
DROP TABLE IF EXISTS object_diagram;

CREATE TABLE object_diagram (
	object_id INTEGER
		REFERENCES object (object_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	diagram_id INTEGER
		REFERENCES diagram (diagram_id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
		DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (object_id, diagram_id))
STRICT;


-- View: v_attr_class_diagram
DROP VIEW IF EXISTS v_attr_class_diagram;

CREATE VIEW v_attr_class_diagram AS
SELECT
	attribute_desc.label AS attribute_label,
	attr_class.code AS class_code,
	diagram.code AS diagram_code
FROM
	attribute,
	attr_diagram_class,
	attribute_desc,
	attr_class,
	diagram,
	attribute_diagram
WHERE
	attribute.attribute_id = attr_diagram_class.attribute_id
	AND attr_diagram_class.attribute_id = attribute_desc.attribute_id
	AND attr_diagram_class.attr_class_id = attr_class.attr_class_id
	AND diagram.diagram_id = attribute_diagram.diagram_id
	AND attribute.attribute_id = attribute_diagram.attribute_id
;


-- View: v_attribute_classes
DROP VIEW IF EXISTS v_attribute_classes;

CREATE VIEW v_attribute_classes AS
SELECT
	ac.code AS Code,
	en.title AS Title_en,
	es.title AS Title_es
FROM
	attr_class AS ac
	LEFT JOIN attr_class_desc AS en
		ON ac.attr_class_id = en.attr_class_id
		AND en.lang_code = 'en'
	LEFT JOIN attr_class_desc AS es
		ON ac.attr_class_id = es.attr_class_id
		AND es.lang_code = 'es'
	ORDER BY
		ac.ord
;


-- View: v_attribute_diagram
DROP VIEW IF EXISTS v_attribute_diagram;

CREATE VIEW v_attribute_diagram AS
SELECT
	ad.lang_code AS Lang,
	d.code AS Diagram,
	ad.label AS Attribute
FROM
	attribute AS a
	NATURAL JOIN attribute_diagram
	NATURAL JOIN attribute_desc AS ad
	NATURAL JOIN diagram AS d
	NATURAL JOIN attr_diagram_class AS adc
ORDER BY
	Lang,
	Diagram
;


-- View: v_attributes
DROP VIEW IF EXISTS v_attributes;

CREATE VIEW v_attributes AS
SELECT
	ad.lang_code AS Lang,
	d.code AS Diagram,
	ac.code AS Class,
	ad.label AS Attribute,
	ad.title AS Title,
	a.formula AS Formula,
	ad.explanation AS Explanation,
	adc.reference AS Reference
FROM
	attribute AS a
	NATURAL JOIN attribute_diagram
	NATURAL JOIN attribute_desc AS ad
	NATURAL JOIN diagram AS d
	NATURAL JOIN attr_diagram_class AS adc
	JOIN attr_class AS ac USING (attr_class_id)
ORDER BY
	Lang,
	Diagram,
	Class
;


-- View: v_context_assignments
DROP VIEW IF EXISTS v_context_assignments;

CREATE VIEW v_context_assignments AS
SELECT
	contexts.Lang,
	contexts.Diagram,
	contexts.ObjectCode,
	contexts.Object,
	contexts.Attribute,
	contexts.Class,
	COALESCE(object_attribute.x, 0) AS x,
	object_attribute.object_id,
	object_attribute.attribute_id
FROM
	v_contexts AS contexts
	LEFT OUTER JOIN object_attribute
		ON contexts.object_id = object_attribute.object_id
	AND contexts.attribute_id = object_attribute.attribute_id
	AND contexts.diagram_id = object_attribute.object_diagram_id
ORDER BY
	contexts.Diagram ASC,
	contexts.Object ASC
;


-- View: v_contexts
DROP VIEW IF EXISTS v_contexts;

CREATE VIEW v_contexts AS
SELECT
	lang.lang_code AS Lang,
	diagram.code AS Diagram,
	object.code AS ObjectCode,
	object_desc.label AS Object,
	attribute_desc.label AS Attribute,
	attr_class.code AS Class,
	object_diagram.object_id,
	attribute_diagram.attribute_id,
	diagram.diagram_id
FROM
	lang,
	object,
	object_desc,
	attribute_desc,
	attr_diagram_class,
	attribute,
	attr_class,
	diagram,
	diagram_class,
	attribute_diagram,
	object_diagram
WHERE
	object.object_id = object_desc.object_id
	AND object_desc.lang_code = lang.lang_code
	AND attribute_desc.lang_code = lang.lang_code
	AND attribute.attribute_id = attr_diagram_class.attribute_id
	AND attr_diagram_class.attribute_id = attribute_desc.attribute_id
	AND attr_diagram_class.diagram_class_id = attribute_desc.diagram_class_id
	AND attr_diagram_class.attr_class_id = attr_class.attr_class_id
	AND attribute_diagram.attribute_id = attribute.attribute_id
	AND diagram_class.diagram_class_id = diagram.diagram_class_id
	AND diagram_class.diagram_class_id = attribute_desc.diagram_class_id
	AND diagram.diagram_id = attribute_diagram.diagram_id
	AND object_diagram.object_id = object_desc.object_id
	AND diagram.diagram_id = object_diagram.diagram_id
ORDER BY
	"Lang" ASC,
	"Diagram" ASC,
	"Object" ASC,
	"Attribute" ASC
;


-- View: v_diagram_class
DROP VIEW IF EXISTS v_diagram_class;

CREATE VIEW v_diagram_class AS
SELECT
	diagram_id,
	d.code AS diagram,
	dc.code AS class
FROM
	diagram AS d
	JOIN diagram_class AS dc USING (diagram_class_id)
;


-- View: v_object_diagram
DROP VIEW IF EXISTS v_object_diagram;

CREATE VIEW v_object_diagram AS
SELECT
	od.lang_code AS Lang,
	d.code AS Diagram,
	od.label AS Object,
	o.code AS Code
FROM
	object AS o
	NATURAL JOIN object_diagram
	NATURAL JOIN object_desc AS od
	JOIN diagram AS d USING (diagram_id)
ORDER BY
	Lang,
	Diagram
;


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
