import { BiCross, BiSearch, BiWindowClose, BiX } from "react-icons/bi";
import { MENU_ITEMS_ROUTE } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const [itemName, setItemName] = useState("");

  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    navigate(`${MENU_ITEMS_ROUTE}?item-name=${itemName}`);
  }

  function clearSearch() {
    navigate(MENU_ITEMS_ROUTE);
    setItemName("");
  }

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <BiSearch />
        </div>
        <input
          type="text"
          id="default-search"
          className="inline-block w-full py-2 px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-600"
          placeholder="Search menu items ..."
          required
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        {itemName && (
          <button
            type="button"
            className="text-blue p-1 rounded-md absolute end-1 bottom-1 text-blue-600 text-md"
            onClick={clearSearch}
          >
            <BiX className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default Search;
