import { ReactNode } from "react";

import { PageAction } from "@/@types/Page";
import { PageActions } from "@/components/pages/components/page-actions/PageActions";
import { PageTitle } from "@/components/pages/components/page-title/PageTitle";

import "./Main.scss";

export type MainProps = {
  title: string;
  className?: string;
  actions?: PageAction[];
  children: ReactNode;
};

export const Page = (props: MainProps) => {
  const { title, className, actions = [], children } = props;

  return (
    <div className={["main", className].join(" ")}>
      <div className="main__header">
        <PageTitle>{title}</PageTitle>
        <PageActions>{actions}</PageActions>
      </div>
      <div className="main__content">{children}</div>
    </div>
  );
};
