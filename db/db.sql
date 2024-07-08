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
    fascia_oraria varchar
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

INSERT INTO Utenti (ID, USERNAME, PASSWORD, PRIVILEGI) VALUES (1, 'matteo', '2414', 2);

INSERT INTO Tutor (ID, NOME, COGNOME, MAIL, ID_TUTOR) VALUES (1, 'matteo', 'franchini', '', 1);

INSERT INTO Materie (ID, NOME, TUTOR_ID, PREZZO) VALUES (1, 'mate', 1, 10);
INSERT INTO Materie (ID, NOME, TUTOR_ID, PREZZO) VALUES (2, 'pippo', 1, 20);

INSERT INTO fasce_orarie (ID, FASCIA_ORARIA) VALUES (1, '08:00 - 09:00');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA) VALUES (2, '09:00 - 10:00');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA) VALUES (3, '10:00 - 11:00');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA) VALUES (4, '11:00 - 12:00');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA) VALUES (5, '14:00 - 15:00');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA) VALUES (6, '15:00 - 16:00');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA) VALUES (7, '16:00 - 17:00');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA) VALUES (8, '17:00 - 18:00');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA) VALUES (9, '18:00 - 19:00');
INSERT INTO fasce_orarie (ID, FASCIA_ORARIA) VALUES (10, '21:00 - 22:00');

INSERT INTO lingue (ID, LINGUA) VALUES (1, 'italiano');
INSERT INTO lingue (ID, LINGUA) VALUES (2, 'inglese');
INSERT INTO lingue (ID, LINGUA) VALUES (3, 'spagnolo');