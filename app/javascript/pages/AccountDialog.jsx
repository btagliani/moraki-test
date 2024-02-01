// AccountDialog.js
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { DialogTrigger, DialogHeader, DialogContent, Dialog, DialogClose } from "../components/ui/dialog";

const AccountDialog = ({ account }) => {
  const [formData, setFormData] = useState(account || {
    bank_id: "",
    number: "",
    balance: "",
    name: "",
    is_default: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Inertia.post('/accounts', formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm">Add account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader class="font-semibold text-lg md:text-2xl">Add New Account</DialogHeader>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Label htmlFor="bank_id"> Bank ID </Label>
            <Input
              className="w-full"
              placeholder="Bank ID"
              type="text"
              name="bank_id"
              value={formData.bank_id}
              onChange={handleChange}
            />
            <Label htmlFor="number"> Account Number </Label>
            <Input
              className="w-full"
              placeholder="Account Number"
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
            <Label> Balance </Label>
            <Input
              className="w-full"
              placeholder="Balance"
              type="text"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
            />
            <Label> Account Name </Label>
            <Input
              className="w-full"
              placeholder="Account Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Label> Default </Label>
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
  );
};

export default AccountDialog;
