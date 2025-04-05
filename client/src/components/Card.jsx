import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

const categoryColorMap = {
	income: "from-lime-700 to-lime-400",
	expense: "from-yellow-600 to-yellow-400",
};

const Card = ({ cardType }) => {
	const cardClass = categoryColorMap[cardType];

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold'>Income</h2>
					<div className='flex items-center gap-2'>
						<FaTrash className={"cursor-pointer"} />
						<Link to={`/transaction/123`}>
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
					</div>
				</div>
				<p className='flex items-center gap-1'>
					<BsCardText />
					Description: Salary
				</p>
				<p className='flex items-center gap-1'>
					<MdOutlinePayments />
					Payment Type: Cash
				</p>
				<p className='flex items-center gap-1'>
					<FaSackDollar />
					Amount: $150
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xs font-bold'>21 Sep, 2001</p>
					<img
						src={""}
						className='h-8 w-8 border rounded-full'
						alt="Avatar"
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;