import { useState } from 'react';
import styled from 'styled-components';
import { differenceInDays } from 'date-fns';

export const Main = () => {
  const [file, setFile] = useState();
  const [arrayData, setArrayData] = useState([]);

  const fileReader = new FileReader();

  const handleOnSubmit = e => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const handleOnChange = e => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');

    const array = csvRows.map(i => {
      const values = i.split(',');
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArrayData(array);
  };

  const headerKeys = ['Employee ID #1', 'ID #1 Days Worked', 'Employee ID #2', '#2 Days Worked', 'Project ID'];

  //group employees by projectId
  const employeesByProject = arrayData.reduce((acc, employee) => {
    const { projectId } = employee;
    if (!acc[projectId]) {
      acc[projectId] = [];
    }
    acc[projectId].push(employee);
    return acc;
  }, {});

  console.log('e', arrayData);

  // calculate duration in days of an employee's project
  const calcDuration = ({ dateFrom, dateTo }) => {
    if (!dateTo || dateTo.toLowerCase() === 'null') {
      dateTo = new Date();
    }

    return differenceInDays(Date.parse(dateTo), Date.parse(dateFrom));
  };

  // sort employees by their duration on the project
  const sortByDuration = (a, b) => {
    const durationA = calcDuration(a);
    const durationB = calcDuration(b);
    return durationB - durationA;
  };

  // get the first two employees by project who work there the most
  const topEmployeesByProject = Object.values(employeesByProject).map(employees =>
    employees.sort(sortByDuration).slice(0, 2)
  );

  return (
    <Container>
      <div style={{ textAlign: 'center' }}>
        <h1>CSV IMPORT TEMPLATE</h1>
        <form onSubmit={handleOnSubmit}>
          <input
            type={'file'}
            accept={'.csv'}
            onChange={handleOnChange}
          />

          <button
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            IMPORT CSV
          </button>
        </form>

        <table
          style={{
            minHeight: '100px',
            margin: '2rem auto 0 auto',
            padding: '1rem',
            border: '1px solid rgba(0,0,0, 0.5)',
            borderRadius: '10px',
          }}
        >
          <thead>
            <tr key={'header'}>
              {headerKeys.map((key, i) => (
                <th
                  key={i}
                  style={{ padding: '0 20px 10px 20px' }}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {topEmployeesByProject.map((item, i) => {
              return (
                <tr key={i}>
                  {item.map((it, j) => (
                    <>
                      {<td key={j}>{it.employeeId}</td>}
                      {<td>{calcDuration(it)}</td>}
                    </>
                  ))}
                  {/* In case there is only one person to the project, render projectId into the correct column */}
                  {item.length <= 1 ? (
                    <>
                      <td /> <td />
                      <td>{item[0].projectId}</td>
                    </>
                  ) : (
                    <td>{item[0].projectId}</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: auto;
`;
