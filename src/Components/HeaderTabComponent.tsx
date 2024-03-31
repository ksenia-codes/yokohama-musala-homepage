import { useContext } from "react";

import {
  HeaderContext,
  HeaderContextType,
} from "../common/context/HeaderContext";

type Props = {
  pageName: string;
  tabName: string;
  onClick: (path: string) => void;
};

function HeaderTabComponent({ pageName, tabName, onClick }: Props) {
  // useContext
  const { activeTab } = useContext(HeaderContext) as HeaderContextType;
  return (
    <li
      className={`${
        activeTab === pageName ? "active hover-cursor" : "hover-cursor"
      }`}
      onClick={() => onClick(pageName)}
    >
      {tabName}
    </li>
  );
}

export default HeaderTabComponent;
