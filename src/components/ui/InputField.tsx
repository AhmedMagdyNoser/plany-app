import { inputFieldsInstructions } from "@/utils/validation";
import SVGIcon from "../icons/SVGIcon";

type InputFieldExtraProps = {
  isValid?: boolean;
  instructions?: string;
  className?: string;
};

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & InputFieldExtraProps;

export default function InputField({ value, isValid, instructions, className = "", ...rest }: InputFieldProps) {
  const isNotValid = value && isValid === false; // there is a value + this value is not valid

  return (
    <div className="w-full">
      <input
        className={
          "rounded-primary bg-basic-2 txt-basic-h placeholder:txt-basic-p w-full border p-3 font-semibold outline-none transition-colors placeholder:font-normal " +
          " " +
          (isNotValid ? "brdr-red" : "brdr-basic-3") +
          " " +
          className
        }
        value={value}
        size={1}
        {...rest}
      />

      {isNotValid && (
        <div className="flex pt-1">
          <SVGIcon.SolidExclamationCircle size={11} className="txt-red px-[5px] pt-[3px]" />
          <div className="txt-red animate-fade-in">{instructions}</div>
        </div>
      )}
    </div>
  );
}

InputField.Name = function Name({ ...rest }: InputFieldProps) {
  return <InputField type="text" placeholder="Name" instructions={inputFieldsInstructions.name} maxLength={18} {...rest} />;
};

InputField.FirstName = function FirstName({ ...rest }: InputFieldProps) {
  return <InputField.Name placeholder="First Name" {...rest} />;
};

InputField.LastName = function LastName({ ...rest }: InputFieldProps) {
  return <InputField.Name placeholder="Last Name" {...rest} />;
};

InputField.Email = function Email({ ...rest }: InputFieldProps) {
  return (
    <InputField
      type="text" // replaced to text due to validation factors
      placeholder="Email"
      instructions={inputFieldsInstructions.email}
      maxLength={50}
      {...rest}
    />
  );
};

InputField.Password = function Password({ ...rest }: InputFieldProps) {
  return (
    <InputField
      type="password"
      placeholder="Password"
      instructions={inputFieldsInstructions.password}
      maxLength={32}
      {...rest}
    />
  );
};
