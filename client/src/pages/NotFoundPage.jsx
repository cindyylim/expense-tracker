const NotFound = () => {
	return (
		<section>
			<div>
				<div className='flex h-screen'>
					<div className='m-auto text-center'>
						<div>
							<img src='../public/404.png' alt='404' />
						</div>
						<p className='uppercase text-xl md:text-base text-[#F6009B] p-2 mb-4'>
						    Page not found
						</p>
						<a
							href='/'
							className='uppercase text-xl bg-transparent hover:bg-[#F6009B] text-[#F6009B] hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-[#F6009B] hover:border-transparent'
						>
							Take me home
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};
export default NotFound;