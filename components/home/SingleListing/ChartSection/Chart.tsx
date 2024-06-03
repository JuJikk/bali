import dynamic from "next/dynamic";
import "chart.js/auto";
import { ScriptableContext, Tooltip } from "chart.js/auto";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

// Tooltip.positioners!.myCustomPositioner = function (
// 	elements: any,
// 	eventPosition: any
// ) {
// 	// Check if elements array is defined and not empty
// 	// if (elements && elements.length > 0 && elements[0].element) {
// 	// 	return { x: elements[0].element.x, y: elements[0].element.y - 20 };
// 	// } else {
// 	// 	// Fallback position if elements array is empty or undefined
// 	// 	return { x: eventPosition.x, y: eventPosition.y };
// 	// }
// 	return {}
// };

const data = {
  labels: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ],
  datasets: [
    {
      data: [
        275, 308, 347, 392, 443, 500, 563, 632, 707, 788, 875, 968, 1067, 1172,
        1283, 1400, 1523, 1652, 1787, 1928, 2075, 2228, 2387, 2552, 2723, 2900,
        3083, 3272, 3467, 3668,
      ],
      backgroundColor: (context: ScriptableContext<"bar">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0.5, "rgba(131,214,171,1)");
        gradient.addColorStop(1, "rgba(15,166,88,1)");

        return gradient;
      },
      // borderColor: "rgba(91,56,237,255)",
      borderWidth: 0,
    },
  ],
};

const options: any = {
  plugins: {
    // tooltip: {
    // 	position: "myCustomPositioner",
    // 	backgroundColor: "rgb(255, 255, 255)",
    // 	borderColor: "rgb(0, 0, 255)",
    // 	borderWidth: 2,
    // 	borderRadius: 2,
    // 	callbacks: {},
    // },
    tooltip: {
      enabled: false,
      external: function (context: any) {
        let tooltipEl = document.getElementById("chartjs-tooltip");

        if (!tooltipEl) {
          tooltipEl = document.createElement("div");
          tooltipEl.id = "chartjs-tooltip";
          tooltipEl.innerHTML = "<table ></table>";
          document.body.appendChild(tooltipEl);
        }

        const {
          opacity,
          caretX,
          caretY,
          yAlign,
          title,
          body,
          labelColors,
          options: tooltipOptions,
        } = context.tooltip;
        if (opacity === 0) {
          tooltipEl.style.opacity = "0";
          return;
        }

        tooltipEl.classList.remove("above", "below", "no-transform");
        if (yAlign) {
          tooltipEl.classList.add(yAlign);
        } else {
          tooltipEl.classList.add("no-transform");
        }

        function getBody(bodyItem: any) {
          return bodyItem.lines;
        }

        if (body) {
          const titleLines = title || [];
          const bodyLines = body.map(getBody);

          let innerHtml = "<thead id='innerEl'>";

          titleLines.forEach(function (title: any) {
            innerHtml += "<tr><td> Year " + title + "</td></tr>";
          });

          innerHtml += "<tr><td id='passiveIncome'> Passive income </td></tr>";

          innerHtml += "</thead><tbody>";

          bodyLines.forEach(function (body: any, i: any) {
            const colors = labelColors[i];
            // let style = "background:" + colors.backgroundColor;
            // style += "; border-color:" + colors.borderColor;
            // style += "; border-width: 2px";
            const span = "<span>" + body + "</span>";
            innerHtml += "<tr><td> $" + span + "</td></tr>";
          });
          innerHtml += "</tbody>";

          let tableRoot = tooltipEl.querySelector("table");
          if (tableRoot) {
            tableRoot.innerHTML = innerHtml;
          }
        }

        const position = context.chart.canvas.getBoundingClientRect();
        // const bodyFont = Chart.helpers.toFont(tooltipOptions.bodyFont);

        tooltipEl.style.opacity = "1";
        tooltipEl.style.position = "absolute";
        tooltipEl.style.left =
          position.left + window.pageXOffset + caretX - 13 + "px";
        tooltipEl.style.top =
          position.top + window.pageYOffset + caretY - 10 + "px";
        // tooltipEl.style.font = bodyFont.string;
        tooltipEl.style.padding =
          tooltipOptions.padding + "px " + tooltipOptions.padding + "px";
        tooltipEl.style.pointerEvents = "none";
      },
    },
    legend: {
      display: false, // Disable legend
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false, // Disable grid on the x-axis
      },
      title: {
        display: true,
        text: "Years",
        font: {
          weight: 500,
          size: 14,
        },
      },
      ticks: {
        maxRotation: 90,
        stepSize: 5,
        callback: function (value: any, index: number, values: any) {
          // Show tick value only for the first and last ticks
          if (index !== 0 && (index + 1) % 5 === 0) {
            return value + 1;
          } else {
            return ""; // Hide other ticks
          }
        },
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false, // Disable grid on the y-axis
      },
      ticks: {
        autoSkip: false,
        maxTicksLimit: 2,
        callback: function (value: any, index: number, values: any) {
          if (index === 0 || index === values.length - 1) {
            return `$${value}`;
          } else {
            return "";
          }
        },
      },
    },
  },
};

function Chart() {
  return (
    <div className="flex flex-col items-center lg:min-h-[250px] min-h-[150px]">
      <Bar data={data} options={options} />
    </div>
  );
}

export default Chart;
