import React from 'react';
import { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';

import { getAll, get5First, getRed } from '../src/api/goods';

//import * as goodsAPI from '../src/api/goods';
type Good = {
  id: number;
  name: string;
  color: string;
};

export const App: React.FC = () => {
  const [loadiing, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [goods, setGoods] = React.useState<Good[]>([]);

  useEffect(() => {
    const delayTimer = setTimeout(() => setLoading(true), 200);

    getAll()
      .then(setGoods)
      .catch((error: Error) => setErrorMessage(error.message))
      .finally(() => {
        clearTimeout(delayTimer);
        setTimeout(() => setLoading(false), 500);
      });
  }, []);

  function handleLoadAll(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');
    getAll()
      .then(setGoods)
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }

  function handleLoadRed(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    getRed()
      .then(setGoods)
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }

  function handleLoadFirstFive(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    get5First()
      .then(setGoods)
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button type="button" data-cy="all-button" onClick={handleLoadAll}>
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={handleLoadFirstFive}
      >
        Load 5 first goods
      </button>

      <button type="button" data-cy="red-button" onClick={handleLoadRed}>
        Load red goods
      </button>

      {!loadiing && <p>Loading...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {!errorMessage && !loadiing && <GoodsList goods={goods} key={good.id} />}
    </div>
  );
};
