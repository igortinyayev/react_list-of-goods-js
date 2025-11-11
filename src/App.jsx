import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(null); // 'alphabet' | 'length' | null
  const [isReversed, setIsReversed] = useState(false);

  // 🔹 Sort alphabetically
  const handleSortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? sorted.reverse() : sorted);
    setSortType('alphabet');
    // Do NOT reset isReversed here — user might want reverse + alpha
  };

  // 🔹 Sort by length
  const handleSortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setGoods(isReversed ? sorted.reverse() : sorted);
    setSortType('length');
  };

  // 🔹 Reverse current list
  const handleReverse = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prev => !prev);
  };

  // 🔹 Reset to original
  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortType(null);
    setIsReversed(false);
  };

  // Check if current list differs from original
  const isChanged = goods.join(',') !== goodsFromServer.join(',');

  // Determine active button styles
  const getAlphabetButtonClass = () =>
    `button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`;

  const getLengthButtonClass = () =>
    `button is-success ${sortType === 'length' ? '' : 'is-light'}`;

  const getReverseButtonClass = () =>
    `button is-warning ${isReversed ? '' : 'is-light'}`;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getAlphabetButtonClass()}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getLengthButtonClass()}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getReverseButtonClass()}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
