import { Bars } from "react-loader-spinner";

const Loader = () => {
	return (
		<div className="center">
			<Bars color="#946687" height={100} width={100} timeout={500} />
		</div>
	);
};

export default Loader;
