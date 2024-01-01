import { Token } from "@/lib/types";
import React, { useState } from "react";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface TokenSelectProps {
  data: Token[];
  id: string;
  selectedToken: Token | null;
  otherSelectedToken: Token | null;
  setSelectedToken: (token: Token | null) => void;
}

export default function TokenSelect({
  data,
  selectedToken,
  otherSelectedToken,
  setSelectedToken,
  id,
}: TokenSelectProps) {
  return (
    <div className="flex space-x-2">
      <Input
        className="flex-grow"
        id={id}
        type="number"
        placeholder="0.0"
        inputMode="decimal"
        pattern="^[0-9]*[.,]?[0-9]*$"
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            {selectedToken ? (
              <>
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarImage
                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${selectedToken.currency}.svg`}
                    alt={selectedToken.currency}
                  />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
                {selectedToken.currency}
              </>
            ) : (
              "Select Token"
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-96 max-h-[75%] overflow-scroll">
          <DialogHeader>
            <DialogTitle>Select Token</DialogTitle>
            <Input
              className="w-full mt-2"
              id="search-token"
              placeholder="Search"
              type="text"
            />
          </DialogHeader>
          <div>
            <h3 className="font-bold">Commonly Traded</h3>
            <div>
              <Avatar
                className="w-6 h-6 mr-2"
                src="/placeholder.svg?height=24&width=24"
              />
              Token A
            </div>
            <div>
              <Avatar
                className="w-6 h-6 mr-2"
                src="/placeholder.svg?height=24&width=24"
              />
              Token B
            </div>
            <h3 className="font-bold mt-4">All Tokens</h3>
            <div className="flex flex-col gap-y-3 py-2">
              {data.map((token: Token, index: number) => (
                <DialogClose asChild>
                  <Button
                    className="flex justify-start px-2 py-1 h-fit"
                    variant={"outline"}
                    key={index}
                    disabled={otherSelectedToken?.currency === token.currency}
                    onClick={() => {
                      setSelectedToken(token);
                    }}
                  >
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage
                        src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
                        alt={token.currency}
                      />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-start items-start">
                      <span className="text-base">{token.currency}</span>
                      <span className="text-muted-foreground">
                        ${token.price}
                      </span>
                    </div>
                  </Button>
                </DialogClose>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}