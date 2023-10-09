import { ReactNode } from "react";

import "./PageActions.scss";

type PageActionsProps = {
  children: ReactNode;
};

const PageActions = (props: PageActionsProps) => {
  const { children } = props;
  return <div className="page-actions">{children}</div>;
};

export default PageActions;
