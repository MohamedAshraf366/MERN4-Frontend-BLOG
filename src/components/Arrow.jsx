import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} !right-10  z-10`} onClick={onClick}>
      <FaArrowRight size={50} className="text-yellow-400" />
    </div>
  );
}

export function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} !left-5 z-10`} onClick={onClick}>
      <FaArrowLeft size={50} className="text-yellow-400" />
    </div>
  );
}
