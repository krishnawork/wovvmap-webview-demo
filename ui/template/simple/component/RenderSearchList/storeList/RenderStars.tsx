import { FaStarHalf } from "react-icons/fa";

import { FaStar } from "react-icons/fa";


export function RenderStars(rating: number) {
  const stars = [];
  const fullCount = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const totalStars = 5;

  for (let i = 0; i < fullCount; i++) {
    // stars.push(<img key={`full-${i}`} src={fullStar} alt="★" className="w-3 h-3 inline-block" />);
    stars.push(<FaStar key={`full-${i}`} />);
  }

  if (hasHalf) {
    // stars.push(<img key="half" src={halfStar} alt="½" className="w-3 h-3 inline-block" />);
    stars.push(<FaStarHalf key="half" />);
  }

  const remaining = totalStars - fullCount - (hasHalf ? 1 : 0);
  for (let i = 0; i < remaining; i++) {
    // stars.push(<img key={`empty-${i}`} src={fullStar} alt="☆" className="w-3 h-3 opacity-20 inline-block" />);
    stars.push(<FaStar key={`empty-${i}`}  />);
  }

  return stars;
}
