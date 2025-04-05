const TransactionForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const transactionData = {
      description: formData.get("description"),
      paymentType: formData.get("paymentType"),
      category: formData.get("category"),
      amount: parseFloat(formData.get("amount")),
      date: formData.get("date"),
    };
    console.log("transactionData", transactionData);
  };

  return (
    <form
      className="w-full max-w-lg flex flex-col gap-3 px-3"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap">
        <div className="w-full">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="description"
          >
            Transaction
          </label>
          <input
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description"
            name="description"
            type="text"
            required
            placeholder="Rent, Groceries, Salary, etc."
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="w-full flex-1">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="paymentType"
          >
            Payment Type
          </label>
          <div className="relative">
            <select
              className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:bg-white focus:border-gray-500"
              id="paymentType"
              name="paymentType"
            >
              <option value={"card"}>Card</option>
              <option value={"cash"}>Cash</option>
            </select>
          </div>
        </div>

        <div className="w-full flex-1">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <div className="relative">
            <select
              className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="category"
              name="category"
            >
              <option value={"income"}>Income</option>
              <option value={"expense"}>Expense</option>
            </select>
          </div>
        </div>

        <div className="w-full flex-1">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="amount"
          >
            Amount($)
          </label>
          <input
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="amount"
            name="amount"
            type="number"
            placeholder="0"
          />
        </div>
      </div>

      <div className="w-full flex-1">
        <label
          className="block uppercase tracking-wide text-xs font-bold mb-2"
          htmlFor="date"
        >
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className="block w-full bg-gray-200 text-gray-700 border rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white"
          placeholder="Select date"
        />
      </div>
      <button
        className="font-bold w-full rounded px-4 py-2 bg-blue-500 hover:bg-blue-700
						disabled:opacity-70 disabled:cursor-not-allowed"
        type="submit"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
