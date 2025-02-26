import { useDrinkContext } from "../context/DrinkContext";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cart, removeFromCart } = useDrinkContext();
  console.log(cart);

  return (
    <div className="p-5 bg-gray-800 h-full">
      <h1 className="text-2xl font-bold mb-4 text-neutral-100">Cart</h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>Drink Name</th>
              <th>Quantity</th>
              <th>{""}</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <p>Your cart is empty.</p>
              </tr>
            ) : (
              cart.map((drink) => (
                <tr
                  id={drink.idDrink}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row gap-5"
                  >
                    <img
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      className="size-10 rounded-2xl"
                    />
                    {drink.strDrink}
                  </th>
                  <td className="px-6 py-4">{drink.quantity}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => removeFromCart(drink.idDrink)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xl text-neutral-100 font-semibold mt-3">
        Total Drinks - {cart.length}
      </p>
    </div>
  );
};

export default Cart;
