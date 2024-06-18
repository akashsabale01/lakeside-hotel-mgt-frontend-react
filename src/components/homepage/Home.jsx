import MainHeader from './MainHeader';
import Parallax from './Parallax';
import HotelService from './HotelService';

const Home = ({user}) => {

	console.log("User in Home ->", user);

	return (
		<section>

			<MainHeader />

			<div className="container">
				<Parallax />
					<HotelService />
				<Parallax />
			</div>

		</section>
	)
}


export default Home;
