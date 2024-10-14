import { FaPlus, FaCircleExclamation, FaPenClip, FaPen, FaCircleCheck, FaCircleXmark, FaXmark } from "react-icons/fa6";
import { FaBars, FaCheckSquare } from "react-icons/fa";
import { IoIosSunny, IoMdColorPalette } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";
import { TbEdit } from "react-icons/tb";

function Spinner({ size, className }: { size?: number; className?: string }) {
  return <ImSpinner8 className={`animate-spin ${className}`} size={size} />;
}

const solidIcons = {
  LightMode: IoIosSunny,
  Spinner: Spinner,
  Menu: FaBars,
  Plus: FaPlus,
  Xmark: FaXmark,
  XmarkCircle: FaCircleXmark,
  ExclamationCircle: FaCircleExclamation,
  CheckedCircle: FaCircleCheck,
  CheckedSquare: FaCheckSquare,
  Pencil: FaPenClip,
  Pen: FaPen,
  Edit: TbEdit,
  Colors: IoMdColorPalette,
};

export default solidIcons;
