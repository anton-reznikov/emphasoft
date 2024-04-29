import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SortUsers = memo(({ handleSetSortType }) => {
  return (
    <Select onValueChange={handleSetSortType}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Сортировка по ID" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="HighToLow">По убыванию</SelectItem>
        <SelectItem value="LowToHigh">По возрастанию</SelectItem>
      </SelectContent>
    </Select>
  );
});

export default SortUsers;
