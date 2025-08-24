function BookDetails({ book }) {
  return (
    <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">{book.title}</h2>
      {book.description && (
        <p className="mb-4 text-gray-700 leading-relaxed text-sm sm:text-base">
          {typeof book.description === "string"
            ? book.description
            : book.description.value}
        </p>
      )}
      {book.subjects && (
        <div className="flex flex-wrap gap-2 mt-2">
          {book.subjects.slice(0, 8).map((subj, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
            >
              {subj}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookDetails;