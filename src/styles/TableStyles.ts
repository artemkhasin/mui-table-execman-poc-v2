import styled from 'styled-components';
import { TableCell, Button } from '@mui/material';

export const StyledTableCell = styled(TableCell)<{ $width?: number }>`
  border-right: 1px solid rgba(224, 224, 224, 1);
  padding: 0;
  width: ${props => props.$width ? `${props.$width}px` : '150px'};
  min-width: ${props => props.$width ? `${props.$width}px` : '150px'};
  max-width: ${props => props.$width ? `${props.$width}px` : '150px'};
  box-sizing: border-box;
  position: relative;
  background-color: #ffffff;
  transition: width 0.1s ease;
  
  &:last-child {
    border-right: none;
  }

  tr:nth-of-type(odd) & {
    background-color: #ffffff;
  }

  tr:nth-of-type(even) & {
    background-color: #fafafa;
  }

  &[style*="position: sticky"] {
    z-index: 1;
    box-shadow: 2px 0 5px -2px rgba(0,0,0,0.1);
  }
`;

export const StyledHeaderCell = styled(StyledTableCell)`
  font-weight: 600;
  background-color: #f5f5f5 !important;
  position: relative;

  &[style*="position: sticky"] {
    z-index: 2;
    box-shadow: 2px 0 5px -2px rgba(0,0,0,0.1);
  }

  &:first-child {
    z-index: 3;
  }
`;

export const AddButton = styled(Button)`
  && {
    margin-bottom: 16px;
    background-color: #1976d2;
    color: white;
    
    &:hover {
      background-color: #1565c0;
    }
  }
`;

export const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  background-color: #ffffff;
`;