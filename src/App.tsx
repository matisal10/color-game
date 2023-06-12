import { useState, useRef, useEffect } from "react";
import './index.css'

const colorNames = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink'];

function App() {
  const [seconds, setSeconds] = useState(0);
  const [flag, setFlag] = useState(true);
  const timerRef = useRef<number>();
  const [color, setColor] = useState<string>('White');
  const [colorName, setColorName] = useState<string>('');
  const [points, setPoints] = useState(0);


  function startGame() {
    setFlag(false);
    let seconds = 0;

    const interval = setInterval(() => {
      seconds++;
      setSeconds(seconds);

      if (seconds >= 10) {
        clearInterval(interval);
      }
    }, 1000);

    timerRef.current = interval;
    getRandomColor();
    setColorName(getRandomColorName());

    return () => clearInterval(timerRef.current);
  }

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorNames.length);
    const randomColor = colorNames[randomIndex];
    setColor(randomColor);
  };

  const getRandomColorName = () => {
    let randomName = '';
    do {
      const randomIndex = Math.floor(Math.random() * colorNames.length);
      randomName = colorNames[randomIndex];
    } while (randomName.toLowerCase() === color.toLowerCase()); // Evitar el mismo nombre que el color de fondo
    return randomName;
  };

  const handleButtonClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setPoints(points + 1);
    } else {
      setPoints(points - 1);
    }
    getRandomColor();
    setColorName(getRandomColorName());
  };
  

  const reset = () => {
    setSeconds(0);
    setFlag(true);
  };

  return (
    <main>
      <header>
        <h1>{points} puntos</h1>
        <h1>{seconds} segundos</h1>
      </header>
      <section>
        <span style={{ color: color }}>{colorName}</span> 
      </section>
      <footer>
        {seconds === 10 ? (
          <button onClick={() => reset()}>Reiniciar</button>
        ) : (
          <div>
            {flag ? (
              <button onClick={() => startGame()}>Jugar</button>
            ) : (
              <div className="buttonGroup">
                <button className="btn" onClick={()=>handleButtonClick(true)} style={{background:color}} ></button>
                <button className="btn" onClick={()=>handleButtonClick(false)} style={{background:colorName}}></button>
              </div>
            )}
          </div>
        )}
      </footer>
    </main>
  );
}

export default App;