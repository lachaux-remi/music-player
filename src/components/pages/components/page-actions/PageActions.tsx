import { ReactNode } from "react";

import "./PageActions.scss";

export type PageActionsProps = {
  children: ReactNode;
};

export const PageActions = (props: PageActionsProps) => {
  const { children } = props;
  return <div className="page-actions">{children}</div>;
};
