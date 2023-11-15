import React, { useState } from 'react';

const RubricsTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      criteria: 'Criteria 1',
      rubrics1: 'Rubric A',
      rubrics2: 'Rubric B',
      rubrics3: 'Rubric C',
      selected: null,
    },
    {
      id: 2,
      criteria: 'Criteria 2',
      rubrics1: 'Rubric X',
      rubrics2: 'Rubric Y',
      rubrics3: 'Rubric Z',
      selected: null,
    },
    // Add more rows as needed
  ]);

  const handleRadioChange = (id, rubric) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, selected: rubric };
      }
      return item;
    });

    setData(updatedData);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Criteria</th>
          <th>Rubrics 1</th>
          <th>Rubrics 2</th>
          <th>Rubrics 3</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.criteria}</td>
            <td>
              <input
                type="radio"
                name={`rubric-${row.id}`}
                value={row.rubrics1}
                checked={row.selected === row.rubrics1}
                onChange={() => handleRadioChange(row.id, row.rubrics1)}
              />
              {row.rubrics1}
            </td>
            <td>
              <input
                type="radio"
                name={`rubric-${row.id}`}
                value={row.rubrics2}
                checked={row.selected === row.rubrics2}
                onChange={() => handleRadioChange(row.id, row.rubrics2)}
              />
              {row.rubrics2}
            </td>
            <td>
              <input
                type="radio"
                name={`rubric-${row.id}`}
                value={row.rubrics3}
                checked={row.selected === row.rubrics3}
                onChange={() => handleRadioChange(row.id, row.rubrics3)}
              />
              {row.rubrics3}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RubricsTable;




