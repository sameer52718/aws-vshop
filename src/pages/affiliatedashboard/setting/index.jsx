import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import Card from "@/components/ui/Card";

import ChangePassword from "./change-password";
import Personal from "./personal";
import Bank from "./bank";
import Attachments from "./attachments";

const items = [
  {
    title: "Personal",
    icon: "heroicons-outline:home",
  },
  {
    title: "Bank",
    icon: "heroicons-outline:home",
  },
  {
    title: "Password",
    icon: "heroicons-outline:user",
  },
  {
    title: "Attachments",
    icon: "heroicons-outline:user",
  },
];

const Settings = () => {

  return (
    <Card title="Settings">
      <Tab.Group>
        <div className="grid grid-cols-12 md:gap-10">
          <div className="lg:col-span-3 md:col-span-5 col-span-12">
            <Tab.List className="grid grid-cols-2 md:grid-cols-1 mb-5 gap-2">
              {items.map((item, i) => (
                <Tab key={i} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`w-full col-span-1 text-left text-sm font-medium md:block inline-block md:mb-4 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-2 md:px-6 rounded-md py-1 md:py-2 transition duration-150
            ${
              selected
                ? "text-white bg-main "
                : "text-slate-500 bg-slate-100 dark:bg-slate-700 dark:text-slate-300"
            }
          `}
                    >
                      {item.title}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <div className="lg:col-span-9 md:col-span-7 col-span-12">
            <Tab.Panels>
              <Tab.Panel>
                <Personal />
              </Tab.Panel>
              <Tab.Panel>
                <Bank />
              </Tab.Panel>
              <Tab.Panel>
                <ChangePassword />
              </Tab.Panel>
              <Tab.Panel>
                <Attachments />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </div>
      </Tab.Group>
    </Card>
  );
};

export default Settings;
