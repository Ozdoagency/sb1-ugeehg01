import type { FC } from 'react';

type Props = {
  rows: string[];
  columns: string[];
  value: { [key: string]: string };
  onChange: (value: { [key: string]: string }) => void;
};

export const MatrixInput: FC<Props> = ({ rows, columns, value = {}, onChange }) => {
  const handleSelect = (row: string, column: string) => {
    onChange({
      ...value,
      [row]: column
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="p-4 text-left text-gray-500 font-medium"></th>
            {columns.map((column) => (
              <th key={column} className="p-4 text-center text-gray-500 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row} className="border-t border-gray-100">
              <td className="p-4 text-left text-gray-700 font-medium">
                {row}
              </td>
              {columns.map((column) => (
                <td key={`${row}-${column}`} className="p-4 text-center">
                  <button
                    onClick={() => handleSelect(row, column)}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                      value[row] === column
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {value[row] === column && (
                      <span className="block w-2 h-2 mx-auto bg-white rounded-full" />
                    )}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};