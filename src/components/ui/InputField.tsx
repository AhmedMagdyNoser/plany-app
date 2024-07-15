import { validationRegex, inputFieldsInstructions } from "@/utils/validation";

type InputFieldExtraProps = {
  validation?: RegExp;
  instructions?: string;
  className?: string;
};

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & InputFieldExtraProps;

export default function InputField({ value, validation, instructions, className = "", ...rest }: InputFieldProps) {
  return (
    <div className="w-full">
      <div className="rounded-primary bg-basic-2 brdr-basic-3 flex items-center overflow-hidden border">
        <input
          className={
            "txt-basic-h placeholder:txt-basic-p flex-1 bg-inherit p-3 font-semibold outline-none placeholder:font-normal " +
            className
          }
          value={value}
          size={1}
          {...rest}
        />
      </div>

      {validation && value && !validation.test(value as string) && (
        <div className="flex flex-col gap-1 py-2">
          <div className="animate-progress bg-red h-[3px] rounded"></div>
          <div className="animate-fade-in txt-red">{instructions}</div>
        </div>
      )}
    </div>
  );
}

InputField.Name = function Name({ ...rest }: InputFieldProps) {
  return (
    <InputField
      type="text"
      placeholder="Name"
      validation={validationRegex.name}
      instructions={inputFieldsInstructions.name}
      maxLength={18}
      {...rest}
    />
  );
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
      validation={validationRegex.email}
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
      validation={validationRegex.password}
      instructions={inputFieldsInstructions.password}
      maxLength={32}
      {...rest}
    />
  );
};
