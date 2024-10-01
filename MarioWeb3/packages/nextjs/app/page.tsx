"use client";

import { useEffect } from "react";
import { initializePhaserGame } from "../../../game.js";

const Home = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      initializePhaserGame();
    }
  }, []);

  return (
    <div>
      <h1>Mama mia, Super Mario Web3</h1>
      <div id="game"></div>
    </div>
  );
};

export default Home;
