import BackButton from "../../../components/ui/BackButton";
import Card from "../../../components/ui/Card";
import {  useState } from "react";
import StreamingDetail from "./streaming-detail";
import SelectProduct from "./select-product";




const AddStreaming = () => {
  const [active ,setActive] = useState(null) 

  return (
    <>
      <Card title={"Start Streaming"} headerslot={<BackButton />}>
        {active === null ? (<StreamingDetail setActive={setActive}/>) : (<SelectProduct active={active}/>)}       
      </Card>
    </>
  );
};
export default AddStreaming;
