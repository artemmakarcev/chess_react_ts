import { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./components/Board/BoardComponent";
import LostFiguresComponent from "./components/LostFigures/LostFiguresComponent";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";
import TimerComponent from "./components/Timer/TimerComponent";

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isBoardRotate, setBoardRotate] = useState(false);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer,
    );
  }

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    // newBoard.addFisherFigures();
    setBoard(newBoard);
  }

  return (
    <div className="app">
      <TimerComponent
        currentPlayer={currentPlayer}
        restart={restart}
        setBoardRotate={setBoardRotate}
      />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        isBoardRotate={isBoardRotate}
        setBoardRotate={setBoardRotate}
      />
      <div>
        <LostFiguresComponent
          title="Черные фигуры"
          figures={board.lostBlackFigures}
        />
        <LostFiguresComponent
          title="Белые фигуры"
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
};

export default App;
