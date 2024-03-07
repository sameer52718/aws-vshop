import ImageBlock2 from "@/components/affiliatepartials/widget/block/image-block-2";
import GroupChart1 from "@/components/affiliatepartials/widget/chart/group-chart-1";
import Card from "@/components/ui/Card";

const Home = () => {
  return (
    <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
          <ImageBlock2 />
        </div>
        <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
          <Card bodyClass="p-4">
            <div className="grid md:grid-cols-3 col-span-1 gap-4">
              <GroupChart1 />
            </div>
          </Card>
        </div>
      </div>
  )
}

export default Home
