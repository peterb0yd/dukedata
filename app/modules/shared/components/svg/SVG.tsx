import React from 'react';

export type IconSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

type SVGProps = {
  children: JSX.Element | JSX.Element[];
  color?: string;
  size?: IconSizes | number;
  className?: string;
  [x: string | number | symbol]: unknown;
};

export const sizeMap: { [key in IconSizes]: object } = {
  xs: { width: 16, height: 16 },
  sm: { width: 20, height: 20 },
  md: { width: 30, height: 30 },
  lg: { width: 40, height: 40 },
  xl: { width: 60, height: 60 },
  '2xl': { width: 80, height: 80 },
  '3xl': { width: 120, height: 120 },
};

export const SVG = ({
  color = 'white',
  size = 'md',
  children,
  className = '',
  ...rest
}: SVGProps) => {
  let style = {};
  if (typeof size === 'number') {
    style = {
      width: size, height: size
    }
  } else {
    style = sizeMap[size];
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      style={style}
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}