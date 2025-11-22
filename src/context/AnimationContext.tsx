import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AnimationSpeed, VisualizationState } from '../types';

interface AnimationContextType {
  state: VisualizationState;
  play: () => void;
  pause: () => void;
  reset: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  setSpeed: (speed: AnimationSpeed) => void;
  setTotalSteps: (total: number) => void;
  setCurrentStep: (step: number) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<VisualizationState>({
    isPlaying: false,
    isPaused: false,
    currentStep: 0,
    totalSteps: 0,
    speed: 1,
  });

  const play = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: true, isPaused: false }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: false, isPaused: true }));
  }, []);

  const reset = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      currentStep: 0,
    }));
  }, []);

  const stepForward = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps),
      isPlaying: false,
      isPaused: true,
    }));
  }, []);

  const stepBackward = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
      isPlaying: false,
      isPaused: true,
    }));
  }, []);

  const setSpeed = useCallback((speed: AnimationSpeed) => {
    setState((prev) => ({ ...prev, speed }));
  }, []);

  const setTotalSteps = useCallback((total: number) => {
    setState((prev) => ({ ...prev, totalSteps: total }));
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        state,
        play,
        pause,
        reset,
        stepForward,
        stepBackward,
        setSpeed,
        setTotalSteps,
        setCurrentStep,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components -- Context hook must be exported alongside provider
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
