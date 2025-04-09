import React, { FC } from "react";
import styles from "./LostFigures.module.css";
import { Figure } from "../../models/figures/Figure";

interface LostFigureProps {
  title: string;
  figures: Figure[] | null;
}

const LostFigureComponent: FC<LostFigureProps> = ({ title, figures }) => {
  return (
    <div className={styles.lost}>
      <h1>{title}</h1>
      {figures?.map((figure) => (
        <div key={figure.id}>
          {figure.logo && (
            <img width={20} height={20} src={figure.logo} alt="" />
          )}{" "}
          {figure.name}
        </div>
      ))}
    </div>
  );
};

export default LostFigureComponent;
