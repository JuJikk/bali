import BillingDetailsForm, {
  CountryData,
} from "@/components/auth/BillingDetailsForm";
import React from "react";

const fetchCountries = async (): Promise<CountryData[]> => {
  const response = await fetch("https://countriesnow.space/api/v0.1/countries");
  const data = await response.json();
  return data.data as CountryData[];
};

const page = async () => {
  const countries = await fetchCountries();

  return <BillingDetailsForm countries={countries} />;
};

export default page;
