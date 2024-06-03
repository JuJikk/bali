import dynamic from "next/dynamic";
import "chart.js/auto";
import { ScriptableContext, Tooltip } from "chart.js/auto";
import { useState } from "react";

const mockData = [
  {
    title: "Pesimistic",
    annualRevenue: 50000,
    occupancy: 70,
    nightlyRate: 150,
    monthlyExpences: 2000,
    roi: 0.08,
    annualProfit: 20000,
    estimatePassiveIncome: 30000,
    breakevenYears: 5,
  },
  {
    title: "Realistic",
    annualRevenue: 75000,
    occupancy: 80,
    nightlyRate: 200,
    monthlyExpences: 2500,
    roi: 0.1,
    annualProfit: 30000,
    estimatePassiveIncome: 45000,
    breakevenYears: 4,
  },
  {
    title: "Optimistic",
    annualRevenue: 100000,
    occupancy: 90,
    nightlyRate: 250,
    monthlyExpences: 3000,
    roi: 0.12,
    annualProfit: 40000,
    estimatePassiveIncome: 60000,
    breakevenYears: 3,
  },
];

function TableChart() {
  const [currentColumn, setCurrentColumn] = useState<number>(0);

  return (
    <>
      <div className="lg:flex hidden flex-col gap-y-8">
        <table className="tableChart">
          <tbody>
            <tr>
              <td className="leftSide" style={{ border: "none" }}></td>
              <td className="topleft">PESSIMISTIC</td>
              <td className="topleft">REALISTIC</td>
              <td className="topleft">OPTIMISTIC</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Annual revenue</td>
              <td className="middlegray">${mockData[0].annualRevenue}</td>
              <td className="middlegray">${mockData[1].annualRevenue}</td>
              <td className="middlegray">${mockData[2].annualRevenue}</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Occupancy</td>
              <td>${mockData[0].occupancy}</td>
              <td>${mockData[1].occupancy}</td>
              <td>${mockData[2].occupancy}</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Nightly Rate</td>
              <td>${mockData[0].nightlyRate}</td>
              <td>${mockData[1].nightlyRate}</td>
              <td>${mockData[2].nightlyRate}</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Monthly Expenses</td>
              <td>${mockData[0].monthlyExpences}</td>
              <td>${mockData[1].monthlyExpences}</td>
              <td>${mockData[2].monthlyExpences}</td>
            </tr>
          </tbody>
        </table>

        <table className="tableChart">
          <tbody>
            <tr>
              <td className="topgray leftSide">ROI</td>
              <td className="topgray">{mockData[0].roi}%</td>
              <td className="topgray">{mockData[1].roi}%</td>
              <td className="topgray">{mockData[2].roi}%</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Annual revenue</td>
              <td className="middlegray">${mockData[0].annualProfit}</td>
              <td className="middlegray">${mockData[0].annualProfit}</td>
              <td className="middlegray">${mockData[0].annualProfit}</td>
            </tr>
            <tr>
              <td className="topleft leftSide">
                Estimated Passive income in 30 years
              </td>
              <td className="middlegray">
                ${mockData[0].estimatePassiveIncome}
              </td>
              <td className="middlegray">
                ${mockData[1].estimatePassiveIncome}
              </td>
              <td className="middlegray">
                ${mockData[2].estimatePassiveIncome}
              </td>
            </tr>
            <tr>
              <td className="topleft leftSide">Annual revenue</td>
              <td className="middlegray">${mockData[0].annualRevenue}</td>
              <td className="middlegray">${mockData[1].annualRevenue}</td>
              <td className="middlegray">${mockData[2].annualRevenue}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex lg:hidden flex-col gap-y-8">
        <div className="flex gap-x-4">
          {mockData.map((el: any, index: number) => (
            <button
              onClick={() => setCurrentColumn(index)}
              className={`cursor-pointer flex pb-3  border-grays-400 text-grays-500 ${
                index === currentColumn ? "border-b-2 text-grays-800" : ""
              }`}
              key={`CHTEB_${index}`}
            >
              {el.title}
            </button>
          ))}
        </div>

        <table className="tableChart">
          <tbody>
            <tr>
              <td className="leftSide" style={{ border: "none" }}></td>
              <td className="topleft">
                {mockData[currentColumn].title.toUpperCase()}
              </td>
            </tr>
            <tr>
              <td className="topleft leftSide">Annual revenue</td>
              <td className="middlegray">
                ${mockData[currentColumn].annualRevenue}
              </td>
            </tr>
            <tr>
              <td className="topleft leftSide">Occupancy</td>
              <td>${mockData[currentColumn].occupancy}</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Nightly Rate</td>
              <td>${mockData[currentColumn].nightlyRate}</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Monthly Expenses</td>
              <td>${mockData[currentColumn].monthlyExpences}</td>
            </tr>
          </tbody>
        </table>

        <table className="tableChart">
          <tbody>
            <tr>
              <td className="topgray leftSide">ROI</td>
              <td className="topgray">{mockData[currentColumn].roi}%</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Annual revenue</td>
              <td className="middlegray">
                ${mockData[currentColumn].annualProfit}
              </td>
            </tr>
            <tr>
              <td className="topleft leftSide">
                Estimated Passive income in 30 years
              </td>
              <td className="middlegray">
                ${mockData[currentColumn].estimatePassiveIncome}
              </td>
            </tr>
            <tr>
              <td className="topleft leftSide">Annual revenue</td>
              <td className="middlegray">
                ${mockData[currentColumn].annualRevenue}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableChart;
