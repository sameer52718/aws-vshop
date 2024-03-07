import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import Proptypes from "prop-types";
const Breadcrumbs = ({
  previosLinks = [],
  currentLink = "Add Current Link",
}) => {
  return (
    <div className="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
      <ul className="breadcrumbs">
        <li className="text-main">
          <NavLink to="/" className="text-lg">
            <Icon icon="heroicons-outline:home" />
          </NavLink>
          <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
            <Icon icon="heroicons:chevron-right" />
          </span>
        </li>
        {previosLinks.map((link, index) => (
          <li className="text-main" key={index}>
            <NavLink to={link.link}>{link.name}</NavLink>
            <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
              <Icon icon="heroicons:chevron-right" />
            </span>
          </li>
        ))}
        <li className="capitalize text-slate-500 dark:text-slate-400">
          {currentLink}
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;

Breadcrumbs.Proptypes = {
  previosLinks: Proptypes.array,
  currentLink: Proptypes.string.isRequired,
};
