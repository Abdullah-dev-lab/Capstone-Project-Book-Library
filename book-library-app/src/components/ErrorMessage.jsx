function ErrorMessage({ message }) {
  return (
    <div className="p-4 my-2 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      {message}
    </div>
  );
}

export default ErrorMessage;