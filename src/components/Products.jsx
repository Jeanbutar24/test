// Table
// TableHead
// TableRow
// TableHeader
// TableBody
// TableData

import axios from 'axios';
import './Products.css';
import { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get('https://fakestoreapi.com/products').catch((err) => console.log(err));

    if (response) {
      const products = response.data;
      console.log('Products', products);

      setProducts(products);
    }
  };

  // const data = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  //       price: 109.95,
  //       description:
  //         'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  //       category: "men's clothing",
  //       image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  //       rating: {
  //         rate: 3.9,
  //         count: 120,
  //       },
  //     },
  //     {
  //       id: 1,
  //       title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  //       price: 109.95,
  //       description:
  //         'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  //       category: "men's clothing",
  //       image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  //       rating: {
  //         rate: 3.9,
  //         count: 120,
  //       },
  //     },
  //     {
  //       id: 1,
  //       title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  //       price: 109.95,
  //       description:
  //         'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  //       category: "men's clothing",
  //       image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  //       rating: {
  //         rate: 3.9,
  //         count: 120,
  //       },
  //     },
  //   ],
  //   []
  // );

  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: 'Id',
  //       accessor: 'id',
  //     },
  //     {
  //       Header: 'Price',
  //       accessor: 'price',
  //     },
  //     {
  //       Header: 'Title',
  //       accessor: 'title',
  //     },
  //   ],
  //   []
  // );

  const productsData = useMemo(() => [...products], [products]);
  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== 'rating')
            .map((key) => {
              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableInstance = useTable({ columns: productsColumns, data: productsData });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <table
      className='table'
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
                className='th'
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
              className='tr'
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

export default Products;
