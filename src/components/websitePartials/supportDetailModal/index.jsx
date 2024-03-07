import Modal from "@/components/ui/Modal";
import { Icon } from "@iconify/react";
import moment from "moment";

import PropTypes from "prop-types";
import { supportFile } from "../../../constant/apiRoutes";

const LoginModal = ({ handleClose, active, data }) => {
  return (
    <Modal
      title="Request Detail"
      label="Request Detail"
      labelClass="btn-outline-dark"
      activeModal={active}
      onClose={handleClose}
      themeClass="bg-main"
      centered={true}
      noFade={false}
    >
      <div className="space-y-1">
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-semibold">Date</span>
          <span className="text-sm ">{moment(data?.time).format("DD/MM/YYYY")}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-semibold">Time</span>
          <span className="text-sm ">{moment(data?.time).format("hh:mm A")}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-semibold">Subject</span>
          <span className="text-sm ">{data?.subject}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-semibold">Message</span>
          <span className="text-sm ">{data?.message}</span>
        </div>
      </div>
      {data?.file && (<div className="flex mt-1 justify-end">
        <a href={`${supportFile}/${data?.file}`} download className="btn btn-primary rounded-full" target="_blank" rel="noreferrer">
          <Icon icon="tabler:cloud-download" />
        </a>
      </div>)}
    </Modal>
  );
};

export default LoginModal;

LoginModal.propTypes = {
  active: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
