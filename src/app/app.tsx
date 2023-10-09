import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

let cachedData: Promise<number>;

function getData(): Promise<number> {
  if (!cachedData) {
    cachedData = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
  }

  return cachedData;
}

const cond = false;

async function getValues(): Promise<number | undefined> {
  if (cond) {
    return undefined;
  }

  return 3;
}

export function App() {
  const [obj, setObj] = useState<{ value?: number }>({});
  const [flag, setFlag] = useState<boolean>(false);

  const trigger = useCallback(() => {
    setFlag(true);
  }, [])
  useEffect(() => {
    console.log('Flag', flag);

    if (!flag) {
      return;
    }
    console.log('obj', obj);
    setFlag(false);

    Promise.resolve().then(() => {
      setObj({ value: 3 });
    });
  }, [flag, obj]);

  return (
    <div>
      <button onClick={trigger}>Trigger</button>
    </div>
  );
}

export default App;
