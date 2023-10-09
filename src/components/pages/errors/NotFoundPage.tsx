import { ReactNode } from "react";

import Page from "@/components/pages/Page";

import "./ErrorsPage.scss";

type NotFoundProps = {
  children: ReactNode;
};

const NotFoundPage = (props: NotFoundProps) => {
  const { children } = props;

  return (
    <Page title="404 · NotFound" className="page-error">
      <div className="errors">{children}</div>
    </Page>
  );
};

export default NotFoundPage;
