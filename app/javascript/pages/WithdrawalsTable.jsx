import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "../components/ui/table";

const WithdrawalsTable = ({ withdrawals }) => {
  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell p-2 text-center">
              Amount
            </TableHead>
            <TableHead className="hidden md:table-cell p-2 text-center">
              Account Name
            </TableHead>
            <TableHead className="hidden md:table-cell p-2 text-center">
              Bank Name
            </TableHead>
            <TableHead className="hidden md:table-cell p-2 text-center">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawals.map((withdrawal) => (
            <TableRow key={withdrawal.id}>
              <TableCell className="hidden md:table-cell font-medium p-4 text-center">
                {withdrawal.amount}
              </TableCell>
              <TableCell className="hidden md:table-cell p-4 text-center">
                {withdrawal.account_name}
              </TableCell>
              <TableCell className="hidden md:table-cell p-4 text-center">
                {withdrawal.bank_name}
              </TableCell>
              <TableCell className="hidden md:table-cell p-4 text-center">
                {withdrawal.transaction_date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WithdrawalsTable;
