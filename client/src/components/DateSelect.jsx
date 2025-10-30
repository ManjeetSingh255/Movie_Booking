
import React, { useState } from 'react';
import BlurCircle from './BlurCircle';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const onBookHandler = () => {
    if (!selected) {
      return toast('Please select a date');
    }
    navigate(`/movies/${id}/${selected}`);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // smooth scroll
  };

  return (
    <div id='dateSelect' className='pt-[120px]'>
      <div className='flex flex-col gap-10 md:flex-row items-center justify-between relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle top='100px' right='0px' />

        <div>
          <p className='text-lg font-semibold text-white'>Choose Date</p>

          <div className='flex items-center gap-6 text-sm mt-5'>
            <ChevronLeftIcon width={28} className='cursor-pointer text-white/70 hover:text-white transition' />
            <div className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
              {Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelected(date)}
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded-lg border transition-all duration-200 
                    ${
                      selected === date
                        ? 'bg-primary text-white border-primary scale-105 shadow-lg'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-primary/50 hover:text-white'
                    }`}
                >
                  <span className='text-lg font-semibold'>{new Date(date).getDate()}</span>
                  <span className='text-xs'>
                    {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </button>
              ))}
            </div>
            <ChevronRightIcon width={28} className='cursor-pointer text-white/70 hover:text-white transition' />
          </div>
        </div>

        <button
          onClick={onBookHandler}
          className='bg-primary text-white px-10 py-3 min-w-[130px] mt-8 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95'
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
