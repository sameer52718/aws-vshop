import ImageBlock2 from "@/components/partials/widget/block/image-block-2";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="md:col-span-4 col-span-12">
          <ImageBlock2 />
        </div>
        <div className="col-span-12">
          <div className="col-span-12 grid md:grid-cols-3 grid-cols-1 gap-4">
            <GroupChart2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
