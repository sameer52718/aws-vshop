import Card from "@/components/ui/Card";
import GroupChart2 from "@/components/sellerpartials/widget/chart/group-chart-2";
import SelectMonth from "@/components/sellerpartials/SelectMonth";
import RecentOrderTable from "../../components/sellerpartials/Table/recentOrder-table";
const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="col-span-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4">
            <GroupChart2 />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="xl:col-span-12 col-span-12">
          <Card title="Recent Orders" headerslot={<SelectMonth />} noborder>
            <RecentOrderTable />
          </Card>
        </div>
        {/* <div className="xl:col-span-6 lg:col-span-7 col-span-12">
          <Card title="Visitors Report" headerslot={<SelectMonth />}>
            <BasicArea />
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
