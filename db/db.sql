CREATE TABLE RUOLI
(
    ID SERIAL PRIMARY KEY,
    RUOLO_DESC VARCHAR(200) NOT NULL
);

INSERT INTO RUOLI (ID, RUOLO_DESC) VALUES (1, 'root'), (2, 'tutor'), (3, 'user');

CREATE TABLE Utenti
(
    ID SERIAL PRIMARY KEY,
    USERNAME VARCHAR(200) NOT NULL,
    PASSWORD VARCHAR(255) NULL,
    PRIVILEGI INT NOT NULL,
    CONSTRAINT Utenti_RUOLI_ID_fk FOREIGN KEY (PRIVILEGI) REFERENCES RUOLI (ID)
);

CREATE TABLE Tutor
(
    ID INT NULL,
    NOME VARCHAR(200) NULL,
    COGNOME VARCHAR(200) NULL,
    MAIL VARCHAR(200) NULL,
    ID_TUTOR SERIAL PRIMARY KEY,
    CONSTRAINT Tutor_Utenti_ID_fk FOREIGN KEY (ID) REFERENCES Utenti (ID)
);

CREATE TABLE Discente
(
    ID_DISCENTE SERIAL PRIMARY KEY,
    NOME VARCHAR(200) NOT NULL,
    COGNOME VARCHAR(200) NOT NULL,
    ID INT NULL,
    CONSTRAINT Discente_Utenti_ID_fk FOREIGN KEY (ID) REFERENCES Utenti (ID)
);

CREATE TABLE Materie
(
    ID SERIAL PRIMARY KEY,
    NOME VARCHAR(200) NOT NULL,
    TUTOR_ID INT NULL,
    PREZZO INT NULL,
    CONSTRAINT Materie_Tutor_ID_TUTOR_fk FOREIGN KEY (TUTOR_ID) REFERENCES Tutor (ID_TUTOR)
);

create table lezioni
(
    id_lez      serial
        primary key,
    id_tutor    integer
        constraint lezioni_tutor_id_tutor_fk
        references tutor,
    id_discente integer
        constraint lezioni_discente_id_discente_fk
        references discente,
    id_materia  integer
        constraint lezioni_materie_id_fk
        references materie,
    id_fascia   integer
        constraint lezioni_fasce_orarie_id_fk
        references fasce_orarie
);


create table fasce_orarie
(
    id            integer not null
        constraint fasce_orarie_pk
            primary key,
    fascia_oraria varchar,
    giorno        varchar
);

create table lingue
(
    id     integer not null
        constraint lingue_parlate_pk
            primary key,
    lingua varchar
);

create table competenze_linguistiche
(
    id        integer not null
        constraint competenze_linguistiche_pk
            primary key,
    id_lingua integer
        constraint competenze_linguistiche_lingue_id_fk
            references lingue,
    id_tutor  integer
        constraint competenze_linguistiche_tutor_id_tutor_fk
            references tutor
);

create table competenze_istr
(
    id       integer not null
        constraint competenze_istr_pk
            primary key,
    id_tutor integer
        constraint competenze_istr_tutor_id_tutor_fk
            references tutor,
    id_istr  integer
        constraint competenze_istr_istruzione_id_fk
            references istruzione
);

create table istruzione
(
    id                 integer not null
        constraint istruzione_pk
            primary key,
    livello_istruzione varchar
);


INSERT INTO Utenti (ID, USERNAME, PASSWORD, PRIVILEGI) VALUES (1, 'matteo', '2414', 2);
INSERT INTO Utenti (ID, USERNAME, PASSWORD, PRIVILEGI) VALUES (2, 'debora', '2414', 2);

INSERT INTO Tutor (ID, NOME, COGNOME, MAIL, ID_TUTOR) VALUES (1, 'matteo', 'franchini', '', 1);
INSERT INTO Tutor (ID, NOME, COGNOME, MAIL, ID_TUTOR) VALUES (2, 'debora', 'bini', '', 2);

INSERT INTO Materie (ID, NOME, TUTOR_ID, PREZZO) VALUES (1, 'mate', 1, 10);
INSERT INTO Materie (ID, NOME, TUTOR_ID, PREZZO) VALUES (2, 'pippo', 1, 20);

INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (1, '08:00', 'lun');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (2, '09:00', 'lun');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (3, '10:00', 'lun');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (4, '11:00', 'lun');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (5, '14:00', 'lun');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (6, '15:00', 'lun');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (7, '16:00', 'lun');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (8, '17:00', 'lun');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (9, '18:00', 'lun');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (10, '21:00', 'lun');

INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (11, '08:00', 'mar');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (12, '09:00', 'mar');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (13, '10:00', 'mar');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (14, '11:00', 'mar');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (15, '14:00', 'mar');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (16, '15:00', 'mar');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (17, '16:00', 'mar');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (18, '17:00', 'mar');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (19, '18:00', 'mar');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (20, '21:00', 'mar');

INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (21, '08:00', 'mer');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (22, '09:00', 'mer');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (23, '10:00', 'mer');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (24, '11:00', 'mer');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (25, '14:00', 'mer');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (26, '15:00', 'mer');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (27, '16:00', 'mer');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (28, '17:00', 'mer');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (29, '18:00', 'mer');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (30, '21:00', 'mer');

INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (31, '08:00', 'gio');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (32, '09:00', 'gio');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (33, '10:00', 'gio');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (34, '11:00', 'gio');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (35, '14:00', 'gio');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (36, '15:00', 'gio');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (37, '16:00', 'gio');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (38, '17:00', 'gio');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (39, '18:00', 'gio');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (40, '21:00', 'gio');

INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (41, '08:00', 'ven');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (42, '09:00', 'ven');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (43, '10:00', 'ven');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (44, '11:00', 'ven');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (45, '14:00', 'ven');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (46, '15:00', 'ven');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (47, '16:00', 'ven');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (48, '17:00', 'ven');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (49, '18:00', 'ven');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA, GIORNO) VALUES (50, '21:00', 'ven');

INSERT INTO lingue (ID, LINGUA) VALUES (1, 'italiano');
INSERT INTO lingue (ID, LINGUA) VALUES (2, 'inglese');
INSERT INTO lingue (ID, LINGUA) VALUES (3, 'spagnolo');

INSERT INTO istruzione (ID, LIVELLO_ISTRUZIONE) VALUES (1, 'diploma');
INSERT INTO istruzione (ID, LIVELLO_ISTRUZIONE) VALUES (2, 'laurea trienalle');
INSERT INTO istruzione (ID, LIVELLO_ISTRUZIONE) VALUES (3, 'laurea magistrale');

INSERT INTO competenze_linguistiche (ID, ID_LINGUA, ID_TUTOR) VALUES (1, 1, 2);
INSERT INTO competenze_linguistiche (ID, ID_LINGUA, ID_TUTOR) VALUES (1, 2, 3);

INSERT INTO competenze_istr (ID, ID_TUTOR, ID_ISTR) VALUES (1, 1, 3);
INSERT INTO competenze_istr (ID, ID_TUTOR, ID_ISTR) VALUES (2, 2, 1);
