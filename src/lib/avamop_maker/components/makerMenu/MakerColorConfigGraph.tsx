import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Slider from "react-slider";
import Draggable from "react-draggable";

const ChartComponent: React.FC = () => {
  const [baseValue, setBaseValue] = useState(1);
  const [values, setValues] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const handleSliderChange = (value: number) => {
    setBaseValue(value);
  };

  const handleDrag = (e: any, ui: any, index: number) => {
    const newValues = [...values];
    const newValue = values[index] + ui.deltaY / 10;
    if (index > 0 && index < values.length - 1) {
      if (newValue > values[index - 1] && newValue < values[index + 1]) {
        newValues[index] = newValue;
      }
    } else if (index === 0 && newValue < values[index + 1]) {
      newValues[index] = newValue;
    } else if (index === values.length - 1 && newValue > values[index - 1]) {
      newValues[index] = newValue;
    }
    setValues(newValues);
  };

  const data = values.map((v, i) => i * baseValue + v);

  return (
    <div>
      <Line
        data={{
          labels: data.map((_, i) => i.toString()),
          datasets: [
            {
              label: "My Dataset",
              data: data,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        }}
      />
      <Slider min={0} max={10} step={0.1} onChange={handleSliderChange} />
      {values.map((v, i) => (
        <Draggable
          key={i}
          axis="y"
          defaultPosition={{ x: 0, y: 0 }}
          onDrag={(e, ui) => handleDrag(e, ui, i)}
        >
          <div>{v.toFixed(1)}</div>
        </Draggable>
      ))}
    </div>
  );
};

export default ChartComponent;
