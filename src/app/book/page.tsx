import { redirect } from 'next/navigation';
import BookCard from '../../components/atoms/BookCard/BookCard';
import { BookForm } from '../../components/organisms/Forms/BookForm/BookForm';
import { IBookCard } from '../_helpers/interfaces';
import { bookRepo } from '../_helpers/server/book-repo';
import { verifySession } from '../lib/dal';

export default async function Page() {
  const session = await verifySession();
  if (!session.isAuth) {
    redirect('/access-denied');
  }

  const books = await bookRepo.getAll();
  // serialise the object to simplify the data being passed to client components
  const bookCards: IBookCard[] = JSON.parse(JSON.stringify(books));

  return (
    <div>
      <BookForm />
      <div className="flex justify-center max-w-2xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2">
          {bookCards.map((b, i) => (
            <BookCard book={b} key={i.toString()} />
          ))}
        </div>
      </div>
    </div>
  );
}
