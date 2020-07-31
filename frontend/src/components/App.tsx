import React from "react";
import "./App.scss";
import ExamplePage from "./pages/ExamplePage";
import TopBar from "./organisms/TopBar/TopBar";
import BottomBar from "./organisms/BottomBar/BottomBar";

const App: React.FC = () => {
  return (
    <>
      <TopBar />
      <ExamplePage />
      <BottomBar />
    </>
  );
};

export default App;
