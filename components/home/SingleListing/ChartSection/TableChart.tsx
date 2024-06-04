import "chart.js/auto";
import {FC, useState} from "react";
import {Revenue} from "@/models/basic";

type PropertyProps = {
  revenue: Revenue[];
  title: string;
};

const TableChart: FC<PropertyProps> = ({revenue, title}) => {
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
              <td className="middlegray">${revenue[0].annualRevenue}</td>
              <td className="middlegray">${revenue[1].annualRevenue}</td>
              <td className="middlegray">${revenue[2].annualRevenue}</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Occupancy</td>
              <td>${revenue[0].occupancy}</td>
              <td>${revenue[1].occupancy}</td>
              <td>${revenue[2].occupancy}</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Nightly Rate</td>
              <td>${revenue[0].nightlyRate}</td>
              <td>${revenue[1].nightlyRate}</td>
              <td>${revenue[2].nightlyRate}</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Monthly Expenses</td>
              <td>${revenue[0].monthlyExpenses}</td>
              <td>${revenue[1].monthlyExpenses}</td>
              <td>${revenue[2].monthlyExpenses}</td>
            </tr>
          </tbody>
        </table>

        <table className="tableChart">
          <tbody>
            <tr>
              <td className="topgray leftSide">ROI</td>
              <td className="topgray">{revenue[0].roi}%</td>
              <td className="topgray">{revenue[1].roi}%</td>
              <td className="topgray">{revenue[2].roi}%</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Annual revenue</td>
              <td className="middlegray">${revenue[0].annualProfit}</td>
              <td className="middlegray">${revenue[0].annualProfit}</td>
              <td className="middlegray">${revenue[0].annualProfit}</td>
            </tr>
            <tr>
              <td className="topleft leftSide">
                Estimated Passive income in 30 years
              </td>
              <td className="middlegray">
                ${revenue[0].passiveIn30Years}
              </td>
              <td className="middlegray">
                ${revenue[1].passiveIn30Years}
              </td>
              <td className="middlegray">
                ${revenue[2].passiveIn30Years}
              </td>
            </tr>
            <tr>
              <td className="topleft leftSide">Annual revenue</td>
              <td className="middlegray">${revenue[0].annualRevenue}</td>
              <td className="middlegray">${revenue[1].annualRevenue}</td>
              <td className="middlegray">${revenue[2].annualRevenue}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex lg:hidden flex-col gap-y-8">
        <div className="flex gap-x-4">
          {revenue.map((el: any, index: number) => (
            <button
              onClick={() => setCurrentColumn(index)}
              className={`cursor-pointer flex pb-3  border-grays-400 text-grays-500 ${
                index === currentColumn ? "border-b-2 text-grays-800" : ""
              }`}
              key={`CHTEB_${index}`}
            >
              {el.roiType}
            </button>
          ))}
        </div>

        <table className="tableChart">
          <tbody>
            <tr>
              <td className="topleft leftSide">Annual revenue</td>
              <td className="middlegray">
                ${revenue[currentColumn].annualRevenue}
              </td>
            </tr>
            <tr>
              <td className="topleft leftSide">Occupancy</td>
              <td>${revenue[currentColumn].occupancy}</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Nightly Rate</td>
              <td>${revenue[currentColumn].nightlyRate}</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Monthly Expenses</td>
              <td>${revenue[currentColumn].monthlyExpenses}</td>
            </tr>
          </tbody>
        </table>

        <table className="tableChart">
          <tbody>
            <tr>
              <td className="topgray leftSide">ROI</td>
              <td className="topgray">{revenue[currentColumn].roi}%</td>
            </tr>
            <tr>
              <td className="topleft leftSide">Annual revenue</td>
              <td className="middlegray">
                ${revenue[currentColumn].annualProfit}
              </td>
            </tr>
            <tr>
              <td className="topleft leftSide">
                Estimated Passive income in 30 years
              </td>
              <td className="middlegray">
                ${revenue[currentColumn].passiveIn30Years}
              </td>
            </tr>
            <tr>
              <td className="topleft leftSide">Annual revenue</td>
              <td className="middlegray">
                ${revenue[currentColumn].annualRevenue}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableChart;
