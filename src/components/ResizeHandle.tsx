import React from 'react';
import styled from 'styled-components';
import { ResizeHandleProps } from '../types/table';

const Handle = styled.div<{ $isResizing?: boolean }>`
  position: absolute;
  right: -3px;
  top: 0;
  bottom: 0;
  width: 6px;
  cursor: col-resize;
  user-select: none;
  touch-action: none;
  background: ${props => props.$isResizing ? 'rgba(25, 118, 210, 0.4)' : 'transparent'};
  z-index: 3;

  &:hover {
    background: rgba(25, 118, 210, 0.2);
  }
`;

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ onResizeStart, isResizing }) => {
  return <Handle onMouseDown={onResizeStart} $isResizing={isResizing} />;
};