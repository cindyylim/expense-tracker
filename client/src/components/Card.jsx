import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { toast } from "react-hot-toast";

const categoryColorMap = {
  income: "from-lime-700 to-lime-400",
  expense: "from-yellow-600 to-yellow-400",
};

const Card = ({ transaction }) => {
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetTransactions"],
  });
  let { category, amount, date, paymentType, description } = transaction;
  const cardClass = categoryColorMap[category];

  description = description[0].toUpperCase() + description.slice(1);
  category = category[0].toUpperCase() + category.slice(1);
  paymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);

  const formattedDate = formatDate(date);

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: { transactionId: transaction._id },
      });
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Error deleting transaction");
    }
  };

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold">Category: {category}</h2>
          <div className="flex items-center gap-2">
            {!loading && (
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            )}
            {loading && (
              <div className="flex justify-center items-center space-x-2">
                <div className="w-5 h-5 rounded-full animate-spin border-2 border-t-2 border-gray-200 border-t-yellow-500"></div>
                <div className="sr-only">Loading</div>
              </div>
            )}
            <Link to={`/transaction/${transaction._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="flex items-center gap-1">
          <BsCardText />
          Description: {description}
        </p>
        <p className="flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: {paymentType}
        </p>
        <p className="flex items-center gap-1">
          <FaSackDollar />
          Amount: ${amount}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs font-bold">{formattedDate}</p>
          <img src={""} className="h-8 w-8 border rounded-full" alt="Avatar" />
        </div>
      </div>
    </div>
  );
};
export default Card;
