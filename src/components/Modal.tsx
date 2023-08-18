import {SpinOptions} from "../App";

const Modal = ({selectedIndex}: any) => {
  const spin_index = SpinOptions.filter((_, index) => selectedIndex === index);
  return (
    <div className="modal">
      <h2>PRIZE!!</h2>
      {/* {selectedIndex ?? selectedIndex} */}
      <p>You have won {spin_index[0]?.price}</p>
    </div>
  );
};

export default Modal;
