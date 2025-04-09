import { FC } from "react";
import styles from "./Cell.module.css";
import { Cell } from "../../models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
  isBoardRotate: boolean;
}
// isBoardRotate ? styles.cellRotate : ""
const CellComponent: FC<CellProps> = ({
  cell,
  selected,
  click,
  isBoardRotate,
}) => {
  return (
    <div
      className={[
        styles.cell,
        styles[cell.color],
        selected ? styles.selected : "",
        isBoardRotate ? styles.cellRotate : "",
      ].join(" ")}
      onClick={() => click(cell)}
      style={{ background: cell.available && cell.figure ? "green" : "" }}
    >
      {cell.available && !cell.figure && <div className={styles.available} />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </div>
  );
};

export default CellComponent;
