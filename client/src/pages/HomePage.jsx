import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { MdLogout } from "react-icons/md";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
	const chartData = {
		labels: ["Income", "Expense"],
		datasets: [
			{
				label: "%",
				data: [50, 50],
				backgroundColor: ["rgba(151, 210, 168)", "rgba(236, 213, 10)"],
				borderColor: ["rgba(151, 210, 168)", "rgba(236, 213, 10)"],
				borderWidth: 100,
				borderRadius: 50,
				spacing: 0,
				cutout: 100,
			},
		],
	};

	const handleLogout = () => {
		console.log("Logging out...");
	};

	const loading = false;

	return (
		<>
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-start'>
					<img
						src={""}
						className='w-11 h-11 rounded-full border cursor-pointer'
						alt='Avatar'
					/>
					{!loading && <button className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout}><MdLogout/>Logout</button>}
                    {loading && <LoadingSpinner />}
				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6'>
					<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
						<Doughnut data={chartData} />
					</div>

					<TransactionForm />
				</div>
				<Cards />
			</div>
		</>
	);
};
export default HomePage;