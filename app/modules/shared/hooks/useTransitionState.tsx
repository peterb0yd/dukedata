import { useTransition } from "@remix-run/react";

enum TransitionStates {
  SUBMITTING = 'submitting',
  IDLE = 'idle',
  LOADING = 'loading',
}

export const useTransitionState = () => {
  const transition = useTransition();
  const isSubmitting = transition.state === TransitionStates.SUBMITTING;
  const isLoading = transition.state === TransitionStates.LOADING;
  const isIdle = transition.state === TransitionStates.IDLE;

  return {
    transition,
    isSubmitting,
    isLoading,
    isIdle,
  };
}