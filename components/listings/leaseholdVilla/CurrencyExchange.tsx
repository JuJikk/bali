import React, { FC, useEffect, useState } from "react";

type CurrencyExchangeProps = {
  price: number;
};

const CurrencyExchange: FC<CurrencyExchangeProps> = ({ price }) => {
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<any>(null);
  const formatNumberWithCommas = (value: number) => {
    if (!value) return 0;
    return new Intl.NumberFormat("en-US").format(value);
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/IDR`);
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    if (!showCurrencies || !price) return;
    fetchExchangeRates();
  }, [showCurrencies, price]);

  return (
    <>
      {showCurrencies && exchangeRates && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between body_xs gap-2">
            <span className="text-center">
              {`${formatNumberWithCommas(
                +(price * exchangeRates.USD).toFixed(0)
              )} USD`}
            </span>
            <span className="text-center">
              {`${formatNumberWithCommas(
                +(price * exchangeRates.AUD).toFixed(0)
              )} AUD`}
            </span>
            <span className="text-center">
              {`${formatNumberWithCommas(
                +(price * exchangeRates.EUR).toFixed(0)
              )} EUR`}
            </span>
            <span className="text-center">
              {`${formatNumberWithCommas(
                +(price * exchangeRates.GBP).toFixed(0)
              )} GBP`}
            </span>
          </div>
          <div className="text-center font-hk_light italic text-xs leading-5 text-grays-700 bg-grays-25 p-3 rounded-xl">
            Calculated automatically based on latest official currency rate.
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={() => setShowCurrencies((prev) => !prev)}
          type="button"
          className="font-hk_light italic underline text-xs leading-5"
        >
          {!showCurrencies
            ? "See approx. price in other currencies >"
            : "Hide other currencies"}
        </button>
      </div>
    </>
  );
};

export default CurrencyExchange;
