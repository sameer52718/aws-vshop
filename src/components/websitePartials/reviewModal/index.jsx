import PropTypes from "prop-types";
import Modal from "@/components/ui/Modal";
import Textarea from "../../../components/ui/Textarea";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Rating } from "primereact/rating";
import { useState } from "react";


const schema = yup.object({
  review: yup.string().required("Review is Required"),
});

const ReviewModal = ({ handleClose, active, submitData }) => {
  const [value, setValue] = useState(0);
  const [error, setError] = useState(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });

  const onSubmit = async (data) => {
    if (value === 0) {
      setError("Rating Is Required");
      return
    }
    await submitData({...data,rating:value})
    setValue(0);
    reset()
    handleClose()
  };

  const handleChange = (e) => {
    setValue(e.value);
    setError(() => null);
  };

  return (
    <Modal
      title="Review"
      label=""
      labelClass="btn-outline-dark"
      activeModal={active}
      onClose={handleClose}
      themeClass="bg-main"
      centered={true}
      noFade={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor={"rating"} className={`block capitalize form-label`}>
            Rating
          </label>
          <Rating
            value={value}
            onChange={handleChange}
            cancel={false}
            id="rating"
            pt={{ offIcon: { className: "!w-8 !h-7" }, onIcon: { className: "!w-8 !h-7 !text-yellow-400" } }}
          />
          {error && <div className={`mt-2 text-danger-500 block text-sm`}>{error}</div>}
        </div>
        <Textarea
          name={"review"}
          register={register}
          error={errors.review}
          label={"Review"}
          placeholder={"Write A Review ..."}
          row={6}
        />
        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default ReviewModal;
ReviewModal.propTypes = {
  active: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  submitData: PropTypes.func.isRequired,
};
