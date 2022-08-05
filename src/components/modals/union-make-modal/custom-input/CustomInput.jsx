const CustomInput = ({
  onChange,
  isReadOnly,
  customValue,
  customPlaceHolder,
  customId,
  customName,
  customType,
}) => {
  return (
    <input
      type={customType}
      name={customName}
      id={customId}
      placeholder={customPlaceHolder}
      value={customValue}
      className="w-64 h-10 border-0 bg-[#372F47] text-white text-sm text-center py-4 mb-2 rounded-lg focus:ring-blue-500 "
      onChange={onChange}
      autoComplete="off"
      readOnly={isReadOnly}
    />
  );
};

export default CustomInput;