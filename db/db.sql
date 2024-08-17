CREATE TABLE RUOLI
(
    ID_RUOLO SERIAL PRIMARY KEY,
    RUOLO_DESC VARCHAR(200) NOT NULL
);

INSERT INTO RUOLI (ID_RUOLO, RUOLO_DESC) VALUES (1, 'root'), (2, 'tutor'), (3, 'user');

CREATE TABLE Utenti
(
    ID_UTENTE SERIAL PRIMARY KEY,
    USERNAME VARCHAR(200) NOT NULL,
    PASSWORD VARCHAR(255) NULL,
    PRIVILEGI INT NOT NULL,
    FOREIGN KEY (PRIVILEGI) REFERENCES RUOLI (ID_RUOLO)
);

CREATE TABLE Discente
(
    ID_DISCENTE SERIAL PRIMARY KEY,
    NOME VARCHAR(200) NOT NULL,
    COGNOME VARCHAR(200) NOT NULL,
    MAIL VARCHAR(200) NOT NULL,
    FK_UTENTE INT NULL,
    FOREIGN KEY (FK_UTENTE) REFERENCES Utenti (ID_UTENTE)
);

CREATE TABLE Tutor
(
    ID_TUTOR SERIAL PRIMARY KEY,
    FK_UTENTE INT NOT NULL, /*si collega alla tabella utente*/
    NOME VARCHAR(200) NOT NULL,
    COGNOME VARCHAR(200) NOT NULL,
    PATH_IMG VARCHAR(200) NULL,
    MAIL VARCHAR(200) NULL,
    INFO VARCHAR(600) NULL, /*Descrizione dell'utente*/
    FOREIGN KEY (FK_UTENTE) REFERENCES Utenti (ID_UTENTE)
);

CREATE TABLE Materie
(
    ID_MATERIA SERIAL PRIMARY KEY,
    NOME_MATERIA VARCHAR(200) NOT NULL
);

CREATE TABLE Tutor_materie
(
    ID SERIAL PRIMARY KEY,
    FK_TUTOR INT NOT NULL,
    FK_MATERIA INT NOT NULL,
    PREZZO INT NULL,
    FOREIGN KEY (FK_TUTOR) REFERENCES Tutor (ID_TUTOR),
    FOREIGN KEY (FK_MATERIA) REFERENCES Materie (ID_MATERIA)
);

CREATE TABLE Lingue
(
    ID_LINGUA SERIAL PRIMARY KEY,
    NOME_LINGUA varchar(100)
);

CREATE TABLE Competenze_linguistiche
(
    ID_COMPETENZE_LINGUISTICHE SERIAL PRIMARY KEY,
    FK_LINGUA INTEGER NOT NULL,
    FK_TUTOR INTEGER NOT NULL,
    FOREIGN KEY (FK_LINGUA) REFERENCES Lingue(ID_LINGUA),
    FOREIGN KEY (FK_TUTOR) REFERENCES Tutor(ID_TUTOR)
);

CREATE TABLE Istruzione
(
    ID_ISTRUZIONE SERIAL PRIMARY KEY,
    LIVELLO_ISTRUZIONE varchar(100)
);

CREATE TABLE Competenze_istr
(
    ID_COMPETENZE SERIAL PRIMARY KEY,
    FK_TUTOR INTEGER NOT NULL,
    FK_ISTRUZIONE INTEGER NOT NULL,
    FOREIGN KEY (FK_TUTOR) REFERENCES Tutor(ID_TUTOR),
    FOREIGN KEY (FK_ISTRUZIONE) REFERENCES Istruzione(ID_ISTRUZIONE)
);

CREATE TABLE Fasce_orarie
(
    ID_FASCIA_ORARIA SERIAL PRIMARY KEY,
    FASCIA_ORARIA varchar,
    GIORNO        varchar
);

