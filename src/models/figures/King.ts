import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export default class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);
    if (dx === 1 && dy === 1) {
      return true;
    }
    if (
      target.x === this.cell.x &&
      (target.y === this.cell.y + 1 || target.y === this.cell.y - 1)
    )
      return true;

    if (
      target.y === this.cell.y &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
    )
      return true;

    return false;
  }
}
