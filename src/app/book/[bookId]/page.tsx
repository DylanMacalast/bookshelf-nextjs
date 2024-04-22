import { bookRepo } from '../../_helpers/server/book-repo';

export default async function Page({ params }: { params: { bookId: number } }) {
  const book = await bookRepo.getById(params.bookId);

  if (book == null) {
    return <div>No Book Found</div>;
  }
  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
    </div>
  );
}
