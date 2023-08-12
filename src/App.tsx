/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import {useEffect, useRef, useState} from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./App.scss";
import Modal from "./components/Modal";

export const SpinOptions = [
  {
    id: 1,
    price: "1000",
  },
  {
    id: 2,
    price: "50 ",
  },
  {
    id: 3,
    price: "5,000",
  },
  {
    id: 4,
    price: "10,000",
  },
  {
    id: 5,
    price: "20,000",
  },
  {
    id: 6,
    price: "100",
  },
  {
    id: 7,
    price: "50,000",
  },
  {
    id: 8,
    price: "100,000",
  },
  {
    id: 9,
    price: "250,000",
  },
  {
    id: 10,
    price: "500,000",
  },
  {
    id: 11,
    price: "200 ",
  },
  {
    id: 12,
    price: "1,000,000",
  },
];

function App() {
  const wheelRef: any = useRef();
  const markerRef: any = useRef(null);
  const elementsRef: any = useRef([]);
  const modalRef: any = useRef(null);
  const modalOverlayRef: any = useRef(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedElementIndex, setSelectedElementIndex] = useState<
    number | null
  >(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  let number = Math.ceil(Math.random() * 10000);
  let selected: any = null;
  let selectedIndex: any = null;

  const handleSpin = async () => {
    wheelRef.current.style.transform = "rotate(" + number + "deg)";
    number += Math.ceil(Math.random() * 10000);
    setTimeout(() => {
      const markerRect = markerRef.current.getBoundingClientRect();

      elementsRef.current.forEach((element: any, index: number) => {
        const elementRect = element.getBoundingClientRect();
        const elementCenterY =
          (elementRect.top +
            elementRect.bottom +
            elementRect.left +
            elementRect.right) /
          4;
        //   console.log(elementRect, elementCenterY);
        // console.log(index, elementRect, elementCenterY, index);

        // Check if the element's center aligns with the marker's region
        if (
          Math.round(elementRect.bottom) >= 300 &&
          Math.round(elementRect.bottom) <= 325 &&
          Math.round(elementCenterY) >= 199 &&
          Math.round(elementCenterY) <= 220
        ) {
          selected = element;
          selectedIndex = index;
        }
      });
    }, 10500);
    setTimeout(() => {
      setSelectedElementIndex(selectedIndex);
      setSelectedElement(selected);
    }, 11000);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 11500);
  };

  const handleClickOutside = (event: any) => {
    if (
      modalRef.current &&
      modalOverlayRef.current &&
      modalOverlayRef.current.contains(event.target) &&
      !modalRef.current.contains(event.target)
    ) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="main-container">
      <div className="container">
        <div className="win-container">
          <div className="win-block">
            <div className="win-box">
              <p>lucky spin!</p>
              <div className="win-icon">
                <img src="/icons/ship-wheel.png" alt="" />
              </div>
            </div>
            <div className="win-box">
              <p>
                <span>super</span> spin!
              </p>
              <div className="win-icon">
                <img src="/icons/ship-wheel.png" alt="" />
              </div>
            </div>
            <div className="win-box">
              <p>mega spin!</p>
              <div className="win-icon">
                <img src="/icons/ship-wheel.png" alt="" />
              </div>
            </div>
            <div className="win-box">
              <div className="gold-bar">Gold</div>
              <div className="lev">level 22 or above</div>
            </div>
          </div>
        </div>
        {/* {isModalOpen && <Modal />} */}
        <div
          ref={modalOverlayRef}
          className={`modal-container ${isModalOpen ? "active" : ""}`}
        >
          <div ref={modalRef}>
            <Modal
              selected={selectedElement}
              selectedIndex={selectedElementIndex}
            />
          </div>
        </div>
        <div className={`wheel-block`}>
          <div className={`mid-wheel`}>
            <p className="">SPIN </p>
            {/* <p className="text-shadows">WHEEL</p> */}
          </div>
          <div className="out-bulb" ref={markerRef}></div>
          <div className="wheel-box">
            <ul ref={wheelRef} className={`wheel`}>
              {SpinOptions.map((option, index) => (
                <li
                  key={option.id}
                  ref={(el) => (elementsRef.current[index] = el)}
                  className="spin-option"
                >
                  <div className="wheel-shadows" />
                  <div className="wheel-glow" />
                  <div className="text" spellCheck={false}>
                    {option.price}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="banner-block">
          <div className="banner-left"></div>
          <div className="banner-right"></div>
          <div className="banner-box">
            <div className="spin-ect">
              <p className="text">Super win</p>
              <p>spin now</p>
            </div>
            <div className="btc">3BTC</div>
          </div>
        </div>
        <div className="btn-block">
          <button className="btn " onClick={handleSpin}>
            <p className="text-shadows">LUCKY SPIN</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
