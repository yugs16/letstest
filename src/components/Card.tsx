import { useState } from "react";

function Card() {
	const [isClicked, setIsClicked] = useState(false);

	function handleClick() {
		setIsClicked(!isClicked);
	}

	return (
		<div className={`card ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
			<h2>Card Title</h2>
			<p>Card Content</p>
		</div>
	);
}

export default Card;