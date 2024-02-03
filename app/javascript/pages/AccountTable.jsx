import React from "react";
import { useForm } from '@inertiajs/inertia-react';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "../components/ui/table";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "../components/ui/dropdown-menu"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogClose } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

const AccountsTable = ({ accounts }) => {
  const { data, setData, put, delete: deleteAccount } = useForm({
    id: '',
    bank_id: '',
    number: '',
    balance: '',
    name: '',
    is_default: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/accounts/${data.id}`, data);
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData(data => ({ ...data, [key]: value }));
  };

  const handleDelete = (account) => {
    deleteAccount(`/accounts/${account.id}`);
  }

  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell text-center">
              Default
            </TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Account
            </TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Name
            </TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Balance
            </TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Bank Name
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="hidden md:table-cell font-medium text-center">
                {account.is_default ? "Yes" : "No"}
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                {account.number}
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                {account.name}
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                {account.balance}
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                {account.bank_name}
              </TableCell>
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
                        <DropdownMenuItem
                          as="button"
                          onClick={() => setData(account)}
                        >
                          Edit
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DropdownMenuItem
                        as="button"
                        onClick={() => handleDelete(account)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DialogContent>
                    <DialogHeader className="font-semibold text-lg md:text-2xl">
                      Edit Account
                    </DialogHeader>
                    <div>
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                      >
                        <Label htmlFor="bank_id"> Bank ID </Label>
                        <Input
                          className="w-full"
                          placeholder="Bank ID"
                          type="text"
                          name="bank_id"
                          value={data.bank_name}
                          onChange={handleChange}
                        />
                        <Label htmlFor="number"> Account Number </Label>
                        <Input
                          className="w-full"
                          placeholder="Account Number"
                          type="text"
                          name="number"
                          value={data.number}
                          onChange={handleChange}
                        />
                        <Label> Balance </Label>
                        <Input
                          className="w-full"
                          placeholder="Balance"
                          type="text"
                          name="balance"
                          value={data.balance}
                          onChange={handleChange}
                        />
                        <Label> Account Name </Label>
                        <Input
                          className="w-full"
                          placeholder="Account Name"
                          type="text"
                          name="name"
                          value={data.name}
                          onChange={handleChange}
                        />
                        <Label
                          htmlFor="is_default"
                          className="flex justify-between"
                        >
                          Default
                        </Label>
                        <Checkbox
                          className="ml-1"
                          checked={data.is_default}
                          name="is_default"
                          onCheckedChange={(e) =>
                            setData({ ...data, is_default: e })
                          }
                        />
                        <DialogClose asChild>
                          <Button type="submit" className="w-full" size="sm">
                            Submit
                          </Button>
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
