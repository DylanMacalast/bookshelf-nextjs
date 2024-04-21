import { bookRepo } from '../_helpers/server/book-repo';

export default async function Page() {
  const book = (await bookRepo.getAll())?.[0] ?? null;

  return (
    <>
      <div>
        <h1>{book?.title ?? 'hi'}</h1>
        <p>{book?.author ?? 'hi'}</p>
        {/* Add more fields as necessary */}
      </div>
    </>
  );
}
