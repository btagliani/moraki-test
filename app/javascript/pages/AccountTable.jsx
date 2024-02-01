import React, { useState } from "react";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "../components/ui/table";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "../components/ui/dropdown-menu"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogClose } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Inertia } from "@inertiajs/inertia";

const AccountsTable = ({ accounts }) => {
  const [formData, setFormData] = useState({
    id: '',
    bank_id: '',
    number: '',
    balance: '',
    is_default: false,
    name: '',
  });

  const setData = (account) => {
    setFormData({
      id: account.id,
      bank_id: account.bank_id,
      number: account.number,
      balance: account.balance,
      is_default: account.is_default,
      name: account.name,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = (account) => {
    Inertia.delete(`/accounts/${account.id}`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    Inertia.put(`/accounts/${formData.id}`, formData);
  };

  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell">Default</TableHead>
            <TableHead className="hidden md:table-cell">Account</TableHead>
            <TableHead className="hidden md:table-cell">Name</TableHead>
            <TableHead className="hidden md:table-cell">Balance</TableHead>
            <TableHead className="hidden md:table-cell">Bank Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="hidden md:table-cell font-medium">{account.is_default ? "Yes" : "No"}</TableCell>
              <TableCell className="hidden md:table-cell">{account.number}</TableCell>
              <TableCell className="hidden md:table-cell">{account.name}</TableCell>
              <TableCell className="hidden md:table-cell">{account.balance}</TableCell>
              <TableCell className="hidden md:table-cell">{account.bank_name}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DialogTrigger asChild>
                        <DropdownMenuItem as="button" onClick={() => setData(account)}>Edit</DropdownMenuItem>
                      </DialogTrigger>
                      <DropdownMenuItem as="button" onClick={() => handleDelete(account)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DialogContent>
                    <DialogHeader>Edit Account</DialogHeader>
                    <div>
                      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                          className="w-full"
                          placeholder="Bank ID"
                          type="text"
                          name="bank_id"
                          value={formData.bank_name}
                          onChange={handleChange}
                        />
                        <Input
                          className="w-full"
                          placeholder="Account Number"
                          type="text"
                          name="number"
                          value={formData.number}
                          onChange={handleChange}
                        />
                        <Input
                          className="w-full"
                          placeholder="Balance"
                          type="text"
                          name="balance"
                          value={formData.balance}
                          onChange={handleChange}
                        />
                        <Input
                          className="w-full"
                          placeholder="Account Name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <Input
                          className="w-full"
                          placeholder="Default"
                          type="boolean"
                          name="is_default"
                          value={formData.is_default}
                          onChange={handleChange}
                        />
                        <DialogClose asChild>
                          <Button type="submit" className="w-full" size="sm">Submit</Button>
                        </DialogClose>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

function MoreHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}

export default AccountsTable;
