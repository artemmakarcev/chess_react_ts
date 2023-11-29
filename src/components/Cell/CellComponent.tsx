import React, { FC } from "react";
import styles from "./Cell.module.css";
import { Cell } from "../../models/Cell";

interface CellProps {
  cell: Cell;
}

const CellComponent: FC<CellProps> = ({ cell }) => {
  return (
    <div className={[styles.cell, styles[cell.color]].join(" ")}>
      {cell.figure?.logo}
    </div>
  );
};

export default CellComponent;
