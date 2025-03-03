'use client'

import { formatCurrency } from "@/utils/formatCurrentUtils";

export interface OrderTotalProps {
  totalProducts: string;
}

export function OrderTotal({ totalProducts }: OrderTotalProps) {

  return (
    <div className="field mb-4">
      <div className="flex justify-start text-purple-primary mb-6 py-6 font-bold border-t border-b border-zinc-200">
        <div>Total:</div>
          <div className="ml-5">{formatCurrency(Number(totalProducts))}</div>
      </div>
    </div>
  );
}