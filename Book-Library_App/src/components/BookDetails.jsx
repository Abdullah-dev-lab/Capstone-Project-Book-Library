function BookDetails({ book }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
      {book.description && (
        <p className="mb-4 text-gray-700">
          {typeof book.description === "string"
            ? book.description
            : book.description.value}
        </p>
      )}
      {book.subjects && (
        <p className="mb-2">
          <strong>Subjects:</strong> {book.subjects.join(", ")}
        </p>
      )}
    </div>
  );
}


export default BookDetails;
