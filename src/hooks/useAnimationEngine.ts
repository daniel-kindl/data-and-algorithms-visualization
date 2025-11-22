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
  // We use a ref for the timeout ID to persist it across renders without triggering re-renders.
  // This allows us to clear the timeout reliably when the component unmounts or when playback stops.
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate delay based on speed multiplier.
  // Higher speed value means smaller delay (faster animation).
  const getDelay = useCallback((speed: AnimationSpeed): number => {
    const baseDelay = 1000; // 1 second base
    return baseDelay / speed;
  }, []);

  useEffect(() => {
    // If not playing or we've reached the end, stop the loop.
    if (!isPlaying || currentStepIndex >= steps.length) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Notify parent when animation completes so it can update UI state (e.g., pause button).
      if (currentStepIndex >= steps.length && steps.length > 0) {
        onComplete();
      }
      return;
    }

    // Schedule the next step.
    const delay = getDelay(speed);
    timeoutRef.current = setTimeout(() => {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      onStepChange(nextIndex);
    }, delay);

    // Cleanup function to prevent memory leaks and zombie timers if the component unmounts
    // or if dependencies change mid-animation.
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
