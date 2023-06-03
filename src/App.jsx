// import Employees from './components/Employees';

import SearchModal from './components/modal/searchModal';
// import Products from './components/Products';

const App = () => {
  return (
    <header className='max-w-[1400px]  mx-auto p-5'>
      <main className='flex flex-col items-center justify-center '>
        <div className='w-full flex items-start py-5 px-10 justify-between'>
          <h1 className='font-bold text-[28px] '>REACT TABLE</h1>
          <SearchModal />
        </div>
        {/* <section className='w-full flex flex-col justify-start text-[18px] font-medium'>
          <Employees />
        </section> */}
      </main>
    </header>
  );
};

export default App;
