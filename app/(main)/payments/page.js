'use client'

// import RecentSales from "../dashboard/_components/recent-sales";
// import TotalRevenue from "../dashboard/_components/total-revenue";
import PaymentsTable from "./_components/payments-table";

const PaymentsPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Payments
        </h1>
        {/* <div className="grid grid-cols-2 items gap-4">
          <TotalRevenue />
          <RecentSales />
        </div> */}
      </div>
      <div className="flex flex-col gap-4">
        <PaymentsTable />
      </div>
    </main>
  );
};

export default PaymentsPage;
