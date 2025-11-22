import { useState, useEffect, useCallback, useRef } from 'react';
import type { AnimationSpeed, AnimationStep } from '../types';

interface UseAnimationEngineProps {
  steps: AnimationStep[];
  speed: AnimationSpeed;
  isPlaying: boolean;
  onStepChange: (stepIndex: number) => void;
  onComplete: () => void;
}

export const useAnimationEngine = ({
  steps,
  speed,
  isPlaying,
  onStepChange,
  onComplete,
}: UseAnimationEngineProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getDelay = useCallback((speed: AnimationSpeed): number => {
    const baseDelay = 1000; // 1 second base
    return baseDelay / speed;
  }, []);

  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (currentStepIndex >= steps.length && steps.length > 0) {
        onComplete();
      }
      return;
    }

    const delay = getDelay(speed);
    timeoutRef.current = setTimeout(() => {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      onStepChange(nextIndex);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, steps.length, speed, getDelay, onStepChange, onComplete]);

  const reset = useCallback(() => {
    setCurrentStepIndex(0);
    onStepChange(0);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [onStepChange]);

  const goToStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex <= steps.length) {
        setCurrentStepIndex(stepIndex);
        onStepChange(stepIndex);
      }
    },
    [steps.length, onStepChange],
  );

  return {
    currentStepIndex,
    reset,
    goToStep,
  };
};
