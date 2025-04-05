import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { MdLogout } from "react-icons/md";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { GET_CATEGORY_STATISTICS } from "../graphql/queries/transaction.query";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: "$",
				data: [],
				backgroundColor: [],
				borderColor: [],
				borderWidth: 1,
				borderRadius: 0,
				spacing: 0,
				cutout: 100,
			},
		],
	});

	const [logout, { loading, client}] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"],
	});
    const {data} = useQuery(GET_CATEGORY_STATISTICS);
    const {data: authData} = useQuery(GET_AUTHENTICATED_USER);

    useEffect(() => {
        if (data?.categoryStatistics) {
            const categories = data.categoryStatistics.map((item) => item.category);
            const amounts = data.categoryStatistics.map((item) => item.amount);
            const backgroundColors = []
            const borderColors = [];
            categories.forEach((category) => {
                if (category === "income") {
                    backgroundColors.push("rgba(151, 210, 168)");
                    borderColors.push("rgba(151, 210, 168)");
                } else {
                    backgroundColors.push("rgba(236, 213, 10)");
                    borderColors.push("rgba(236, 213, 10)");
                }
            })
         setChartData(prev => ({labels: categories, datasets:[{...prev.datasets[0], data: amounts, backgroundColor: backgroundColors, borderColor: borderColors}]}))
        }
    }, [data]);
    
	const handleLogout = async() => {
		try {
            await logout();
            client.resetStore();
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error(error.message || "Internal server error");
        }
	};

	return (
		<>
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-start'>
					<img
						src={authData?.authUser?.profilePicture}
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