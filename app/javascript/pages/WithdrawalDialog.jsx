import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
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

const WithdrawalDialog = () => {
  const { data, setData, post } = useForm({
    account_id: "",
    balance: "",
    amount: "",
    name: "",
  });

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        if (accounts.length > 0) return;
        const response = await fetch("/accounts?format=json");
        const data = await response.json();
        setAccounts(data.accounts);
        const defaultAccount = data.accounts.find(
          (account) => account.is_default
        );
        if (defaultAccount) {
          setData({
            ...data,
            account_id: defaultAccount.id,
            balance: defaultAccount.balance,
          });
          setSelectedAccount(defaultAccount);
        }
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      }
    };

    fetchAccounts();
  }, [setData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/withdrawals", data);
    const newBalance = selectedAccount.balance - data.amount;
    if (newBalance < 0) return;
    setData({ ...data, balance: newBalance });
    setSelectedAccount({ ...selectedAccount, balance: newBalance });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const changeAccount = (accountName) => {
    console.log(accountName);
    const account = accounts.find((account) => account.name === accountName);
    console.log(account);
    setData({ ...data, account_id: account.id, balance: account.balance });
    setSelectedAccount(account);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm">
          Make a Withdrawal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-semibold text-lg md:text-2xl">
          Withdrawal
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Label htmlFor="bank_name">Account</Label>
            <Select onValueChange={changeAccount}>
              <SelectTrigger>
                <SelectValue
                  placeholder={`${
                    selectedAccount?.name || "Select an account"
                  } (Default Account)`}
                />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.name}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Current Balance</Label>
            <Input
              className="w-full"
              placeholder="Balance"
              type="text"
              name="balance"
              value={selectedAccount?.balance || ""}
              readOnly
            />
            <Label>Amount</Label>
            <Input
              className="w-full"
              placeholder="Amount"
              type="number"
              name="amount"
              onChange={handleChange}
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

export default WithdrawalDialog;
