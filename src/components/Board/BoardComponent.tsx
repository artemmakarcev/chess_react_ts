import React, { FC, useEffect, useState } from "react";
import styles from "./Board.module.css";
import { Board } from "../../models/Board";
import CellComponent from "../Cell/CellComponent";
import { Cell } from "../../models/Cell";
import { Player } from "../../models/Player";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  isBoardRotate: boolean;
  setBoardRotate: (toggle: boolean) => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
  isBoardRotate,
  setBoardRotate,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      toggleRotateBoard();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) setSelectedCell(cell);
    }
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function toggleRotateBoard(): void {
    setBoardRotate(isBoardRotate ? false : true);
  }

  return (
    <div>
      <h3 className={styles.currentPlayer}>Текущий игрок {currentPlayer?.color}</h3>
      <div
        className={[styles.board, isBoardRotate ? styles.boardRotate : ""].join(
          " ",
        )}
      >
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                click={click}
                key={cell.id}
                cell={cell}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
                isBoardRotate={isBoardRotate}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
