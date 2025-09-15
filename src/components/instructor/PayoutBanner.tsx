import { Button } from "@/components/ui/button";
import { PayoutInfo } from "@/types/instructor";
import { 
  DollarSign, 
  Calendar, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PayoutBannerProps {
  payoutInfo: PayoutInfo;
  className?: string;
}

export function PayoutBanner({ payoutInfo, className }: PayoutBannerProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilPayout = () => {
    const nextPayout = new Date(payoutInfo.nextPayoutDate);
    const today = new Date();
    const diffTime = nextPayout.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilPayout = getDaysUntilPayout();

  return (
    <div className={cn(
      "bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Payout Information</h3>
            <p className="text-green-100 text-sm">
              Next payout in {daysUntilPayout} days
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold mb-1">
            {formatCurrency(payoutInfo.pendingAmount)}
          </div>
          <p className="text-green-100 text-sm">Pending payout</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Next Payout</span>
          </div>
          <p className="text-lg font-semibold">
            {formatDate(payoutInfo.nextPayoutDate)}
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Last Payout</span>
          </div>
          <p className="text-lg font-semibold">
            {formatCurrency(payoutInfo.lastPayoutAmount)}
          </p>
          <p className="text-xs text-green-100">
            {formatDate(payoutInfo.lastPayoutDate)}
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm font-medium">Total Earnings</span>
          </div>
          <p className="text-lg font-semibold">
            {formatCurrency(payoutInfo.totalEarnings)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-green-100 text-sm">
          Payouts are processed monthly on the 1st
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="bg-white text-green-700 hover:bg-green-50"
        >
          View Payout History
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
