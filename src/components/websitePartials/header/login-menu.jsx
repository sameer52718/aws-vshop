import Dropdown from "../../../components/ui/Dropdown";
import Button from "../../../components/ui/Button";
const LoginMenu = () => {
  const items = [
    { link: "/user/login", label: "Login As User" },
    { link: "/seller/login", label: "Shop Login" },
    { link: "/reseller/login", label: "Login As Reseller" },
  ];
  return (
    <Dropdown
      classMenuItems="left-0  w-[220px] top-[110%] "
      label={
        <Button
          text="Login"
          className="px-0 text-xs xl:text-sm gap-1"
          icon="heroicons-outline:chevron-right"
          iconPosition="right"
          div
          iconClass="text-sm xl:text-lg"
        />
      }
      items={items}
    ></Dropdown>
  );
};

export default LoginMenu;
