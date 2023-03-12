import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
    return (
        <>
            <div className="container">
                <div className="child">
                    <div>ようこそ</div>
                    <Link to={`/product/circuit`}>「○」</Link>
                    <br/>
                    <Link to={`/product/rectsound`}>「□」</Link>
                </div>
            </div>
        </>
    );
}

export default App;
