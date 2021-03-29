import './App.css';
import React, { useEffect, useState, useCallback } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export default function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState('stop');

  useEffect(() => {
    const unsubscribe$ = new Subject();

    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === 'run') {
          setSec(val => val + 1000);
        }
      });

    return () => {
      unsubscribe$.next();

      unsubscribe$.complete();
    };
  }, [status]);

  const start = useCallback(() => {
    setStatus('run');
  }, []);

  const stop = useCallback(() => {
    setStatus('stop');
    setSec(0);
  }, []);

  const reset = useCallback(() => {
    setSec(0);
  }, []);

  const wait = useCallback(() => {
    setStatus('wait');
  }, []);

  return (
    <div className="App">
      <span className="clock">
        {new Date(sec).toISOString().slice(11, 19)}
      </span>
      <section>
        <button type="button" className="start-button" onClick={start}>
          Start
        </button>
        <button type="button" className="stop-button" onClick={stop}>
          Stop
        </button>
        <button type="button" onClick={reset}>Reset</button>
        <button type="button" onDoubleClick={wait}>Wait</button>
      </section>
    </div>
  );
}
