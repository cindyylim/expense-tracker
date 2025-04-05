import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { useQuery } from "@apollo/client";
import LoadingSpinner from "./LoadingSpinner";

const Cards = () => {
    const {data, loading, error} = useQuery(GET_TRANSACTIONS);
    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error: {error.message}</p>;

    return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
            {!loading && data.transactions.map(transaction => (
                <Card key={transaction._id} transaction={transaction} />
            ))}
            {!loading && data.transactions.length === 0 && (
                <p className="text-center text-gray-500">No transactions yet</p>
            )}
			</div>
		</div>
	);
};
export default Cards;