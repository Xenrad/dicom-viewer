import React from 'react';
import { Loader as LucideLoader } from 'lucide-react';

type LoadingIndicatorProgressProps = {
  className?: string;
  textBlock?: React.ReactNode;
  progress?: number;
  size?: number;
};

/**
 *  A React component that renders a loading indicator.
 * if progress is not provided, it will render an infinite loading indicator
 * if progress is provided, it will render a progress bar
 * Optionally a textBlock can be provided to display a message
 */
function LoadingIndicatorProgress({ className, size = 24 }: LoadingIndicatorProgressProps) {
  return (
    <LucideLoader
      className={`text-primary/80 animate-spin ${className}`}
      size={size}
    />
  );
}

export default LoadingIndicatorProgress;
