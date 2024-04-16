create table Discente
(
    ID_DISCENTE int auto_increment
        primary key,
    NOME        char not null,
    COGNOME     char not null,
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
    NOME     char not null,
    TUTOR_ID int  null,
    PREZZO   int  null,
    constraint Materie_Tutor_ID_TUTOR_fk
        foreign key (TUTOR_ID) references Tutor (ID_TUTOR)
);

create table RUOLI
(
    ID         int  not null
        primary key,
    RUOLO_DESC char not null
);

create table Tutor
(
    ID       int  null,
    NOME     char null,
    COGNOME  char null,
    LUOGO    char null,
    ID_TUTOR int  not null
        primary key,
    constraint Tutor_Utenti_ID_fk
        foreign key (ID) references Utenti (ID)
);

create table Utenti
(
    ID        int auto_increment
        primary key,
    NOME      char not null,
    COGNOME   char not null,
    PRIVILEGI int  not null,
    constraint Utenti_RUOLI_ID_fk
        foreign key (PRIVILEGI) references RUOLI (ID)
);

