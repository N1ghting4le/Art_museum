import { useState, MouseEvent, Dispatch, SetStateAction } from 'react';
import { SortParam } from '@/types/sortParam';

type Args = {
  setSortParam: Dispatch<SetStateAction<SortParam>>;
};

const useSortMenu = ({ setSortParam }: Args) => {
  const [showList, setShowList] = useState(false);

  const toggleShow = () => setShowList((v) => !v);

  const setParamByClick = (e: MouseEvent) => {
    const { textContent } = e.currentTarget;

    setSortParam(textContent as SortParam);
  };

  return { showList, toggleShow, setParamByClick };
};

export default useSortMenu;
