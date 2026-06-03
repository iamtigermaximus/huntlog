"use client";

import styled, { keyframes } from "styled-components";

const fillAnimation = (score: number) => keyframes`
  from { stroke-dashoffset: 283; }
  to { stroke-dashoffset: ${283 - (283 * score) / 100}; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const Wrapper = styled.div<{ $size: number }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const SvgWrapper = styled.div<{ $size: number }>`
  position: relative;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`;

const StyledSvg = styled.svg`
  transform: rotate(-90deg);
`;

const CircleBg = styled.circle`
  fill: none;
  stroke: #e5e7eb;
  stroke-width: 8;
`;

const getColor = (score: number) => {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
};

const CircleFill = styled.circle<{ $score: number; $circumference: number }>`
  fill: none;
  stroke: ${(props) => getColor(props.$score)};
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: ${(props) => props.$circumference};
  stroke-dashoffset: ${(props) => props.$circumference};
  animation: ${(props) => fillAnimation(props.$score)} 1.5s ease-out forwards;
`;

const ScoreText = styled.div<{ $score: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => getColor(props.$score)};
  animation: ${scaleIn} 0.4s ease-out;
`;

const Label = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
`;

interface AIScoreCircleProps {
  score: number;
  size?: number;
  label?: string;
  animated?: boolean;
}

export default function AIScoreCircle({
  score,
  size = 100,
  label,
  animated = true,
}: AIScoreCircleProps) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <Wrapper $size={size}>
      <SvgWrapper $size={size}>
        <StyledSvg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <CircleBg
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
          <CircleFill
            cx={size / 2}
            cy={size / 2}
            r={radius}
            $score={score}
            $circumference={circumference}
            style={animated ? {} : { strokeDashoffset: circumference - (circumference * score) / 100 }}
          />
        </StyledSvg>
        <ScoreText $score={score}>{score}%</ScoreText>
      </SvgWrapper>
      {label && <Label>{label}</Label>}
    </Wrapper>
  );
}
