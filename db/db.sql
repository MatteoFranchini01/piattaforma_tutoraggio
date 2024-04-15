create table DISCENTE
(
    ID          INTEGER   not null,
    NOME        CHARACTER not null,
    COGNOME     CHARACTER not null,
    ID_DISCENTE INTEGER auto_increment,
    constraint DISCENTE_PK
        primary key (ID_DISCENTE),
    constraint DISCENTE_UTENTI_ID_FK
        foreign key (ID) references UTENTI
);

create table LEZIONI
(
    ID_LEZ      INTEGER auto_increment,
    ID_TUTOR    INTEGER,
    ID_DISCENTE INTEGER,
    ID_MATERIA  INTEGER not null,
    constraint LEZIONI_PK
        primary key (ID_LEZ),
    constraint LEZIONI_DISCENTE_ID_DISCENTE_FK
        foreign key (ID_DISCENTE) references DISCENTE,
    constraint LEZIONI_MATERIE_ID_FK
        foreign key (ID_MATERIA) references MATERIE,
    constraint LEZIONI_TUTOR_ID_TUTOR_FK
        foreign key (ID_TUTOR) references TUTOR
);

create table MATERIE
(
    ID       INTEGER auto_increment,
    NOME     CHARACTER,
    TUTOR_ID INTEGER,
    constraint MATERIE_PK
        primary key (ID),
    constraint MATERIE_TUTOR_ID_TUTOR_FK
        foreign key (TUTOR_ID) references TUTOR
);

create table RUOLI
(
    ID    INTEGER not null,
    RUOLO INTEGER,
    constraint RUOLI_PK
        primary key (ID)
);

create table TUTOR
(
    ID       INTEGER,
    NOME     CHARACTER,
    COGNOME  CHARACTER,
    LUOGO    CHARACTER,
    ID_TUTOR INTEGER not null,
    constraint TUTOR_PK
        primary key (ID_TUTOR),
    constraint TUTOR_UTENTI_ID_FK
        foreign key (ID) references UTENTI
);

create table UTENTI
(
    ID        INTEGER auto_increment,
    NOME      CHARACTER not null,
    PWD       CHARACTER not null,
    PRIVILEGI INTEGER   not null,
    constraint PRIMARY_KEY
        primary key (ID),
    constraint UTENTI_RUOLI_ID_FK
        foreign key (PRIVILEGI) references RUOLI
);