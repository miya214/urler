import { useState } from 'react';

interface useMultiplePostCheckedRet {
  checked: string[];
  toggleChecked: (tgt: string) => void;
  allCheck: () => void;
  clearCheck: () => void;
}

const useMultiplePostChecked = (
  canCheckItems: string[],
  initVal?: string[]
): useMultiplePostCheckedRet => {
  const [checked, setChecked] = useState<string[]>(initVal || []);
  const toggleChecked = (tgt: string) => {
    if (checked.includes(tgt)) {
      setChecked([...checked.filter((item) => item !== tgt)]);
    } else {
      setChecked([...checked.concat([tgt])]);
    }
  };

  const allCheck = () => setChecked(canCheckItems);
  const clearCheck = () => setChecked([]);

  return {
    checked,
    toggleChecked,
    allCheck,
    clearCheck,
  };
};

export default useMultiplePostChecked;
