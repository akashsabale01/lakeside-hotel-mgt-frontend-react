import React from "react"

const MainHeader = () => {
	return (
		<header className="header-banner">
			<div className="overlay"></div>
			<div className="animated-texts overlay-content w-100 text-center">
				<h1 className="display-3">
					Welcome to <span className="hotel-color"> LakeSide Hotel</span>
				</h1>
				<h4 className="p" > Experience the Best Hospitality in Town</h4>
			</div>
		</header>
	)
}

export default MainHeader
