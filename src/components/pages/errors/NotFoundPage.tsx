import { ReactNode } from "react";

import { Page } from "@/components/pages/Page";

import "./ErrorsPage.scss";

export type NotFoundProps = {
  children: ReactNode;
};

export const NotFoundPage = (props: NotFoundProps) => {
  const { children } = props;

  return (
    <Page title="404 · NotFound" className="page-error">
      <div className="errors">{children}</div>
    </Page>
  );
};
