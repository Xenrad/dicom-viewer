import React from 'react';
import { Loader as LucideLoader } from 'lucide-react';
import classNames from 'classnames';

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
    <div
      className={classNames(
        'absolute top-0 left-0 z-50 flex flex-col items-center justify-center space-y-5',
        className
      )}
    >
      <LucideLoader
        className={`text-aqua-pale h-8 w-8 animate-spin ${className}`}
        size={size}
      />
    </div>
  );
}

export default LoadingIndicatorProgress;
