import React, { useState } from 'react';

const ROWS = 20;
const COLS = 10;

const Spreadsheet: React.FC = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => ''))
  );

  const handleChange = (r: number, c: number, value: string) => {
    const newGrid = grid.map((row, i) =>
      i === r ? row.map((cell, j) => (j === c ? value : cell)) : row
    );
    setGrid(newGrid);
  };

  return (
    <div className="overflow-auto bg-white rounded-b-2xl">
      <table className="border-collapse w-full min-w-max bg-white font-mono text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 bg-gray-50 w-8 p-0"></th>
            {Array.from({ length: COLS }, (_, c) => (
              <th
                key={c}
                className="border border-gray-300 bg-gray-50 text-center font-semibold h-9 min-w-[80px] p-0"
              >
                {String.fromCharCode(65 + c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map((row, r) => (
            <tr key={r}>
              <th className="border border-gray-300 bg-gray-50 text-center font-semibold w-8 p-0">{r + 1}</th>
              {row.map((val, c) => (
                <td
                  key={c}
                  className="border border-gray-300 h-9 min-w-[80px] p-0"
                >
                  <input
                    value={val}
                    onChange={(e) => handleChange(r, c, e.target.value)}
                    className="w-full h-full px-2 py-0.5 outline-none bg-transparent text-left align-middle"
                    style={{ border: 'none', boxShadow: 'none' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet; 