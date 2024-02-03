import React, { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  DialogTrigger,
  DialogHeader,
  DialogContent,
  Dialog,
  DialogClose,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const AccountDialog = () => {
  const { data, setData, post } = useForm({
    bank_name: "",
    number: "",
    balance: "",
    name: "",
    is_default: false,
  });

  const [banks, setBanks] = useState([]);

  const fetchBanks = async () => {
    try {
      const response = await fetch("/banks");
      const data = await response.json();
      setBanks(data);
    } catch (error) {
      console.error("Failed to fetch banks data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/accounts", data);
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData((data) => ({ ...data, [key]: value }));
  };

  const changeBank = (bankName) => {
    setData({ ...data, bank_name: bankName });
  };

  if (banks.length === 0) fetchBanks();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm">
          Add Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-semibold text-lg md:text-2xl">
          Add New Account
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Label htmlFor="bank_name">Bank</Label>
            <Select onValueChange={changeBank}>
              <SelectTrigger>
                <SelectValue placeholder="Select a bank" />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank.id} value={bank.name}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label htmlFor="number">Account Number</Label>
            <Input
              className="w-full"
              placeholder="Account Number"
              type="text"
              name="number"
              value={data.number}
              onChange={handleChange}
            />
            <Label>Balance</Label>
            <Input
              className="w-full"
              placeholder="Balance"
              type="text"
              name="balance"
              value={data.balance}
              onChange={handleChange}
            />
            <Label>Account Name</Label>
            <Input
              className="w-full"
              placeholder="Account Name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <Label htmlFor="is_default">Default</Label>
            <Checkbox
              className="ml-1"
              checked={data.is_default}
              name="is_default"
              onCheckedChange={(e) => setData({ ...data, is_default: e })}
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
  );
};

export default AccountDialog;
