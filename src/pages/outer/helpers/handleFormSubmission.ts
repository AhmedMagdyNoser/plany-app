import { globalErrorMessage } from "@/utils/constants";

export default async function handleFormSubmission(
  e: React.FormEvent<HTMLFormElement>,
  areRequiredFilled: boolean,
  setLoading: (loading: boolean) => void,
  setError: (error: string) => void,
  callback: () => Promise<void>,
): Promise<void> {
  e.preventDefault();
  if (areRequiredFilled) {
    try {
      setError("");
      setLoading(true);
      await callback();
    } catch (error) {
      setError((error as string) || globalErrorMessage);
    } finally {
      setLoading(false);
    }
  } else {
    // If the submit button is enabled with JS hacks
    setError("Please fill out all the fields");
  }
}
