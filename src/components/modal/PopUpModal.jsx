import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

const PopUpModal = ({ closePopUp }) => {
  const [divisi, setDivisi] = useState('');
  const [active, setActive] = useState('true');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async () => {
    const requestQuery = {
      name: name,
      active: active,
      divisi: divisi !== '' ? divisi.split(',') : [],
      status: status ? status : '',
      startDate: startDate ? startDate : '',
      endDate: endDate ? endDate : '',
    };

    const response = await axios
      .get('http://localhost:5000/api/v1/users/search', {
        params: requestQuery,
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(response.data.employee);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className={'absolute w-full bottom-0 top-0 left-0 right-0 bg-slate-900 bg-opacity-20 '}>
      <div className='relative z-10 text-black flex items-center justify-center h-full px-10 py-10'>
        <div className='w-full h-full bg-white'>
          <div className='w-full border-b-2 py-3 px-4 border-slate-700 shadow-sm flex items-center justify-between'>
            <h1 className=' w-[120px] font-bold py-3 border-slate-800 px-2 ml-6 border-b shadow-md rounded-md duration-150 hover:scale-105 ease-in-out cursor-pointer '>
              FILTER
            </h1>
            <button
              onClick={closePopUp}
              className='mr-3  border border-slate-600 rounded-full py-2 px-2 active:scale-95 ease-in duration-150'
            >
              <AiOutlineClose
                width={60}
                height={60}
              />
            </button>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor='divisi'>Divisi:</label>
              <input
                type='text'
                id='divisi'
                value={divisi}
                onChange={(e) => setDivisi(e.target.value)}
                placeholder='Masukkan divisi'
              />

              <label htmlFor='active'>Active:</label>
              <select
                id='active'
                value={active}
                onChange={(e) => {
                  setActive(e.target.value);
                }}
                defaultValue='select'
              >
                <option value='select'>select</option>
                <option value='true'>True</option>
                <option value='false'>False</option>
              </select>

              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Masukkan nama'
              />

              <label htmlFor='status'>Status:</label>
              <input
                type='text'
                id='status'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder='Masukkan status'
              />

              <label htmlFor='startDate'>Start Date:</label>
              <input
                type='date'
                id='startDate'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <label htmlFor='endDate'>End Date:</label>
              <input
                type='date'
                id='endDate'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              <button type='submit'>Search</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
