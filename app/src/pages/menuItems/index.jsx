import { getAllMenuItems } from "../../api/menuItem";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuItemCard from "../../components/menuItems/Card";
import Spinner from "../../components/Spinner";

const MenuItems = () => {
  const [loading, setLoading] = useState(false);

  const [menuItems, setMenuItems] = useState([]);

  const [searchParams] = useSearchParams();
  const menuItemName = searchParams.get("item-name");

  useEffect(() => {
    setLoading(true);

    let filters = `isActive=true`;

    if (menuItemName) filters = `isActive=true&name=${menuItemName}`;

    getAllMenuItems(filters)
      .then((response) => setMenuItems(response.data))
      .finally(() => setLoading(false));
  }, [menuItemName]);

  return (
    <section className="py-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor">
          Menu items
        </h2>
        <div className="py-8">
          {loading ? (
            <div className="p-20 flex items-center justify-center w-full">
              <Spinner height="h-10" width="w-10" />
            </div>
          ) : menuItems.length > 0 ? (
            <div className="grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {menuItems?.map((menuItem, index) => (
                <MenuItemCard key={index} {...menuItem} />
              ))}
            </div>
          ) : (
            <div className="p-2 rounded bg-blue-200 text-center">
              Menu items empty. Try using different keywords.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuItems;
