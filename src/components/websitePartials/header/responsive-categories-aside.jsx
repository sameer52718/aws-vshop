import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { categoryIcon, getSubCategories } from "../../../constant/apiRoutes";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export const ResponsiveCategoriesAside = () => {
  const [data, setData] = useState({ category: [], subcategory: [] });
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.post(getSubCategories);
        if (data.error === false) {
          setData(data.data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, []);

  const subcategoriesMap = data.subcategory.reduce((map, subcategory) => {
    const categoryId = subcategory.category_id;
    if (!map[categoryId]) {
      map[categoryId] = [];
    }
    map[categoryId].push(subcategory);
    return map;
  }, {});

  const categoriesWithSubcategories = data.category.map((category) => ({
    ...category,
    subcategories: subcategoriesMap[category.category_id] || [],
  }));

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

  return (
    <>
      {categoriesWithSubcategories.map((item, index) => (
        <li key={index}>
          {/* <Link
                  to={`/category/${item.category_id}`}
                  className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                > */}
          <button
            type="button"
            className="gap-1 flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            onClick={() => {
              handleCategoryClick(item.category_id);
              // navigate(`/category/${item.category_id}`);
            }}
          >
            <img
              src={`${categoryIcon}/${item.web_icon}`}
              alt={item.name}
              className="w-4 lg:w-6"
            />
            <span className="ms-3 text-sm truncate">{item.name}</span>
          </button>
          {selectedCategory === item.category_id &&
            renderSubcategories(item.subcategories)}
        </li>
      ))}
    </>
  );
};
