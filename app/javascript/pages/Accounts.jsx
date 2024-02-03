import React from "react";
import AccountDialog from "./AccountDialog";
import AccountsTable from "./AccountTable";

const Accounts = ({ accounts }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Bank Accounts</h2>
        <AccountDialog />
      </div>
      <AccountsTable accounts={accounts} />
    </main>
  );
}

export default Accounts;
