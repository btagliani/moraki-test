import React from "react";
import Dashboard from "./Dashboard";

const Home = ({ name, accounts, withdrawals, errors }) => {
  return (
    <Dashboard
      name={name}
      accounts={accounts}
      withdrawals={withdrawals}
      errors={errors}
    />
  );
};

export default Home;
