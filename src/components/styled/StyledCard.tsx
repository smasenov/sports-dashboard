import styled from '@emotion/styled';
import { Card } from '@mui/material';

export const StyledGameCard = styled(Card)<{ status?: 'pre' | 'in' | 'post' }>`
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ status }) => {
      if (status === 'in') return 'linear-gradient(90deg, #ff4444, #ff8844)';
      if (status === 'post') return 'linear-gradient(90deg, #4a90e2, #67b26f)';
      return 'linear-gradient(90deg, #9b59b6, #3498db)';
    }};
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

export const StyledTeamCard = styled(Card)`
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
`;

export const GradientBackground = styled.div<{ color?: string }>`
  background: ${({ color }) => 
    color 
      ? `linear-gradient(135deg, #${color}22 0%, #${color}44 100%)` 
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  padding: 24px;
  border-radius: 12px 12px 0 0;
`;

export const LiveIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: linear-gradient(90deg, #ff4444, #ff6666);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    margin-right: 6px;
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(0.8);
    }
  }
`;

export const ScoreDisplay = styled.div`
  font-size: 2rem;
  font-weight: 700;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  letter-spacing: -0.5px;
  line-height: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const TeamLogo = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const StatusBadge = styled.span<{ state: 'pre' | 'in' | 'post' }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ state }) => {
    if (state === 'in') return 'rgba(255, 68, 68, 0.1)';
    if (state === 'post') return 'rgba(76, 175, 80, 0.1)';
    return 'rgba(66, 165, 245, 0.1)';
  }};
  color: ${({ state }) => {
    if (state === 'in') return '#ff4444';
    if (state === 'post') return '#4caf50';
    return '#42a5f5';
  }};
  border: 1px solid ${({ state }) => {
    if (state === 'in') return 'rgba(255, 68, 68, 0.3)';
    if (state === 'post') return 'rgba(76, 175, 80, 0.3)';
    return 'rgba(66, 165, 245, 0.3)';
  }};
`;
