import { FC, useState, useRef, useEffect } from "react";
import { Player } from "../../models/Player";
import { Colors } from "../../models/Colors";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  setBoardRotate: (toggle: boolean) => void;
}

const TimerComponent: FC<TimerProps> = ({
  currentPlayer,
  restart,
  setBoardRotate,
}) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>();

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime((prev) => prev - 1);
  }
  function decrementWhiteTimer() {
    setWhiteTime((prev) => prev - 1);
  }

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    setBoardRotate(false);
    restart();
  };

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Black {blackTime}</h2>
      <h2>White {whiteTime}</h2>
    </div>
  );
};

export default TimerComponent;
