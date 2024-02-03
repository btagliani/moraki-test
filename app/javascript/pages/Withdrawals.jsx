import React from "react";
import WithdrawalsTable from "./WithdrawalsTable";
import WithdrawalDialog from "./WithdrawalDialog";

const Withdrawals = ({ withdrawals }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Bank Withdrawals</h2>
        <WithdrawalDialog />
      </div>
      <WithdrawalsTable withdrawals={withdrawals} />
    </main>
  );
};

export default Withdrawals;
