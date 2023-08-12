import {SpinOptions} from "../App";

const Modal = ({selectedIndex, selected}: any) => {
  console.log(selected, selectedIndex);
  const spin_index = SpinOptions.filter((_, index) => selectedIndex === index);
  console.log(spin_index);
  return (
    <div className="modal">
      <h2>Modal</h2>
      {/* {selectedIndex ?? selectedIndex} */}
      <p>You have won {spin_index[0]?.price}</p>
    </div>
  );
};

export default Modal;
