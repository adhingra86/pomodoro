import { ReactElement, useState } from "react";

type TabProps = {
  tabName: string;
};

function Tab({
  tabName,
  ...props
}: TabProps & React.AllHTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{tabName}</div>;
}

export const Tabs = ({
  tabs,
  selectedTabIndex,
}: {
  tabs: string[];
  selectedTabIndex: (tabIndex: number) => void;
}): ReactElement => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="flex gap-2">
      {tabs.map((tab, index) => (
        <Tab
          key={tab}
          tabName={tab}
          className={`${
            tabIndex === index ? "bg-white" : ""
          } px-4 py-2 cursor-pointer`}
          onClick={() => {
            setTabIndex(index);
            selectedTabIndex(index);
          }}
        />
      ))}
    </div>
  );
};
