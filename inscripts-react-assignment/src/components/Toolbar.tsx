import React from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Toolbar: React.FC = () => {
  return (
    <div
      className="w-full h-[52px] flex items-center gap-2 pt-[6px] pr-2 pb-[6px] pl-2 bg-[var(--Background-Core-backgroundPrimary,#fff)] box-border opacity-100 border-b border-[var(--Border-Core-borderTertiary,#eee)]"
    >
      <div
        className="font-[Poppins,Helvetica,sans-serif] font-normal not-italic text-[14px] leading-5 tracking-[0] text-[var(--Content-Core-contentPrimary,#121212)] flex items-center justify-center opacity-100 mt-[2px] ml-[10px] cursor-pointer"
        onClick={() => toast.info('This is your main toolbar for quick actions!', { position: 'top-right' })}
      >
        <span className="whitespace-nowrap">Tool bar</span>
        <div className="w-4 h-4 flex items-center justify-center opacity-100 ml-[6px] relative mt-[-1px]">
          <svg
            width="9.5"
            height="10.5"
            viewBox="0 0 8.5 10.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[12px] left-[14px] text-[var(--Icons-Medium-Emphasis-TrueGrey-Op-100,#121212)] opacity-100 block"
            style={{ top: 3.1, left: 3.5 }}
          >
            <polyline points="0,0 4.25,5.25 0,10.5" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="3.25,0 7.5,5.25 3.25,10.5" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="w-[2px] h-6 opacity-100 bg-[var(--Background-Core-backgroundTertiary,#eee)] ml-2" />
      <div className="flex-1" />
      
      {/* Hide fields button group */}
      <div className="w-[118px] h-9 flex items-center gap-1 opacity-100 rounded-[6px] pt-2 pr-3 pb-2 pl-2 bg-[var(--Background-Core-backgroundPrimary,#fff)]">
        <div className="w-5 h-5 flex items-center justify-center opacity-100">
          <svg 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 16 16" 
            height="1em" 
            width="1em" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-[18px] h-[18px] [transform:scaleX(-1)_rotateY(180deg)] opacity-100 relative top-[1.67px] left-[1.67px] block ml-[-28px] text-[var(--Content-Core-contentPrimary,#121212)]"
          >
            <path d="M1.47978 1.4797C1.30227 1.65721 1.28614 1.93498 1.43137 2.13072L1.47978 2.1868L4.1695 4.87652C2.88817 5.77616 1.93052 7.11985 1.53259 8.70952C1.46554 8.97738 1.62834 9.24892 1.89621 9.31598C2.16409 9.38298 2.4356 9.22025 2.50266 8.95232C2.85564 7.54225 3.72742 6.35956 4.88944 5.59626L6.09586 6.80278C5.62419 7.28378 5.33334 7.94278 5.33334 8.66965C5.33334 10.1424 6.52724 11.3363 8 11.3363C8.72694 11.3363 9.38587 11.0454 9.86694 10.5738L13.8131 14.5201C14.0084 14.7154 14.3249 14.7154 14.5202 14.5201C14.6977 14.3426 14.7139 14.0649 14.5686 13.8691L14.5202 13.813L10.4445 9.73692L10.4453 9.73592L9.64527 8.93732L7.732 7.02445L7.73334 7.02392L5.81252 5.10513L5.81334 5.10392L5.05782 4.35024L2.18689 1.4797C1.99163 1.28444 1.67504 1.28444 1.47978 1.4797ZM6.80274 7.51025L9.15947 9.86698C8.85947 10.1575 8.4506 10.3363 8 10.3363C7.07954 10.3363 6.33334 9.59012 6.33334 8.66965C6.33334 8.21905 6.51216 7.81018 6.80274 7.51025ZM8 3.66658C7.33314 3.66658 6.68607 3.7653 6.07406 3.94992L6.89874 4.77404C7.25594 4.70346 7.62427 4.66658 8 4.66658C10.6154 4.66658 12.8733 6.45342 13.4981 8.95538C13.565 9.22325 13.8364 9.38618 14.1043 9.31932C14.3723 9.25238 14.5352 8.98098 14.4683 8.71305C13.7329 5.7684 11.077 3.66658 8 3.66658ZM8.1298 6.0061L10.664 8.53992C10.5961 7.16865 9.49814 6.07168 8.1298 6.0061Z"></path>
          </svg>
        </div>
        <button
          className="bg-none border-none cursor-pointer p-0 outline-none bg-transparent flex items-center opacity-100 mt-[6px] ml-[-12px]"
          onClick={() => toast.info('Fields hidden! Customize your view as you like.', { position: 'top-right' })}
        >
        <span
            className="w-[74px] h-5 font-[Poppins,Helvetica,sans-serif] font-normal not-italic text-[14px] leading-5 tracking-[0] text-[var(--Content-Core-contentPrimary,#121212)] opacity-100 inline-block whitespace-nowrap"
          >
            Hide <span className="ml-[3px]">fields</span>
          </span>
        </button>
      </div>
      {/* Sort button group */}
      <div className="w-[73px] h-9 flex items-center gap-1 opacity-100 rounded-[6px] pt-2 pr-3 pb-2 pl-2 bg-[var(--Background-Core-backgroundPrimary,#fff)]">
        <div className="w-5 h-5 flex items-center justify-center opacity-100 ml-[4px]">
          <svg 
            stroke="currentColor" 
            fill="none" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24" 
            aria-hidden="true" 
            height="1em" 
            width="1em" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-[19.5px] h-[22.34px] relative top-[3.33px] left-[1.25px] opacity-100 block ml-[-6px] mt-[-2px] text-[var(--Content-Core-contentPrimary,#121212)]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"></path>
          </svg>
        </div>
        <button
          className="bg-none border-none cursor-pointer text-[14px] font-[Poppins,Helvetica,sans-serif] font-normal text-[var(--Content-Core-contentPrimary,#121212)] p-0 outline-none bg-transparent flex items-center opacity-100 mt-[4px] ml-0"
          onClick={() => toast.info('Sorting your data for better clarity!', { position: 'top-right' })}
        >
          Sort
        </button>
      </div>
      {/* Filter button group */}
      <div className="w-[80px] h-9 flex items-center gap-1 opacity-100 rounded-[6px] pt-2 pr-3 pb-2 pl-2 bg-[var(--Background-Core-backgroundPrimary,#fff)]">
        <div className="w-5 h-5 flex items-center justify-center opacity-100 mt-[-6px] ml-[-2px]">
          <svg 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 16 16" 
            height="1em" 
            width="1em" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-[19.5px] h-[22.34px] relative top-[5px] left-[3.13px] opacity-100 block text-[var(--Content-Core-contentPrimary,#121212)]"
          >
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"></path>
          </svg>
        </div>
        <button
          className="bg-none border-none cursor-pointer text-[14px] font-[Poppins,Helvetica,sans-serif] font-normal text-[var(--Content-Core-contentPrimary,#121212)] p-0 outline-none bg-transparent flex items-center opacity-100 mt-[5px] ml-[6px]"
          onClick={() => toast.info('Filtering results to match your needs!', { position: 'top-right' })}
        >
          Filter
        </button>
      </div>
      {/* Cell view button group */}
      <div className="w-[105px] h-9 flex flex-row items-center gap-1 opacity-100 rounded-[6px] pt-2 pr-3 pb-2 pl-2 bg-[var(--Background-Core-backgroundPrimary,#fff)] whitespace-nowrap">
        <div className="w-5 h-5 flex items-center justify-center opacity-100 flex-shrink-0">
          <svg 
            stroke="currentColor" 
            fill="none" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            height="1em" 
            width="1em" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-[17.5px] h-[20.34px] relative top-[2.5px] left-[3.33px] opacity-100 block ml-[-4px] mt-[-2px] text-[var(--Content-Core-contentPrimary,#121212)]"
          >
            <path d="M12 20h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h6"></path>
            <path d="M18 14v7"></path>
            <path d="M18 3v7"></path>
            <path d="M15 18l3 3l3 -3"></path>
            <path d="M15 6l3 -3l3 3"></path>
          </svg>
        </div>
        <button
          className="bg-none border-none cursor-pointer text-[14px] font-[Poppins,Helvetica,sans-serif] font-normal text-[var(--Content-Core-contentPrimary,#121212)] p-0 outline-none bg-transparent flex items-center opacity-100 whitespace-nowrap mt-[4px] ml-[1px]"
          onClick={() => toast.info('Switching to cell view for detailed editing!', { position: 'top-right' })}
        >
          Cell <span className="ml-[6px]">view</span>
        </button>
      </div>
      {/* Grouped action buttons */}
      <div className="w-[871px] h-9 flex items-center gap-1 opacity-100" />
      {/* Group Import, Export, Share, and New Action buttons */}
      <div className="w-[459px] h-9 flex items-center gap-2 opacity-100 justify-end">
        <button
          className="w-[90px] h-9 flex items-center gap-1 bg-none border-[#EEE] rounded-[6px] border-[1px] cursor-pointer pt-2 pr-3 pb-2 pl-2 text-[14px] opacity-100 ml-[16px] mt-[4px]"
          onClick={() => toast.info('Ready to import your data!', { position: 'top-right' })}
        >
          <div className="w-5 h-5 opacity-100 flex items-center justify-center">
            <svg 
              stroke="currentColor" 
              fill="currentColor" 
              strokeWidth="0" 
              viewBox="0 0 32 32" 
              height="1em" 
              width="1em" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[19.5px] h-[22.34px] relative top-[1.67px] left-[3.75px] opacity-100 block ml-[-6px] text-[var(--Content-Core-contentSecondary,#545454)]"
            >
              <path d="M 15 4 L 15 20.5625 L 9.71875 15.28125 L 8.28125 16.71875 L 15.28125 23.71875 L 16 24.40625 L 16.71875 23.71875 L 23.71875 16.71875 L 22.28125 15.28125 L 17 20.5625 L 17 4 Z M 7 26 L 7 28 L 25 28 L 25 26 Z"></path>
            </svg>
          </div>
          <span className="w-[46px] h-5 font-[Poppins,Helvetica,sans-serif] font-normal not-italic text-[14px] leading-5 tracking-[0] text-[var(--Content-Core-contentSecondary,#545454)] opacity-100 inline-block mt-[4px] ml-[2px]">
            Import
          </span>
        </button>
        <div
          className="w-[89px] h-9 flex items-center gap-1 opacity-100 rounded-[6px] border-[1px] pt-2 pr-3 pb-2 pl-2 mt-[3px] bg-[var(--Background-Core-backgroundPrimary,#fff)] border-[var(--Border-Core-borderTertiary,#eee)] cursor-pointer"
          onClick={() => toast.info('Exporting your data for you!', { position: 'top-right' })}
        >
          <div className="w-5 h-5 flex items-center justify-center opacity-100">
            <svg 
              stroke="currentColor" 
              fill="currentColor" 
              strokeWidth="0" 
              viewBox="0 0 32 32" 
              height="1em" 
              width="1em" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[19.5px] h-[22.34px] relative top-[1.67px] left-[3.75px] opacity-100 block mt-[-1px] ml-[-8px] text-[var(--Content-Core-contentSecondary,#545454)] [transform:rotate(180deg)]"
            >
              <path d="M 15 4 L 15 20.5625 L 9.71875 15.28125 L 8.28125 16.71875 L 15.28125 23.71875 L 16 24.40625 L 16.71875 23.71875 L 23.71875 16.71875 L 22.28125 15.28125 L 17 20.5625 L 17 4 Z M 7 26 L 7 28 L 25 28 L 25 26 Z"></path>
            </svg>
          </div>
          <span className="font-[Poppins,Helvetica,sans-serif] font-normal not-italic text-[14px] leading-5 tracking-[0] text-[var(--Content-Core-contentSecondary,#545454)] opacity-100 inline-block mt-[4px] ml-[2px]">
            Export
          </span>
        </div>
        {/* Share button group */}
        <div
          className="w-[84px] h-9 flex items-center gap-1 opacity-100 rounded-[6px] border-[1px] pt-2 pr-3 pb-2 pl-2 mt-[2px] bg-[var(--Background-Core-backgroundPrimary,#fff)] border-[var(--Border-Core-borderTertiary,#eee)] cursor-pointer"
          onClick={() => toast.info('Share your work with your team!', { position: 'top-right' })}
        >
          <div className="w-5 h-5 flex items-center justify-center opacity-100">
            <svg 
              stroke="currentColor" 
              fill="currentColor" 
              strokeWidth="0" 
              viewBox="0 0 576 512" 
              height="1em" 
              width="1em" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18.5px] h-[20.34px] relative top-[1.67px] left-[3.75px] opacity-100 block mt-[-1px] ml-[-8px] text-[var(--Content-Core-contentSecondary,#545454)]"
            >
              <path d="M400 255.4l0-15.4 0-32c0-8.8-7.2-16-16-16l-32 0-16 0-46.5 0c-50.9 0-93.9 33.5-108.3 79.6c-3.3-9.4-5.2-19.8-5.2-31.6c0-61.9 50.1-112 112-112l48 0 16 0 32 0c8.8 0 16-7.2 16-16l0-32 0-15.4L506 160 400 255.4zM336 240l16 0 0 48c0 17.7 14.3 32 32 32l3.7 0c7.9 0 15.5-2.9 21.4-8.2l139-125.1c7.6-6.8 11.9-16.5 11.9-26.7s-4.3-19.9-11.9-26.7L409.9 8.9C403.5 3.2 395.3 0 386.7 0C367.5 0 352 15.5 352 34.7L352 80l-16 0-32 0-16 0c-88.4 0-160 71.6-160 160c0 60.4 34.6 99.1 63.9 120.9c5.9 4.4 11.5 8.1 16.7 11.2c4.4 2.7 8.5 4.9 11.9 6.6c3.4 1.7 6.2 3 8.2 3.9c2.2 1 4.6 1.4 7.1 1.4l2.5 0c9.8 0 17.8-8 17.8-17.8c0-7.8-5.3-14.7-11.6-19.5c0 0 0 0 0 0c-.4-.3-.7-.5-1.1-.8c-1.7-1.1-3.4-2.5-5-4.1c-.8-.8-1.7-1.6-2.5-2.6s-1.6-1.9-2.4-2.9c-1.8-2.5-3.5-5.3-5-8.5c-2.6-6-4.3-13.3-4.3-22.4c0-36.1 29.3-65.5 65.5-65.5l14.5 0 32 0zM72 32C32.2 32 0 64.2 0 104L0 440c0 39.8 32.2 72 72 72l336 0c39.8 0 72-32.2 72-72l0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 64c0 13.3-10.7 24-24 24L72 464c-13.3 0-24-10.7-24-24l0-336c0-13.3 10.7-24 24-24l64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L72 32z"></path>
            </svg>
          </div>
          <span className="font-[Poppins,Helvetica,sans-serif] font-normal not-italic text-[14px] leading-5 tracking-[0] text-[var(--Content-Core-contentSecondary,#545454)] opacity-100 inline-block mt-[4px] ml-[4px]">
            Share
          </span>
        </div>
        <div className="flex-1" />
        {/* New Action button group */}
        <div
          className="w-[150px] h-9 flex items-center gap-1 opacity-100 rounded-[6px] pt-2 pr-6 pb-2 pl-6 bg-[var(--New-Action---Button-bg,#4B6A4F)] ml-[-6px]"
          onClick={() => toast.info('Starting a brand new action!', { position: 'top-right' })}
        >
          <button className="flex items-center gap-1 bg-transparent text-white border-none rounded-[6px] cursor-pointer text-[16px] font-semibold">
            <div className="w-5 h-5 opacity-100 ml-[-6px]">
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M10.0001 2.5C10.3452 2.5 10.6251 2.77982 10.6251 3.125V7.91667H12.7046C13.9702 7.91667 14.9963 8.94268 14.9963 10.2083V15.368L16.4334 13.9328C16.6777 13.6888 17.0734 13.6891 17.3173 13.9334C17.5612 14.1776 17.5609 14.5733 17.3167 14.8172L14.8129 17.3177C14.5688 17.5615 14.1733 17.5613 13.9293 17.3174L11.4289 14.8169C11.1848 14.5729 11.1848 14.1771 11.4289 13.9331C11.673 13.689 12.0687 13.689 12.3128 13.9331L13.7463 15.3665V10.2083C13.7463 9.63304 13.2799 9.16667 12.7046 9.16667H7.29165C6.71635 9.16667 6.24998 9.63304 6.24998 10.2083V15.3665L7.68346 13.9331C7.92754 13.689 8.32327 13.689 8.56734 13.9331C8.81142 14.1771 8.81142 14.5729 8.56734 14.8169L6.06692 17.3174C5.82285 17.5614 5.42712 17.5614 5.18304 17.3174L2.68257 14.8169C2.43849 14.5729 2.43849 14.1771 2.68257 13.9331C2.92664 13.689 3.32237 13.689 3.56645 13.9331L4.99998 15.3666V10.2083C4.99998 8.94268 6.026 7.91667 7.29165 7.91667H9.37506V3.125C9.37506 2.77982 9.65488 2.5 10.0001 2.5Z' fill='white'/>
              </svg>
            </div>
            <div className="w-[68px] h-5 opacity-100 font-[ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji] text-[14px] font-normal leading-5 text-white flex items-center whitespace-nowrap ml-[4px]">
              New Action
            </div>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Toolbar; 