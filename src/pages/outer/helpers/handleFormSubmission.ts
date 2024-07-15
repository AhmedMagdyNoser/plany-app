import { globalErrorMessage } from "@/utils/constants";
import { areFieldsFilled } from "@/utils/helpers";

export default async function handleFormSubmission(
  e: React.FormEvent<HTMLFormElement>,
  requiredFields: Record<string, string>,
  setLoading: (loading: boolean) => void,
  setError: (error: string) => void,
  callback: () => Promise<void>,
): Promise<void> {
  e.preventDefault();
  if (areFieldsFilled(requiredFields)) {
    try {
      setError("");
      setLoading(true);
      await callback();
    } catch (error) {
      console.log("%cError from handleFormSubmission", "color: red; font-weight: bold;", error);
      setError((error as string) || globalErrorMessage);
    } finally {
      setLoading(false);
    }
  } else {
    // If the submit button is enabled with JS hacks
    setError("Please fill out all the fields");
  }
}
