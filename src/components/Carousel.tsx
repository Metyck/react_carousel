import React, { useState } from 'react';
import './Carousel.scss';

type CarouselType = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}: CarouselType) => {
  const [currItemWidth, setItemWidth] = useState<number>(itemWidth);
  const [currStep, setStep] = useState<number>(step * currItemWidth);
  const [currX, setCurrX] = useState<number>(-40);
  const [currMoves, setCurrMoves] = useState<number>(0);
  const [currFrameSize, setFrameSize] = useState<number>(frameSize);
  const [currFrameSizePx, setFrameSizePx] = useState(
    currFrameSize * currItemWidth - 40,
  );
  const [currAnimationDuration, setAnimationDuration] =
    useState(animationDuration);
  const [lastMove, setLastMove] = useState(
    Math.floor((images.length - 1) / step),
  );

  function frameSizeSetter(
    size: number,
    actualItemWidth: number = currItemWidth,
  ) {
    const resSize = size * actualItemWidth - 40;

    setFrameSize(size);
    setFrameSizePx(resSize);
  }

  function stepSetter(size: number, actualItemWidth: number = currItemWidth) {
    const newLastMove = Math.floor((images.length - 1) / size);

    setStep(size * actualItemWidth);
    setLastMove(newLastMove);
    setCurrMoves(0);
    setCurrX(-40);
  }

  function itemWidthSetter(width: number) {
    const currStepSize = currStep / currItemWidth;

    frameSizeSetter(currFrameSize, width);
    setItemWidth(width);
    stepSetter(currStepSize, width);
  }

  return (
    <div className="Carousel">
      <div className="Carousel__inputs">
        <input
          type="number"
          className="Carousel__input"
          onChange={ev => {
            const val = ev.target.value;

            if (val.length > 0) {
              itemWidthSetter(+val);
            } else {
              itemWidthSetter(itemWidth);
            }
          }}
        />

        <input
          type="number"
          className="Carousel__input"
          onChange={ev => {
            const val = ev.target.value;

            if (val.length > 0) {
              frameSizeSetter(+val);
            } else {
              frameSizeSetter(frameSize);
            }
          }}
        />

        <input
          type="number"
          className="Carousel__input"
          onChange={ev => {
            const val = ev.target.value;

            if (val.length > 0) {
              stepSetter(+val);
            } else {
              stepSetter(step);
            }
          }}
        />

        <input
          type="number"
          className="Carousel__input"
          onChange={ev => {
            const val = ev.target.value;

            if (val.length > 0) {
              setAnimationDuration(+val);
            } else {
              setAnimationDuration(animationDuration);
            }
          }}
        />
      </div>

      <ul
        className="Carousel__list"
        style={{ width: `${currFrameSizePx}px`, height: `${currItemWidth}px` }}
      >
        {images.map(image => (
          <li
            className="image-wrapper"
            key={image.replace(/\D/g, '')}
            style={{
              width: `${currItemWidth}px`,
              transform: `translateX(${currX}px)`,
              transition: `transform ${currAnimationDuration}ms`,
            }}
          >
            <img src={image} alt={image.replace(/\D/g, '')} className="image" />
          </li>
        ))}
      </ul>

      <button
        disabled={currMoves === 0}
        type="button"
        onClick={() => {
          setCurrX(currX + currStep);
          setCurrMoves(currMoves - 1);
        }}
      >
        Prev
      </button>
      <button
        disabled={currMoves >= lastMove}
        type="button"
        onClick={() => {
          setCurrX(currX + currStep * -1);
          setCurrMoves(currMoves + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
