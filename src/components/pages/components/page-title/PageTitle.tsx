import { ReactNode } from "react";

import "./PageTitle.scss";

export type PageTitleProps = {
  children: ReactNode;
};

export const PageTitle = ({ children }: PageTitleProps) => {
  return <h1 className="page-title">{children}</h1>;
};
