import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ indeterminate, ...rest }) => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className="w-[16px] h-[16px] align-middle rounded-[4px] border border-[var(--Border-Core-borderTertiary,#EEEEEE)] bg-[var(--Background-Core-backgroundPrimary,#fff)] appearance-none checked:bg-[var(--Colours-BrandPrimary-500,#4B6A4F)] checked:border-[var(--Colours-BrandPrimary-500,#4B6A4F)] focus:outline-none focus:ring-2 focus:ring-[var(--Colours-BrandPrimary-500,#4B6A4F)] transition duration-100 cursor-pointer"
      {...rest}
    />
  );
};

export default Checkbox; 