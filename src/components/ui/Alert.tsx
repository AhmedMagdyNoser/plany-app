import SVGIcon, { SVGIconProps } from "../icons/SVGIcon";

type AlertProps = {
  Icon?: React.ComponentType<SVGIconProps>;
  message: string;
  colors?: string;
};

export default function Alert({ Icon, message, colors = "light-basic-block" }: AlertProps) {
  return (
    <div className={`animate-fade-in rounded-primary flex items-center gap-2 px-4 py-3 ${colors}`}>
      {Icon && <Icon size={14} />}
      <div>{message}</div>
    </div>
  );
}

Alert.Error = function Error({ message = "An error occurred" }) {
  return <Alert message={message} colors="light-red-block" Icon={SVGIcon.ExclamationCircle} />;
};

Alert.Success = function Success({ message = "Success" }) {
  return <Alert message={message} colors="light-green-block" Icon={SVGIcon.CheckedCircle} />;
};
