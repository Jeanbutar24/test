import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import './Employees.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:5000/api/v1/users').catch((err) => console.log(err));

    if (response) {
      const employees = response.data.employees.map((employee) => {
        const { name, status, active, deuDate } = employee;
        const startDate = deuDate && deuDate.startDate ? deuDate.startDate : '';
        // console.log(startDate);
        return {
          name: String(name),
          status: String(status),
          dueDate: String(startDate),
          active: Boolean(active),
        };
      });
      // console.log('Employess', employees);
      setEmployees(employees);
    }
  };

  const productsData = useMemo(() => [...employees], [employees]);
  const productsColumns = useMemo(
    () =>
      employees[0]
        ? Object.keys(employees[0])
            .filter((key) => key !== '')
            .map((key) => {
              return { Header: key, accessor: (row) => (key === 'active' ? (row[key] ? 'is' : 'is not') : row[key]) };
            })
        : [],
    [employees]
  );
  // console.log(productsColumns);

  const tableInstance = useTable({ columns: productsColumns, data: productsData });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <table
      className='table mt-8'
      {...getTableProps()}
    >
      <thead className='thead'>
        {headerGroups.map((headerGroup, i) => (
          <tr
            key={i}
            {...headerGroup.getHeaderGroupProps}
            className='tr'
          >
            {headerGroup.headers.map((column, i) => (
              <th
                key={i}
                className='th bg-slate-100'
                {...column.getHeaderGroupProps}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);

          return (
            <tr
              key={i}
              className={i % 2 ? 'tr bg-green-300' : 'tr'}
              {...row.getRowProps()}
            >
              {row.cells.map((cell, i) => (
                <td
                  className='td'
                  key={i}
                  {...cell.getCellProps()}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Employees;
