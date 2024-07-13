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
      <div className="flex items-center overflow-hidden rounded-xl bg-l-bg-2 dark:bg-d-bg-2">
        <input
          className={
            "flex-1 bg-inherit p-3 font-semibold outline-none placeholder:text-l-txt-semi dark:placeholder:text-d-txt-semi " +
            className
          }
          value={value}
          size={1}
          {...rest}
        />
      </div>

      {validation && value && !validation.test(value as string) && <div className="py-1 text-red-500">{instructions}</div>}
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
