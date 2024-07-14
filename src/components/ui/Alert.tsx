import SVGIcon, { SVGIconProps } from "../icons/SVGIcon";

type AlertProps = {
  Icon?: React.ComponentType<SVGIconProps>;
  message: string;
  colors?: string;
};

export default function Alert({ Icon, message, colors = "bg-gray-100 text-gray-500" }: AlertProps) {
  return (
    <div className={`animate-fade-in flex items-center gap-2 rounded-xl px-4 py-3 ${colors}`}>
      {Icon && <Icon size={14} />}
      <div>{message}</div>
    </div>
  );
}

Alert.Error = function Error({ message = "An error occurred" }) {
  return <Alert message={message} colors="bg-red-100 text-red-500 dark:bg-red-950" Icon={SVGIcon.ExclamationCircle} />;
};

Alert.Success = function Success({ message = "Success" }) {
  return <Alert message={message} colors="bg-green-100 text-green-500 dark:bg-green-950" Icon={SVGIcon.CheckedCircle} />;
};
