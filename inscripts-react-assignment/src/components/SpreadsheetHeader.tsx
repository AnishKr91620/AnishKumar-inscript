import React from 'react';
import avatarImg from '../assets/avatar.png';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SpreadsheetHeader: React.FC = () => {
  return (
    <>
      <div
        className="w-full h-[56px] flex justify-between items-center pt-2 pr-0 pb-2 pl-4 bg-[var(--Background-Core-backgroundPrimary,#fff)] box-border border-b-2 border-[var(--Border-Core-borderTertiary,#eee)]"
      >
        {/* Breadcrumbs with icon */}
        <div className="flex items-center gap-4 mt-[2px] ml-[-6px]">
          <span className="relative w-[28px] h-[28px] flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={21}
              viewBox="0 0 52 53"
              className="absolute top-1 left-[12px] w-[24px] h-[21px] text-[var(--Icons-Medium-Emphasis-BrandPrimary-Op-100,#618666)] block [transform:rotateY(180deg)]"
              fill="none"
            >
              <rect x="4" y="8" width="50" height="38" rx="6" ry="6" stroke="currentColor" strokeWidth="4" fill="none"/>
              <rect x="4" y="8" width="19" height="37" rx="6" ry="6" fill="currentColor" stroke="none"/>
            </svg>
          </span>
          <div className="flex items-center gap-2 mt-[2px] ml-[8px]">
            <span
              className="poppins-force font-normal text-[14px] leading-[19px] tracking-[0] text-[var(--Content-Core-contentStateDisabledPrimary,#AFAFAF)] flex items-center cursor-pointer"
              onClick={() => toast.info('Navigating to Workspace', { position: 'top-right' })}
              role="button"
              tabIndex={0}
            >
              Workspace
            </span>
            <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--Icons-Medium-Emphasis-TrueGrey-Op-40,#AFAFAF)] block ml-[2px]">
              <polyline points="0,0 4,4 0,8" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span
              className="poppins-force font-normal text-[14px] leading-[19px] tracking-[0] text-[var(--Content-Core-contentStateDisabledPrimary,#AFAFAF)] flex items-center mt-[1px] ml-0 cursor-pointer"
              onClick={() => toast.info('Opening Folder', { position: 'top-right' })}
              role="button"
              tabIndex={0}
            >
              Folder <span className="poppins-force ml-[6px] mt-[1px] inline-block cursor-pointer" onClick={e => { e.stopPropagation(); toast.info('Folder 2 selected', { position: 'top-right' }); }} role="button" tabIndex={0}>2</span>
            </span>
            <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--Icons-Medium-Emphasis-TrueGrey-Op-40,#AFAFAF)] block ml-[2px]">
              <polyline points="0,0 4,4 0,8" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span
              className="poppins-force font-medium text-[14px] leading-[19px] tracking-[0] text-[var(--Content-Core-contentPrimary,#121212)] flex items-center ml-[1px] mt-[1px] cursor-pointer"
              onClick={() => toast.info('Opening Spreadsheet', { position: 'top-right' })}
              role="button"
              tabIndex={0}
            >
              Spreadsheet <span className="poppins-force ml-[6px] inline-block cursor-pointer" onClick={e => { e.stopPropagation(); toast.info('Spreadsheet 3 selected', { position: 'top-right' }); }} role="button" tabIndex={0}>3</span>
            </span>
            <svg
              width="12.92"
              height="2.92"
              viewBox="0 0 12.92 2.92"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[var(--Icons-Medium-Emphasis-TrueGrey-Op-40,#AFAFAF)] block ml-[7px] mb-[1px]"
            >
              <circle cx="1.46" cy="1.46" r="1.46" fill="currentColor" />
              <circle cx="6.46" cy="1.46" r="1.46" fill="currentColor" />
              <circle cx="11.46" cy="1.46" r="1.46" fill="currentColor" />
            </svg>
          </div>
        </div>
        {/* Right side: search, bell, user */}
        <div className="flex items-center w-[325px] h-[40px] gap-[4px] mr-[-10px]">
          {/* Search */}
          <div className="w-[175px] h-[40px] gap-[8px] rounded-[6px] p-[12px] bg-[var(--Background-Core-backgroundSecondary,#F6F6F6)] flex items-center justify-center box-border ml-[-30px]">
            <div className="w-[16px] h-[16px] relative flex items-center justify-center ml-[2px] mt-[2px]">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0 text-[var(--Icons-Medium-Emphasis-TrueGrey-Op-40,#AFAFAF)] block"
              >
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <rect x="11.2" y="11.2" width="3" height="1.2" rx="0.6" transform="rotate(45 11.2 11.2)" fill="currentColor" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search within sheet"
              className="w-[120px] h-[22px] font-normal text-[12px] leading-[16px] tracking-[0] text-[var(--Content-Core-contentTertiary,#757575)] flex items-center justify-center text-center ml-[2px] mt-[2px] bg-transparent border-none outline-none font-[Poppins,Helvetica,sans-serif] poppins-force"
            />
          </div>
          {/* Bell with badge */}
          <div className="w-[32px] h-[28px] gap-[12px] rounded-[14px] p-0 flex items-center justify-center bg-[var(--Background-Core-backgroundPrimary,#fff)] mb-[2px] ml-[6px] relative">
            <div className="w-[30px] h-[28px] relative flex items-center justify-center">
              <svg
                width={30}
                height={28}
                viewBox="0 0 32 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[var(--Icons-Medium-Emphasis-Grey-Op-100,#121212)] cursor-pointer block"
                onClick={() => toast.info('You have 2 new notifications!', { position: 'top-right' })}
              >
                <path d="M16 25c1.657 0 3-1.343 3-3h-6c0 1.657 1.343 3 3 3zm8-7V12c0-4.418-2.686-8-8-8s-8 3.582-8 8v6l-2 2v1h20v-1l-2-2z" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <div
                className="absolute top-[2px] right-[2px] w-[14px] h-[14px] rounded-[7px] border border-solid border-[var(--Colours-White,#fff)] bg-[var(--Background-backgroundBrandPrimary-Default,#4B6A4F)] text-white text-[10px] flex items-center justify-center font-semibold box-border z-[1] mt-[-2px] mr-[-2px]"
              >
                2
              </div>
            </div>
          </div>
          {/* User avatar and info */}
          <div className="w-[140px] h-[48px] rounded-[8px] gap-[8px] p-0 pl-[8px] pr-[12px] bg-[var(--Background-Core-backgroundPrimary,#fff)] flex items-center box-border">
            <div className="w-[28px] h-[28px] flex items-center justify-center">
              <img
                src={avatarImg}
                alt="avatar"
                className="w-[28px] h-[28px] rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center items-start h-full mt-[2px]">
              <span
                className="poppins-force font-normal text-[12px] leading-[16px] text-[var(--Content-Core-contentPrimary,#121212)] block"
              >
                John Doe
              </span>
              <span
                className="poppins-force font-normal text-[10px] leading-[12px] text-[var(--Content-Core-contentTertiary,#757575)] block whitespace-nowrap overflow-hidden text-ellipsis max-w-[50px]"
              >
                john.doe...
              </span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SpreadsheetHeader; 