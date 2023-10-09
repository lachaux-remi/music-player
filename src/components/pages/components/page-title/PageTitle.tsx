import { ReactNode } from "react";

import "./PageTitle.scss";

type PageTitleProps = {
  children: ReactNode;
};

const PageTitle = ({ children }: PageTitleProps) => {
  return <h1 className="page-title">{children}</h1>;
};

export default PageTitle;
