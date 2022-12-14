import React from "react";
import MainContainer from "../MainContainer";
import Footer from "./Footer";
import Header from "./Header";

const App = () => {
  return (
    <>
      <Header />

      <div className="relative" id="root">
        <MainContainer />
      </div>

      <Footer />
    </>
  );
};

export default App;
