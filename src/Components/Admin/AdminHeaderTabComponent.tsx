import React, { useContext } from "react";
import { Session } from "@supabase/supabase-js";

import {
  HeaderContext,
  HeaderContextType,
} from "../../common/context/HeaderContext";

type Props = {
  pageName: string;
  tabName: string;
  onClick: (path: string) => void;
  session?: Session | null;
  children?: React.ReactNode;
};

function AdminHeaderTabComponent({
  pageName,
  tabName,
  onClick,
  session,
  children,
}: Props) {
  // useContext
  const { activeTab } = useContext(HeaderContext) as HeaderContextType;
  return children ? (
    <li
      className={`${
        activeTab === pageName ? "active hover-cursor" : "hover-cursor"
      }
      ${session ? "" : "hidden"}
      admin-tab`}
      onClick={() => onClick(pageName)}
    >
      {tabName}
      <ul className="">{children}</ul>
    </li>
  ) : (
    <li onClick={() => onClick(pageName)}>{tabName}</li>
  );
}

export default AdminHeaderTabComponent;
