/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import {useEffect, useRef, useState} from "react";
import "./App.scss";
import Modal from "./components/Modal";

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
};
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
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSpinningTrans, setIsSpinningTrans] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  //   let number = Math.ceil(Math.random() * 10000);
  const $200SArray = [3290, 3300, 3310, 2950, 2940, 2930, 1860, 1850, 1870];
  const $100SArray = [3440, 3450, 3460, 3100, 3090, 3080, 2380, 2370, 2360];
  const $50SArray = [3560, 3570, 3580, 3220, 3210, 3200, 2860, 2850, 2840];
  const [$200S, set$200S] = useState($200SArray);
  const [$100S, set$100S] = useState($100SArray);
  const [$50S, set$50S] = useState($50SArray);
  const [Spins_for_200, setSpins_for_200] = useState(100);
  const [Spins_for_100, setSpins_for_100] = useState(200);
  const [Spins_for_50, setSpins_for_50] = useState(700);
  const options = [...$200S, ...$100S, ...$50S];
  shuffleArray(options);

  const randomIndex = Math.floor(Math.random() * options.length);
  const randomOption = options[randomIndex];

  const handleSpin = async () => {
    setIsSpinningTrans(true);

    let selected: any = null;
    let selectedIndex: any = null;
    // wheelRef.current.style.transform = "rotate(" + number + "deg)";
    const targetRotation = 3600; /* calculate target rotation */
    const spinDuration = 4000; /* set animation duration */

    // number += Math.ceil(Math.random() * 10000);
    if (!isSpinning) {
      setIsSpinning(true);

      // Simulate wheel spinning animation
      let currentRotation = rotation;
      const spinInterval = setInterval(() => {
        currentRotation += 10; // Incremental rotation step
        setRotation(currentRotation);

        if (currentRotation >= targetRotation) {
          currentRotation = randomOption;

          setRotation(currentRotation);

          setIsSpinning(false);
          clearInterval(spinInterval);
          //   setRotation(0);
        }
      }, spinDuration / (targetRotation / 10));
      //   }, 1000);
      //   setTimeout(() => {}, 11100);
    }

    setTimeout(() => {
      //   const markerRect = markerRef.current.getBoundingClientRect();

      elementsRef.current.forEach((element: any, index: number) => {
        const elementRect = element.getBoundingClientRect();
        const elementCenter =
          (Math.round(elementRect.left) * 2 +
            Math.round(elementRect.right) * 2 +
            (Math.round(elementRect.top) * 2 +
              Math.round(elementRect.bottom) * 2)) /
          32;

        const elementCenterY =
          (elementRect.top +
            elementRect.bottom +
            elementRect.left +
            elementRect.right) /
          4;
        // console.log(
        //   index + 1,
        //   elementCenterY,
        //   elementRect.bottom,
        //   elementCenter,
        //   Math.round(elementCenter),
        //   index + 1
        //   //   elementRect
        // );

        if (
          Math.round(elementRect.bottom) >= 397 &&
          Math.round(elementRect.bottom) <= 415 &&
          elementCenter <= 66.5 &&
          elementCenter >= 60.5 &&
          Math.round(elementCenterY) >= 245 &&
          Math.round(elementCenterY) <= 266
        ) {
          selected = element;
          selectedIndex = index;
        }
      });
    }, 7000);

    setTimeout(() => {
      setSelectedElementIndex(selectedIndex);
      setSelectedElement(selected);
      for (const number of $200S) {
        if (number === randomOption) {
          setSpins_for_200((prev) => prev - 1);
          console.log(`Decrementing Spins_for_200 to ${Spins_for_200}`);
          break; // Break the loop since the number was found
        }
      }

      // Loop through $100S array
      for (const number of $100S) {
        if (number === randomOption) {
          setSpins_for_100((prev) => prev - 1);
          console.log(`Decrementing Spins_for_100 to ${Spins_for_100}`);
          break;
        }
      }

      // Loop through $50S array
      for (const number of $50S) {
        if (number === randomOption) {
          setSpins_for_50((prev) => prev - 1);
          console.log(`Decrementing Spins_for_50 to ${Spins_for_50}`);
          break;
        }
      }
    }, 8000);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 8500);
  };

  const handleClickOutside = (event: any) => {
    if (
      modalRef.current &&
      modalOverlayRef.current &&
      modalOverlayRef.current.contains(event.target) &&
      !modalRef.current.contains(event.target)
    ) {
      setRotation(0);
      setIsSpinningTrans(false);
      setTimeout(() => setIsModalOpen(false), 100);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (Spins_for_200 === 0) {
      set$200S([]);
    }
    if (Spins_for_100 === 0) {
      set$100S([]);
    }
    if (Spins_for_50 === 0) {
      set$50S([]);
    }
  }, [Spins_for_50, Spins_for_100, Spins_for_200]);

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
            {isModalOpen && (
              <Modal
                selected={selectedElement}
                selectedIndex={selectedElementIndex}
              />
            )}
          </div>
        </div>
        <div className={`wheel-block`}>
          <button
            disabled={isSpinningTrans}
            className={`mid-wheel`}
            onClick={handleSpin}
          >
            <p className="">SPIN </p>
            {/* <p className="text-shadows">WHEEL</p> */}
          </button>
          <div className="out-bulb" ref={markerRef}></div>
          <div className="wheel-box">
            <ul
              ref={wheelRef}
              className={`wheel`}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinningTrans ? "3000ms ease" : "0ms ",
              }}
            >
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
          <button
            className="btn "
            disabled={isSpinningTrans}
            onClick={handleSpin}
          >
            <p className="text-shadows">LUCKY SPIN</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
