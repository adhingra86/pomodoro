import { ReactElement, useEffect, useState } from "react";

type TabProps = {
  tabName: string;
  selectedTabIndex?: number;
};

function Tab({
  tabName,
  ...props
}: TabProps & React.AllHTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{tabName}</div>;
}

export const Tabs = ({
  tabs,
  selectTab,
  selectedTabIndex,
}: {
  tabs: string[];
  selectTab: (tabIndex: number) => void;
  selectedTabIndex?: number;
}): ReactElement => {
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (selectedTabIndex === undefined) return;
    setTabIndex(selectedTabIndex);
  }, [selectedTabIndex]);

  return (
    <div className="flex gap-2">
      {tabs.map((tab, index) => (
        <Tab
          key={tab}
          tabName={tab}
          className={`${
            tabIndex === index || selectedTabIndex === index ? "bg-white" : ""
          } px-4 py-2 cursor-pointer rounded-lg`}
          onClick={() => {
            setTabIndex(index);
            selectTab(index);
          }}
        />
      ))}
    </div>
  );
};
