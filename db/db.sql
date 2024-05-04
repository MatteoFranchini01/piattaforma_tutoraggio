create table Discente
(
    ID_DISCENTE int auto_increment
        primary key,
    NOME        varchar(200) not null,
    COGNOME     varchar(200) not null,
    ID          int  null,
    constraint Discente_Utenti_ID_fk
        foreign key (ID) references Utenti (ID)
);

create table Lezioni
(
    ID_LEZ      int auto_increment
        primary key,
    ID_TUTOR    int null,
    ID_DISCENTE int null,
    ID_MATERIA  int null,
    constraint Lezioni_Discente_ID_DISCENTE_fk
        foreign key (ID_DISCENTE) references Discente (ID_DISCENTE),
    constraint Lezioni_Materie_ID_fk
        foreign key (ID_MATERIA) references Materie (ID),
    constraint Lezioni_Tutor_ID_TUTOR_fk
        foreign key (ID_TUTOR) references Tutor (ID_TUTOR)
);

create table Materie
(
    ID       int auto_increment
        primary key,
    NOME     varchar(200) not null,
    TUTOR_ID int  null,
    PREZZO   int  null,
    constraint Materie_Tutor_ID_TUTOR_fk
        foreign key (TUTOR_ID) references Tutor (ID_TUTOR)
);

create table RUOLI
(
    ID         int  not null
        primary key,
    RUOLO_DESC varchar(200) not null
);

INSERT INTO RUOLI (ID, RUOLO_DESC) VALUES (1, 'root'), (2, 'tutor'), (3, 'user');

create table Tutor
(
    ID       int  null,
    NOME     char null,
    COGNOME  char null,
    MAIL     char null,
    ID_TUTOR int  not null
        primary key,
    constraint Tutor_Utenti_ID_fk
        foreign key (ID) references Utenti (ID)
);

create table Utenti
(
    ID        int auto_increment
        primary key,
    NOME      char       not null,
    COGNOME   char       not null,
    PASSWORD  varchar(1) null,
    PRIVILEGI int        not null,
    constraint Utenti_RUOLI_ID_fk
        foreign key (PRIVILEGI) references RUOLI (ID)
);
