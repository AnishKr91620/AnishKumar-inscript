import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const tabs = ["All Orders", "Pending", "Reviewed", "Arrived", "+"];

const OrderTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All Orders");

  const handleClick = (tab: string) => {
    setActiveTab(tab);
    const messages = {
      "All Orders": "Showing all orders",
      "Pending": "Filtered to show pending orders",
      "Reviewed": "Filtered to show reviewed orders", 
      "Arrived": "Filtered to show arrived orders",
      "+": "Add new order"
    };
    toast.info(messages[tab as keyof typeof messages] || `${tab} selected`, { position: "top-right" });
  };

  return (
    <div
      className="fixed left-0 bottom-0 w-full z-[1000] bg-[var(--Background-Core-backgroundPrimary,#fff)] border-t border-[var(--Border-Core-borderTertiary,#eee)] flex justify-center"
    >
      <div
        className="w-full h-[48px] bg-[var(--Background-Core-backgroundPrimary,#fff)] border-t border-[var(--Border-Core-borderTertiary,#eee)] pt-1 pr-4 pl-8 flex items-center box-border"
      >
        <div className="w-[437px] h-[44px] opacity-100 flex items-center">
          {tabs.filter(tab => tab !== "+").map((tab) => (
            <div
              key={tab}
              className={`group ${tab === "All Orders" ? "w-[111px]" : tab === "Pending" ? "w-[94px]" : tab === "Reviewed" ? "w-[107px]" : "w-[89px]"} h-[52px] opacity-100 pt-[10px] pr-[12px] pb-[10px] pl-[12px] gap-2 border-t-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${activeTab === tab ? 'bg-[var(--Colours-BrandPrimary-100,#E8F0E9)] border-t-[var(--Border-borderBrandPrimary-Default,#4B6A4F)]' : 'bg-transparent border-t-transparent'}`}
              onClick={() => handleClick(tab)}
              style={{ cursor: 'pointer' }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#f3f3f3';
              }}
              onMouseLeave={e => {
                if (activeTab === tab) {
                  e.currentTarget.style.backgroundColor = 'var(--Colours-BrandPrimary-100,#E8F0E9)';
                } else {
                  e.currentTarget.style.backgroundColor = '';
                }
              }}
            >
              <div className={`h-[52px] opacity-100 font-[ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji] font-medium not-italic text-[14px] leading-6 tracking-[0] flex items-center justify-center ${activeTab === tab ? 'text-[var(--Colours-BrandPrimary-700,#3E5741)]' : 'text-[var(--Content-Core-contentTertiary,#757575)]'}`}>
                {tab}
              </div>
            </div>
          ))}
        </div>
        {/* Render the "+" button separately outside the wrapper */}
        {tabs.filter(tab => tab === "+").map((tab) => (
          <div
            key={tab}
            className="w-[16px] h-[12px] mr-8 opacity-100 pt-2 pr-7 pb-2 pl-2 gap-1 flex items-center justify-center mb-2 ml-[-30px]"
          >
            <button
              onClick={() => {
                // Don't change state for "+" button, just show toast
                toast.info("Add new order", { position: "top-right" });
              }}
              className="w-4 h-[32px] opacity-100 gap-2 rounded-[4px] p-1 bg-[var(--Background-Core-backgroundPrimary,#fff)] border-none outline-none cursor-pointer transition-all duration-200 flex items-center justify-center"
              onMouseEnter={e => {
                e.currentTarget.classList.add('bg-[#F3F4F6]');
              }}
              onMouseLeave={e => {
                e.currentTarget.classList.remove('bg-[#F3F4F6]');
              }}
            >
              <div className="w-3 h-5 opacity-100 flex items-center justify-center">
                <div className="w-5 h-[22px] relative top-[2.5px] left-[2.5px] opacity-100 text-[var(--Colours-TrueGrey-500,#757575)] flex items-center justify-center text-[24px] font-[50] ml-3 mt-[3px]">
                  {tab}
                </div>
              </div>
            </button>
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default OrderTabs;
