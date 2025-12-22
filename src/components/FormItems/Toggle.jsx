import React from "react";

const Toggle = ({ checked, onChange, disabled = false, className = "" }) => {
  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${
        disabled ? "cursor-not-allowed" : ""
      } ${className}`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div
        className={`w-8 h-[19px] rounded-sm transition-all relative px-[1.5px] py-[1.5px] pr-1 ${
          checked ? "bg-blue-600" : "bg-[#D6D6D6]"
        } ${disabled ? "opacity-50" : ""}`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-sm transition-all transform ${
            checked ? "translate-x-[14px]" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
};

export default Toggle;
