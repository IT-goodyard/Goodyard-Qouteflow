"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (price: number, deliveryDate: Date) => void;
  title?: string;
  description?: string;
  initialPrice?: number;
  initialDeliveryDate?: Date;
}

export function QuoteDialog({
  open,
  onOpenChange,
  onSubmit,
  title = "Submit Quote",
  description = "Enter the price and estimated delivery date for your quote.",
  initialPrice,
  initialDeliveryDate
}: QuoteDialogProps) {
  const [price, setPrice] = React.useState(initialPrice?.toString() || "");
  const [deliveryDate, setDeliveryDate] = React.useState<Date | undefined>(initialDeliveryDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (price) {
      onSubmit(Number(price), new Date()); 
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (RMB)
              </Label>
              <div className="col-span-3">
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
                />
                {price && !isNaN(Number(price)) && Number(price) > 0 && (
                  <div className="text-xs space-y-1 mt-2">
                    <div className="font-medium text-blue-600 text-sm">
                      ≈ ${(Number(price) / 7.25).toFixed(2)} USD
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Exchange rate: 1 RMB = 0.138 USD (1:7.25)
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Quote</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
 