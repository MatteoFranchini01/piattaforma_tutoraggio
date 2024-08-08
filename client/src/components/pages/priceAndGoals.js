import react from "react";
import "../../css/priceandgoals.css"
import React from "react";

export default function PriceAndGoals(){
    return(
        <>
            <div className="main-container-price-goals">
                <h2 className="h2-title-price-goals">Prezzi e obiettivi</h2>
                <div className="box-container price-goals">
                    <div className="box prices-goals first-box-price">
                        <h4 className="basic-titles uno">Obbiettivi</h4>
                        <p className="basic-paragraph-prices-goals">
                            L'obbiettivo di KnowHow è quello di mettere in contatto studenti e tutor.
                            Il servizio permette ad entrambi le parti interessate la possibilità di scambiarsi un indirizzo email per comunicare tra loro.
                            KowHow non offre un servizio di messaggistica integrato, nè una piattaforma utile per le video conferenze.
                            Di conseguenza, spetta a coloro che sono coinvolti la responsabilità di accordarsi, privatamente, su quale piattaforma utilizzare per svolgere la lezione.
                            All'interno del sito è possibile visionare i propri impegni: ai tutor viene mostrato l'elenco degli orari prenotati dagli studenti; mentre agli studenti viene data la possibilità di visionare quali lezioni hanno prenotato.

                        </p>
                    </div>
                    <div className="box prices-goals second-box-price">
                        <h4 className="basic-titles due">Prezzi</h4>
                        <p className="basic-paragraph-prices-goals">
                            Ogni tutor ha la facoltà di stabilire il prezzo per ciascuna lezione.
                            Si suggerisce di determinare tale importo tenendo conto della materia trattata e del livello di esperienza del tutor. <br/>
                            KnowHow non fornisce alcun servizio di pagamento integrato e non si assume responsabilità nel caso in cui gli accordi tra le parti non vengano rispettati.
                            È responsabilità degli studenti, e nel caso siano minorenni, delle loro famiglie, effettuare i pagamenti agli insegnanti in modo tempestivo.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}