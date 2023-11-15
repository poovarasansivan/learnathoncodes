import React, { useEffect, useState } from 'react';
import axios from "axios";
import Host from "./api";

const RubricsTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      url: `${Host}/rubrics/getAll`,
      method: "GET"
    })
      .then((res) => {
        console.log(res)
        setData(res.data.data); // Assuming that res.data.data contains the rubrics array
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRadioChange = (criteria_id, rubrics_id) => {
    const updatedData = data.map(item => {
      if (item.criteria_id === criteria_id) {
        return {
          ...item,
          selected: rubrics_id
        };
      }
      return item;
    });

    setData(updatedData);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">S.No</th>
            <th className="py-2 px-4 border">Criteria</th>
            <th className="py-2 px-4 border">Rubrics 1</th>
            <th className="py-2 px-4 border">Rubrics 2</th>
            <th className="py-2 px-4 border">Rubrics 3</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{item.criteria_name}</td>
              {item.rubrics.map((rubric) => (
                <td className="py-2 px-4 border" key={rubric.rubrics_id + 1 }>
                  <div>
                    <input
                      type="radio"
                      name={`rubric-${item.criteria_id}`}
                      value={rubric.rubrics_id}
                      checked={item.selected === rubric.rubrics_id}
                      onChange={() => handleRadioChange(item.criteria_id, rubric.rubrics_id)}
                      style={{ marginRight: '8px' }}
                    />
                    {rubric.rubrics_name}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RubricsTable;
