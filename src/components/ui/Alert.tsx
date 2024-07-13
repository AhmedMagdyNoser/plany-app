export default function Alert({ message, colors = "bg-gray-100 text-gray-500" }: { message: string; colors?: string }) {
  return (
    <div className={`animate-fade-in-fast flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${colors}`}>
      <div>{message}</div>
    </div>
  );
}

Alert.Error = function Error({ message = "An error occurred" }) {
  return <Alert message={message} colors="bg-red-100 text-red-500 dark:bg-red-950" />;
};

Alert.Success = function Success({ message = "Success" }) {
  return <Alert message={message} colors="bg-green-100 text-green-500 dark:bg-green-950" />;
};
