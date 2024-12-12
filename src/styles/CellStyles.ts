import styled from 'styled-components';

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.$hasError ? '#d32f2f' : 'transparent'};
  border-radius: 0;
  background: ${props => props.$hasError ? 'rgba(211, 47, 47, 0.08)' : 'transparent'};
  font-family: inherit;
  font-size: inherit;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    background-color: ${props => props.$hasError ? 'rgba(211, 47, 47, 0.08)' : 'rgba(25, 118, 210, 0.08)'};
  }
`;

export const CellContent = styled.div`
  cursor: pointer;
  padding: 12px 16px;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const ErrorTooltip = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #d32f2f;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 1000;
  white-space: nowrap;
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #d32f2f;
  }
`;