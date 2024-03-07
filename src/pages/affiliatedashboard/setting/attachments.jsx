import axios from "axios"
import Fileinput from "../../../components/ui/Fileinput"
import {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import {  getResellerProfile,  resellerBackCnicRoute,  resellerFrontCnicRoute,  updateResellerAttachments } from "../../../constant/apiRoutes"
import { toast } from "react-toastify"

const Attachments = () => {
    const auth = useSelector((state) => state.auth )
    const [cnicFront,setCnicFront] = useState(null);
    const [cnicBack,setCnicBack] = useState(null);
    const [isSubmitting , setIsSubmitting] = useState(false)
    const [images, setImages] = useState({
        front:null,
        back:null,
    })

    const getData = async () => {
        try {
          const { data } = await axios.get(getResellerProfile, {
            headers: { Authorization: auth.token },
          });
          if (data.error === false) {
            setImages((prev) => ({
              ...prev,
              front: data.data.profile[0].front,
              back: data.data.profile[0].back,
            }));
          }
        } catch (error) {
          toast.error(error.message);
        }
      };
    
      useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true)
            const body ={};
            if (cnicFront) {
                body.front = cnicFront
            }
            if (cnicBack) {
                body.back = cnicBack
            }
            const {data} = await axios.post(updateResellerAttachments , body , {headers:{Authorization:auth.token , "Content-Type":"multipart/form-data"}})
            if (data.error === false) {
                toast.success(data.message)
            }else if (data.error === true) {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        } finally{
            setIsSubmitting(false);
        }
      }

  return (
    <div>
        <div className="input-area" data-aos="fade-up">
            <div className="flex  flex-col items-center gap-4 mb-5">
            <Fileinput
                name={"cnicfront"}
                placeholder="Select the CNIC Front."
                label="CNIC Front"
                onChange={(e) => setCnicFront(e.target.files[0])}
                preview
                className="w-full"
                selectedFile={cnicFront}
            />
            {images.front && !cnicFront && (
                <img
                src={`${resellerFrontCnicRoute}/${images.front}`}
                alt=""
                className="w-full md:w-[40%]"
                />
            )}
            </div>
            <div className="flex  flex-col items-center gap-4 mb-5">
            <Fileinput
                name={"cnicback"}
                placeholder="Select the CNIC Back."
                label="CNIC Back"
                onChange={(e) => setCnicBack(e.target.files[0])}
                preview
                selectedFile={cnicBack}
            />
            {images.back && !cnicBack && (
                <img
                src={`${resellerBackCnicRoute}/${images.back}`}
                alt=""
                className="w-full md:w-[40%]"
                />
            )}
            </div>
        </div> 
        <div className="signin-area mb-3.5">
          <div className="flex justify-end">
            <button
              type="button"
              className={"btn btn-primary"}
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              <span>{"Update"}</span>
            </button>
          </div>
        </div>
    </div>
  )
}

export default Attachments
