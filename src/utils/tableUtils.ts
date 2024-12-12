import { ColumnWidths } from '../types/table';

export const calculateLeftPosition = (
  index: number,
  pinnedSetIds: string[],
  columnWidths: ColumnWidths,
  firstColumnWidth: number
): number => {
  let position = columnWidths.firstColumn || firstColumnWidth;
  
  for (let i = 0; i < index; i++) {
    const setId = pinnedSetIds[i];
    position += columnWidths[setId] || 150;
  }
  
  return position;
};