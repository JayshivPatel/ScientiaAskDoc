import React from "react";
import "./App.scss";
import ExamplePage from "./pages/ExamplePage";
import TopBar from "./organisms/TopBar/TopBar";

const App: React.FC = () => {
  return (
    <>
      <TopBar />
      <ExamplePage />
    </>
  );
};

export default App;