CREATE TABLE Lezioni
(
    ID_LEZIONE SERIAL PRIMARY KEY,
    FK_TUTOR INTEGER,
    FK_DISCENTE INTEGER,
    FK_MATERIA  INTEGER,
    FK_FASCIA_ORARIA INTEGER,
    FOREIGN KEY (FK_TUTOR) REFERENCES Tutor(ID_TUTOR),
    FOREIGN KEY (FK_DISCENTE) REFERENCES Discente(ID_DISCENTE),
    FOREIGN KEY (FK_MATERIA) REFERENCES Materie(ID_MATERIA),
    FOREIGN KEY (FK_FASCIA_ORARIA) REFERENCES Fasce_orarie(ID_FASCIA_ORARIA)
);

/* ID -> id dell'utente */

INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('matteofranchini', 'f7c533827e8c4f6ac1ef59e40e269ecadb5bd763dd5bc6a47a799cf71f094add', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('deborabini', '2a44cb596eaab3b36cf11bf56f8bc0b0ca06c8c10de81fd6fb30ac60e4d176e4', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('elenafreddi', '2111338f54e2bb3f1670b204fe36585250fcb50095e486c823a68766ac069808', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('mattiarossi', 'efa200b8c2cac9fd974df78b6efa4489324ca1bd050f5652c8724b3f4662af20', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('elebrusco', 'ed13fd02dad21a41368264f47b9570028cca4079e332aacaf6d1e7e066cf9c8b', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('fede_bastoni', '9fc2329fa7daca557f6951c961deb9c9ddb8ad993b60fdf38f8426f8bfc6e880', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('giulia_bianchi', '7d48181c1018c7bc38d5bcbb74eeae3511569ff12b087538c156b8a87f91f759', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('luca_ferri', 'a589764d354ea88fcfb8b494a1ff71569be185730ac2b079c2a4feb38f267d51', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('sofia_conti', '8aefa0cd0d8a081317adfe30822c62571c35c5c9ce18099db3a84ed20a913db2', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('matteoesposito', '5bb48e146b14fc5048d8739a4a39f0f650910563e6d89f51c50bd6a310c69eff', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('andre_romano', 'c094bdaaefad98ba962cbbf0f3b8263f4c0d86fbdf325e7579f86c5e025177fd', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('elisa_ricci', '4e5ad0013693ace1fb6e4916bd7efc28c885afca42d6c368c6911b43147d0efe', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('valentinagreco', '5e69d289339420b98a74c8e1c42893e106f7cf90885c01a2826e275c33b17134', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('fra_gallo', '582616c90d305a807d257243e92560400384f977fdb5965bb58139749721f3de', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('marti_leo', 'dd60f9d65a47b17bd8fa73f0b59a2671347155bc8ca5b6835d2b7a514a939438', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('ale_more', 'ec4f35fa2fb0b9f724309394fddee51ae5a50c2c0fadcfba40443c6de481e353', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('chiara_fonta', '769a7d63b407f78a693da4c1066c98c08ac50180c58f4adb9dae9970f0d46482', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('dave_rina', '149b1393dc21a1c9498b4edffb78cb176b68b4e1f18e6e8faca4e63ce7c6f713', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('sara_de_luca', '5386e86cec71307b54f0e21b3c26a17250d410270847a4ff192371625ab46225', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('fede_sanna', 'fa0bfd9197a723c29d95fe459c8a9b38b2b27f82724fb0b5286543c4d7ccca6a', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('lauramarini', 'a789eebb8afec44ea6e9a8ab9e4ad5c6ae841622e31a86ee06502ca5108562d7', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('anna_vitali', '6f0fa33a0f39d973893828b6f79c1d9b87d95fd4ca3c515e977a54a703c46bb0', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('simo_orlando', '1a7c8bce16a6a98d2b2948c6d9433b8796c6431bcffa2c6f7a47e6a41f62791d', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('gio_marchetti', '39dc19d9ca9cd3f025230f1c7b866a5aa525f7c28feb55ed0f9a03648b379500', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('anto_romano', '59fc17251a2192764c7378042a08b3698c8894a21b01ec0ce186f482518f0d83', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('auro_bellini', 'b1f43b6cc6880c1164f1d20a292995be8ac9022494949776324651b320d281e8', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('lucasantini', 'd854525ac9cc92fc2ac0b34a2bacd748ce918d1a3384ec7a1a72755e477856b6', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('marta_ferraro', 'b40397d94becb6427f6cae0fc407b79b6804fbe0c794b99c7302adc3eb42f80f', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('giada_rossetti', 'ff75e78184c26d2eb7c94a28009bffaafd6e46a252176582b9d9901d6d420c71', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('sabri_morelli', '54a95802a440db1f413288b887498c4db5d97643f150ae0cc2e1e318338c484c', 2);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('alessandra.verdi', 'fb66b0b6d18fa598eeb4bbfe3729d2e7cd889c8e46363a2478a3c7f585fcc6b1', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('riccardo.neri', '07aabdcac1ab653472ff9fcd33db9519d7a1b0eb7ca6b02b6f1d8e6f83949352', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('gaia.parisi', '6e1df22beddf03c90a5e228e1cfb9e9b0f4476865f71b64c57fc21d2056926e0', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('tommaso.grandi', '0e2b22b350a3e7539dbe229e514fbaaed575b4298d0dfd8c482452c4b2911c49', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('giorgia.desantis', '160e30bd1f9f08965c808fc6f69d5ab51b7d632b9ea6911b3b3d77f43ec85d67', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('leonardo.sorrentino', '8b0fa2cce3e5ab08b628dc3da55443f20273e19d5ee0179efa112d9a20680761', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('alessia.barone', '000c266ba478f5c59b0a096be85bb8c250213cbced99bedbb5dc8d72fd66ef68', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('daniele.greco', 'cd9c79879f62e77df631528aead4060891d5ea1a3969d690edff4b19b5915371', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('camilla.ruggeri', '75c478d7f622ae755e1f545dd52cd6a8a10624fd74f0b6101eb6aef2c3e1d470', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('filippo.marchesi', 'd4616c6b89be9a9c0308a5b427469005a126b08220ea56a5404371a58154c93d', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('martina.damico', 'af733da0e042c1e2cbb7b185e61806ef028e0ea587068a45d3f7c5a9b9f4dc03', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('lorenzo.serra', '22f8ed4c6d7d0315398ce7b4b1e7d9e04f5561c14292e8ffa8797a64fe620dee', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('sofia.testa', 'f1074694c130e0bfcf7c08c36d8dfd4b564162a53a774a9af36f4699046ec5fe', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('edoardo.barbieri', '005c5cc896dc54bdd58d8afb4d49a666594586a3e356338cffa1c85c19df2a36', 3);
INSERT INTO Utenti (USERNAME, PASSWORD, PRIVILEGI) VALUES ('valeria.pellegrini', 'a5fce3d42cae0dee27ffb30ed2335926e0b64f902846aa47d6bd6cfe3afec1ee', 3);

INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Alessandra', 'Verdi', 31, 'alessandra.verdi@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Riccardo', 'Neri', 32, 'riccardo.neri@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Gaia', 'Parisi', 33, 'gaia.parisi@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Tommaso', 'Grandi', 34, 'tommaso.grandi@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Giorgia', 'De Santis', 35, 'giorgia.desantis@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Leonardo', 'Sorrentino', 36, 'leonardo.sorrentino@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Alessia', 'Barone', 37, 'alessia.barone@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Daniele', 'Greco', 38, 'daniele.greco@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Camilla', 'Ruggeri', 39, 'camilla.ruggeri@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Filippo', 'Marchesi', 40, 'filippo.marchesi@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Martina', 'D’Amico', 41, 'martina.damico@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Lorenzo', 'Serra', 42, 'lorenzo.serra@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Sofia', 'Testa', 43, 'sofia.testa@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Edoardo', 'Barbieri', 44, 'edoardo.barbieri@gmail.com');
INSERT INTO Discente(NOME, COGNOME, FK_UTENTE, MAIL) VALUES ('Valeria', 'Pellegrini', 45, 'valeria.pellegrini@gmail.com');

INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (1, 'Matteo', 'Franchini', 'matteo.franchini@gmail.com', '../../images/Avatars/8.jpg', 'Sono un appassionato di tecnologia e programmazione, sempre alla ricerca di nuovi strumenti e metodologie. Mi piace coinvolgere gli studenti in progetti pratici per far emergere il loro potenziale creativo e analitico.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (2, 'Debora', 'Bini', 'debora.bini@gmail.com', '../../images/Avatars/7.jpg', 'Adoro viaggiare e immergermi in culture diverse, e cerco di portare questa passione nelle mie lezioni. Credo che l apprendimento debba essere interattivo e stimolante, con un forte focus sulla pratica.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (3, 'Elena', 'Freddi', 'elena.freddi@gmail.com', '../../images/Avatars/1.jpg', 'Mi dedico al benessere degli studenti, creando un ambiente inclusivo e stimolante. Ritengo importante che ogni studente si senta ascoltato e valorizzato, e cerco di trasmettere questo nelle mie lezioni.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (4, 'Mattia', 'Rossi', 'mattia.rossi@gmail.com', '../../images/Avatars/10.jpg', 'Sono affascinato dai fenomeni naturali e mi piace rendere accessibili anche i concetti più complessi. Amo coinvolgere gli studenti in esperimenti e simulazioni per farli appassionare.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (5, 'Eleonora', 'Brusco', 'eleonora.brusco@gmail.com', '../../images/Avatars/3.jpg', 'La mia passione per larte mi spinge a esplorare sempre nuove prospettive. Amo combinare teoria e pratica, offrendo agli studenti esperienze che li avvicinano al mondo artistico in modo concreto e coinvolgente.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (6, 'Federico', 'Bastoni', 'federico.bastoni@gmail.com', '../../images/Avatars/6.jpg', 'Sono una persona metodica e amo analizzare problemi complessi. Mi piace guidare gli studenti attraverso un percorso logico, aiutandoli a sviluppare il loro pensiero critico e la loro capacità di risolvere problemi.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (7, 'Giulia', 'Bianchi', 'giulia.bianchi@gmail.com', '../../images/Avatars/2.jpg', 'Amo la letteratura e la scrittura creativa. Nelle mie lezioni, incoraggio gli studenti a esplorare nuove idee e a esprimersi liberamente, creando un ambiente dove la creatività può fiorire.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (8, 'Luca', 'Ferri', 'luca.ferri@gmail.com', '../../images/Avatars/10.jpg', 'Sono sempre alla ricerca di soluzioni innovative e amo lavorare su progetti che combinano teoria e pratica. Mi piace ispirare gli studenti a pensare in modo critico e a sviluppare soluzioni creative.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (9, 'Sofia', 'Conti', 'sofia.conti@gmail.com', '../../images/Avatars/3.jpg', 'Sono profondamente curiosa e amo esplorare il mondo che ci circonda. Cerco di trasmettere questa curiosità agli studenti, incoraggiandoli a fare domande e a scoprire nuove realtà attraverso la ricerca e lesplorazione.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (10, 'Matteo', 'Esposito', 'matteo.esposito@gmail.com', '../../images/Avatars/6.jpg', 'Sono appassionato di tecnologia e sicurezza informatica. Mi piace condividere le mie conoscenze in modo pratico, coinvolgendo gli studenti in attività che simulano situazioni reali e li preparano per le sfide future.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (11, 'Andrea', 'Romano', 'andrea.romano@gmail.com', '../../images/Avatars/8.jpg', 'La filosofia è per me una lente attraverso cui esplorare il mondo. Amo discutere e confrontarmi con gli studenti, stimolando il loro pensiero critico e aiutandoli a trovare collegamenti tra teoria e vita quotidiana.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (12, 'Elisa', 'Ricci', 'elisa.ricci@gmail.com', '../../images/Avatars/7.jpg', 'Mi piace rendere visibili i fenomeni scientifici attraverso esperimenti che coinvolgano direttamente gli studenti. Credo che l apprendimento debba essere un esperienza attiva e coinvolgente.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (13, 'Valentina', 'Greco', 'valentina.greco@gmail.com', '../../images/Avatars/2.jpg', 'Sono appassionata di lingue e culture. Amo immergermi nei dettagli della grammatica e della fonetica, aiutando gli studenti a sviluppare una comprensione profonda e autentica delle lingue che studiamo insieme.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (14, 'Francesco', 'Gallo', 'francesco.gallo@gmail.com', '../../images/Avatars/8.jpg', 'Sono un narratore nato e amo raccontare storie che portano il passato in vita. Credo che comprendere la storia ci aiuti a capire meglio il presente, e cerco di trasmettere questa passione agli studenti.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (15, 'Martina', 'Leone', 'martina.leone@gmail.com', '../../images/Avatars/2.jpg', 'Sono interessata a come le persone interagiscono tra loro e come le società si evolvono. Mi piace creare un ambiente di apprendimento collaborativo, dove gli studenti possano esplorare e discutere insieme i vari temi sociali.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (16, 'Alessandro', 'Moretti', 'alessandro.moretti@gmail.com', '../../images/Avatars/10.jpg', 'Amo il design e la costruzione, e mi piace condividere questa passione con gli studenti. Li incoraggio a pensare fuori dagli schemi e a sperimentare con nuove idee per creare progetti unici e sostenibili.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (17, 'Chiara', 'Fontana', 'chiara.fontana@gmail.com', '../../images/Avatars/5.jpg', 'La musica è il mio linguaggio preferito. Amo esplorare nuove composizioni e suoni, e cerco di trasmettere questa passione agli studenti, incoraggiandoli a esprimere la loro creatività attraverso la musica.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (18, 'Davide', 'Rinaldi', 'davide.rinaldi@gmail.com', '../../images/Avatars/4.jpg', 'Sono appassionato di sport e benessere fisico. Mi piace motivare gli studenti a mantenersi attivi e a prendersi cura di sé stessi, offrendo lezioni pratiche e consigli utili per uno stile di vita sano.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (19, 'Sara', 'De Luca', 'sara.deluca@gmail.com', '../../images/Avatars/9.jpg', 'Mi affascina il comportamento umano e mi piace aiutare gli studenti a comprendere meglio se stessi e gli altri. Credo che la conoscenza delle dinamiche psicologiche sia essenziale per il benessere personale e sociale.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (20, 'Federica', 'Sanna', 'federica.sanna@gmail.com', '../../images/Avatars/5.jpg', 'Amo il mare e tutto ciò che lo riguarda. Cerco di trasmettere questa passione nelle mie lezioni, coinvolgendo gli studenti in discussioni e progetti che esplorano le meraviglie dell ambiente marino e la sua conservazione.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (21, 'Laura', 'Marini', 'laura.marini@gmail.com', '../../images/Avatars/5.jpg', 'Mi piace esplorare il mondo attraverso la geografia e capire come i luoghi influenzano le persone. Cerco di trasmettere questa curiosità agli studenti, aiutandoli a vedere il mondo con occhi nuovi.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (22, 'Anna', 'Vitali', 'anna.vitali@gmail.com', '../../images/Avatars/2.jpg', 'Sono molto interessata a formare cittadini consapevoli e responsabili. Amo coinvolgere gli studenti in dibattiti e discussioni su temi attuali, stimolando il loro pensiero critico e la loro partecipazione attiva nella società.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (23, 'Simone', 'Orlando', 'simone.orlando@gmail.com', '../../images/Avatars/4.jpg', 'Sono affascinato dalla tecnologia e dalla possibilità di creare cose nuove. Amo guidare gli studenti in progetti pratici, dove possono imparare facendo e sviluppare le loro capacità di problem-solving.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (24, 'Giovanni', 'Marchetti', 'giovanni.marchetti@gmail.com', '../../images/Avatars/6.jpg', 'Mi piace esplorare le grandi domande dell universo e stimolare la curiosità degli studenti. Credo che la fisica sia non solo una scienza, ma anche un modo per riflettere su chi siamo e sul mondo in cui viviamo.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (25, 'Antonio', 'Romano', 'antonio.romano@gmail.com', '../../images/Avatars/4.jpg', 'Il volo e lo spazio sono le mie grandi passioni. Mi piace condividere questa meraviglia con gli studenti, coinvolgendoli in progetti che esplorano le sfide e le opportunità del volo e della tecnologia aerospaziale.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (26, 'Aurora', 'Bellini', 'aurora.bellini@gmail.com', '../../images/Avatars/2.jpg', 'Sono innamorata della letteratura inglese, e adoro immergermi nelle opere dei grandi autori. Cerco di trasmettere questa passione ai miei studenti, incoraggiandoli a esplorare testi che abbiano un impatto duraturo.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (27, 'Luca', 'Santini', 'luca.santini@gmail.com', '../../images/Avatars/10.jpg', 'Amo progettare e creare spazi che siano funzionali e belli. Credo che l architettura sia una forma d arte che migliora la vita quotidiana, e cerco di ispirare i miei studenti a pensare in modo creativo e sostenibile.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (28, 'Marta', 'Ferraro', 'marta.ferraro@gmail.com', '../../images/Avatars/2.jpg', 'Mi interessa molto come gli ecosistemi funzionano e si adattano. Cerco di trasmettere questa passione agli studenti, coinvolgendoli in progetti che esplorano l interazione tra gli organismi e l ambiente.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (29, 'Giada', 'Rossetti', 'giada.rossetti@gmail.com', '../../images/Avatars/9.jpg', 'Sono affascinata dalle dinamiche sociali e amo capire come le persone si relazionano tra loro. Cerco di creare un ambiente di apprendimento interattivo, dove gli studenti possano esplorare e discutere le diverse sfaccettature della società.');
INSERT INTO Tutor (FK_UTENTE, NOME, COGNOME, MAIL, PATH_IMG, INFO) VALUES (30, 'Sabrina', 'Morelli', 'sabrina.morelli@gmail.com', '../../images/Avatars/9.jpg', 'Amo l arte del Rinascimento e mi piace portare in vita le opere dei grandi maestri attraverso le mie lezioni. Credo che la storia dell arte ci aiuti a capire meglio la nostra cultura e il nostro passato.');


INSERT INTO Materie (NOME_MATERIA) VALUES ('Matematica');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Analisi Matematica');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Fisica');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Chimica');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Biologia');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Scienze');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Storia');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Arte & Storia');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Geografia');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Diritto ed economia');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Diritto privato');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Diritto costituzionale');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Diritto europeo');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Filosofia');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Greco');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Latino');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Scienze sociali');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Antropologia');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Sociologia');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Psicologia');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Storia della musica');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Storia del teatro');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Recitazione');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Sistemi e reti');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Programmazione');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Tecnologie');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Italiano');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Inglese');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Spagnolo');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Francese');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Tedesco');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Russo');
INSERT INTO Materie (NOME_MATERIA) VALUES ('Cinese');


INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 25, 1, 16 );
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 26, 1, 26 );
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 1, 1, 26 );
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 24, 2, 17);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 25, 2, 22);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 28, 3, 18);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 31, 3, 20);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 26, 4, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 14, 5, 28);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 32, 6, 34);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 33, 7, 34);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 7, 8, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 8, 8, 18);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 9, 8, 17);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 2, 9, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 3, 9, 18);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 4, 9, 17);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 10, 10, 12);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 11, 10, 23);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 12, 10, 29);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 13, 10, 34);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 8, 11, 16);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 8, 12, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 27, 13, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 15, 13, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 16, 13, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 7, 13, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 30, 14, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 27, 15, 25);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 22, 16, 25);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 23, 16, 16);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 19, 17, 28);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 20, 17, 26);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 7, 18, 18);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 9, 18, 15);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 10, 19, 25);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 11, 19, 28);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 12, 19, 30);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 17, 20, 23);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 18, 20, 21);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 19, 20, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 20, 20, 17);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 29, 21, 22);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 1, 22, 32);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 2, 22, 17);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 3, 22, 18);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 19, 23, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 20, 23, 27);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 21, 24, 24);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 28, 25, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 30, 25, 15);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 5, 26, 29);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 6, 26, 22);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 17, 27, 25);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 18, 27, 20);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 1, 28, 16);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 2, 28, 19);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 3, 28, 35);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 4, 29, 26);
INSERT INTO Tutor_materie(FK_MATERIA, FK_TUTOR, PREZZO) VALUES ( 33, 30, 27);

INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('08:00', 'lun');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('09:00', 'lun');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('10:00', 'lun');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('11:00', 'lun');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('14:00', 'lun');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('15:00', 'lun');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('16:00', 'lun');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('17:00', 'lun');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('18:00', 'lun');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('21:00', 'lun');

INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('08:00', 'mar');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('09:00', 'mar');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('10:00', 'mar');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('11:00', 'mar');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('14:00', 'mar');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('15:00', 'mar');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('16:00', 'mar');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('17:00', 'mar');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('18:00', 'mar');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('21:00', 'mar');

INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('08:00', 'mer');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('09:00', 'mer');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('10:00', 'mer');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('11:00', 'mer');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('14:00', 'mer');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('15:00', 'mer');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('16:00', 'mer');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('17:00', 'mer');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('18:00', 'mer');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('21:00', 'mer');

INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('08:00', 'gio');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('09:00', 'gio');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('10:00', 'gio');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('11:00', 'gio');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('14:00', 'gio');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('15:00', 'gio');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('16:00', 'gio');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('17:00', 'gio');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('18:00', 'gio');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('21:00', 'gio');

INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('08:00', 'ven');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('09:00', 'ven');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('10:00', 'ven');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('11:00', 'ven');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('14:00', 'ven');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('15:00', 'ven');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('16:00', 'ven');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('17:00', 'ven');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('18:00', 'ven');
INSERT INTO fasce_orarie (FASCIA_ORARIA, GIORNO) VALUES ('21:00', 'ven');

