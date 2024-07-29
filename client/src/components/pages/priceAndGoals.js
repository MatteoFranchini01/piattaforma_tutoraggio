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
                        <h4 className="basic-titles uno">Titolo 1</h4>
                        <p className="basic-paragraph-prices-goals"> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </p>
                    </div>
                    <div className="box prices-goals second-box-price">
                        <h4 className="basic-titles due">Titolo 2</h4>
                        <p className="basic-paragraph-prices-goals">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    </div>
                    <div className="box prices-goals third-box-price">
                        <h4 className="basic-titles tre">Titolo 3</h4>
                        <p className="basic-paragraph-prices-goals">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    </div>
                </div>
            </div>
        </>
    );
}