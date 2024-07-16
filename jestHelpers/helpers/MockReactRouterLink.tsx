import {
  ReactNode
} from 'react';

export interface MockReactRouterLinkProps {
  children: ReactNode;
}

export const MockReactRouterLink = ({
  children,
  ...props
}: MockReactRouterLinkProps) => {
  return (
    <a {...props}>
      {children}
    </a>
  );
};