INSERT INTO lingue (ID_LINGUA, NOME_LINGUA) VALUES (1, 'Italiano');
INSERT INTO lingue (ID_LINGUA, NOME_LINGUA) VALUES (2, 'Inglese');
INSERT INTO lingue (ID_LINGUA, NOME_LINGUA) VALUES (3, 'Spagnolo');
INSERT INTO lingue (ID_LINGUA, NOME_LINGUA) VALUES (4, 'Francese');
INSERT INTO lingue (ID_LINGUA, NOME_LINGUA) VALUES (5, 'Tedesco');

INSERT INTO istruzione (LIVELLO_ISTRUZIONE) VALUES ('Diploma');
INSERT INTO istruzione (LIVELLO_ISTRUZIONE) VALUES ('Laurea Triennale');
INSERT INTO istruzione (LIVELLO_ISTRUZIONE) VALUES ('Laurea Magistrale');
INSERT INTO istruzione (LIVELLO_ISTRUZIONE) VALUES ('Dottorato');

INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 1);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 2);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 3);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 4);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 5);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 6);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 7);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 8);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 9);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 10);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 11);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 12);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 13);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 14);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 15);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 16);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 17);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 18);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 19);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 20);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 21);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 22);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 23);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 24);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 25);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 26);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 27);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 28);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 29);
INSERT INTO competenze_linguistiche (FK_LINGUA, FK_TUTOR) VALUES (1, 30);

INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (1, 2);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (2, 4);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (3, 1);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (4, 3);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (5, 2);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (6, 4);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (7, 1);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (8, 3);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (9, 2);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (10, 4);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (11, 1);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (12, 3);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (13, 2);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (14, 4);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (15, 1);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (16, 3);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (17, 2);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (18, 4);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (19, 1);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (20, 3);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (21, 2);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (22, 4);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (23, 1);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (24, 3);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (25, 2);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (26, 4);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (27, 1);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (28, 3);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (29, 2);
INSERT INTO competenze_istr (FK_TUTOR, FK_ISTRUZIONE) VALUES (30, 4);
