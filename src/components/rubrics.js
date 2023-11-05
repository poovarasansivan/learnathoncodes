import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const data = [
  {
    id: '1',
    question: 'Write a function that takes an array of integers as input and returns the sum of all even numbers in the array.',
    easy: false,
    medium: false,
    hard: false,
  },
  {
    id: '1',
    question: 'Write a function that takes an array of integers as input and returns the sum of all even numbers in the array.',
    easy: false,
    medium: false,
    hard: false,
  },
  {
    id: '1',
    question: 'Write a function that takes an array of integers as input and returns the sum of all even numbers in the array.',
    easy: false,
    medium: false,
    hard: false,
  },
  {
    id: '1',
    question: 'Write a function that takes an array of integers as input and returns the sum of all even numbers in the array.',
    easy: false,
    medium: false,
    hard: false,
  },
  {
    id: '1',
    question: 'Write a function that takes an array of integers as input and returns the sum of all even numbers in the array.',
    easy: false,
    medium: false,
    hard: false,
  },
  {
    id: '1',
    question: 'Write a function that takes an array of integers as input and returns the sum of all even numbers in the array.',
    easy: false,
    medium: false,
    hard: false,
  },
  {
    id: '1',
    question: 'Write a function that takes an array of integers as input and returns the sum of all even numbers in the array.',
    easy: false,
    medium: false,
    hard: false,
  },
  {
    id: '1',
    question: 'Write a function that takes an array of integers as input and returns the sum of all even numbers in the array.',
    easy: false,
    medium: false,
    hard: false,
  },
  {
    id: '1',
    question: 'Write a function that takes an array of integers as input and returns the sum of all even numbers in the array.',
    easy: false,
    medium: false,
    hard: false,
  },
  {
    id: '1',
    question: 'Write a function that takes an array of integers as input and returns the sum of all even numbers in the array.',
    easy: false,
    medium: false,
    hard: false,
  },  {
    id: '1',
    question: 'Write a function that takes an array of integers as input and returns the sum of all even numbers in the array.',
    easy: false,
    medium: false,
    hard: false,
  },
  {
    id: '1',
    question: 'Write a function that takes an array of integers as input and returns the sum of all even numbers in the array.',
    easy: false,
    medium: false,
    hard: false,
  },
  // Add more data as needed
];

const RubricsTable = () => {
  const [rubricData, setRubricData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const toggleCheckbox = (id, rubric) => {
    const updatedData = rubricData.map((item) => {
      if (item.id === id) {
        item[rubric] = !item[rubric];
      }
      return item;
    });

    setRubricData(updatedData);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rubricData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4">
      <table className="border-collapse w-full rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">S.No</th>
            <th className="py-2 px-4 border">Question</th>
            <th className="py-1 px-4 border text-center">Easy</th>
            <th className="py-2 px-4 border">Medium</th>
            <th className="py-2 px-4 border">Hard</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map(({ id, question, easy, medium, hard }, index) => (
            <tr key={id}>
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{question}</td>
              <td className="py-2 px-4 border">
                <input
                  type="checkbox"
                  checked={easy}
                  onChange={() => toggleCheckbox(id, 'easy')}
                  className="cursor-pointer"
                />
              </td>
              <td className="py-2 px-4 border">
                <input
                  type="checkbox"
                  checked={medium}
                  onChange={() => toggleCheckbox(id, 'medium')}
                  className="cursor-pointer"
                />
              </td>
              <td className="py-2 px-4 border">
                <input
                  type="checkbox"
                  checked={hard}
                  onChange={() => toggleCheckbox(id, 'hard')}
                  className="cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(rubricData.length / rowsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className="mx-1 px-4 py-2 border rounded-full">
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RubricsTable;
