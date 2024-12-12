import { useState, useCallback, useEffect } from 'react';
import { ColumnWidths } from '../types/table';

const MIN_COLUMN_WIDTH = 100;

interface UseColumnResizeProps {
  firstColumn?: number;
}

export const useColumnResize = (initialWidths: UseColumnResizeProps = {}) => {
  const [columnWidths, setColumnWidths] = useState<ColumnWidths>({
    firstColumn: initialWidths.firstColumn
  });
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const handleResizeStart = useCallback((columnId: string, width: number, e: React.MouseEvent) => {
    setResizingColumn(columnId);
    setStartX(e.clientX);
    setStartWidth(width);
    e.preventDefault();
  }, []);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizingColumn) return;

    const diff = e.clientX - startX;
    const newWidth = Math.max(MIN_COLUMN_WIDTH, startWidth + diff);

    setColumnWidths(prev => ({
      ...prev,
      [resizingColumn]: newWidth
    }));
  }, [resizingColumn, startX, startWidth]);

  const handleResizeEnd = useCallback(() => {
    setResizingColumn(null);
  }, []);

  useEffect(() => {
    if (resizingColumn) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [resizingColumn, handleResizeMove, handleResizeEnd]);

  return {
    columnWidths,
    resizingColumn,
    handleResizeStart,
    setColumnWidths
  };
};