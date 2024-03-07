/* eslint-disable react/prop-types */
import { useState } from "react";
import { categoryIcon } from "../../../constant/apiRoutes";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const TreeMenu = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const renderSubcategories = (subcategories) => {
    if (!subcategories || subcategories.length === 0) {
      return null;
    }

    const container = {
      hidden: { opacity: 1, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.2,
          staggerChildren: 0.1,
        },
      },
    };

    const item = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    };

    return (
      <motion.ul
        variants={container}
        initial="hidden"
        animate="visible"
        className="ml-5 mt-2 w-[100%]"
      >
        {subcategories.map((subcategory) => (
          <Link
            key={subcategory.subcategory_id}
            to={`/subcategory/${subcategory.url}`}
          >
            <motion.li
              variants={item}
              className="my-[2px] flex items-center gap-1 leading-6 text-xs truncate w-full"
            >
              <Icon className="w-3" icon={"bi:caret-right-fill"} />
              {subcategory.name}
              {renderSubcategories(subcategory.subcategories)}
            </motion.li>
          </Link>
        ))}
      </motion.ul>
    );
  };

  const renderCategories = () => {
    return data.map((category, index) => (
      <li
        className="text-black pl-5 pr-1 py-[6px] xl:py-2 border-b text-xs"
        key={index}
      >
        <button
          type="button"
          className="flex items-center gap-2 hover:bg-gray-100"
          onClick={() => handleCategoryClick(category.category_id)}
        >
          <img
            className="w-4 h-4"
            src={`${categoryIcon}/${category.web_icon}`}
            alt=""
          />{" "}
          <span className="truncate w-[100%] text-xs xl:text-sm">
            {category.name}
          </span>
        </button>
        {selectedCategory === category.category_id &&
          renderSubcategories(category.subcategories)}
      </li>
    ));
  };

  return (
    <div>
      <ul>{renderCategories()} </ul>
    </div>
  );
};

export default TreeMenu;
