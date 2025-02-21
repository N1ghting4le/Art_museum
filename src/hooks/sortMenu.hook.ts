import { useState, MouseEvent } from 'react';
import { Props } from '@/components/sortMenu/SortMenu';
import { SortParam } from '@/types/sortParam';

type Args = Omit<Props, 'sortParam'>;

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
