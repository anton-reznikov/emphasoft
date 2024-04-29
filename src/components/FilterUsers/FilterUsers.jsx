import { memo } from "react";
import { Input } from "../ui/input";

const FilterUsers = memo(({ value, handleSetInputValue }) => {
  return (
    <div className="w-[250px]">
      <Input
        value={value}
        onChange={handleSetInputValue}
        type="text"
        placeholder="Отфильтровать"
      />
    </div>
  );
});

export default FilterUsers;
