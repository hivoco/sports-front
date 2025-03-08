function Error({ statusCode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-2">Continue with your quiz</h2>
        <p className="mb-4">Let's get back to the questions.</p>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-2 bg-blue-600 text-white rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
