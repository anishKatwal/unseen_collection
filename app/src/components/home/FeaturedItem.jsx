import { Link } from "react-router-dom";
import { MENU_ITEMS_ROUTE } from "../../constants/routes";
import burger from "../../assets/images/burger.png";

function FeaturedItem() {
  return (
    <div className="py-10 px-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 px-6 md:px-16 lg:p-0 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-start justify-center ">
          <span className="bg-blue-200 text-blue-800 px-4 rounded-xl ml-2">
            Featured Item
          </span>
          <h1 className="text-4xl md:text-5xl font-bold  my-2">
            Hamburger with Extra Cheese
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo facere,
            harum quasi iusto sint error sunt hic quae quia reiciendis?
          </p>
          <p className="py-2">
            Incidunt vel consequuntur modi, dignissimos a ea sequi ducimus dicta
            quis mollitia tenetur ad atque! Delectus itaque quaerat odit
            impedit?
          </p>
          <h4 className="text-2xl md:text-3xl font-bold text-orange-500 my-3">
            <span className="text-3xl md:text-4xl">Rs.</span>
            899
          </h4>

          <Link
            to={`${MENU_ITEMS_ROUTE}?item-name=burger`}
            className="py-2 px-6 bg-blue-600 text-white font-semibold"
          >
            Order Now
          </Link>
        </div>
        <img
          src={burger}
          alt="image"
          height={800}
          width={800}
          className="max-h-[50vh] w-auto md:max-h-full"
        />
      </div>
    </div>
  );
}

export default FeaturedItem;
