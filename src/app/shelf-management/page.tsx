import { redirect } from 'next/navigation';
import { verifySession } from '../lib/dal';
import { shelfRepo } from '../_helpers/server/shelf-repo';
import ShelfCard from '../../components/atoms/ShelfCard/ShelfCard';

export default async function Page() {
  const session = await verifySession();
  if (!session.isAuth || session.userId == null) {
    redirect('/access-denied');
  }

  //   get shelfs for this user
  const shelfCards =
    (await shelfRepo.getByUserId(session.userId))?.map((s) => {
      return {
        id: s._id?.toString() || '',
        title: s.title,
        description: s.description,
        bookCount: s.books.length
      };
    }) || [];

  return (
    <div>
      <div className="flex justify-center max-w-2xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2">
          <h1 className="text-4xl font-bold text-center text-blue-500 my-4">
            My Shelves!
          </h1>
          <a
            href="/shelf-management/new"
            className="inline-flex items-center justify-center w-20 h-20 text-xs text-white transition bg-blue-600 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
          >
            Add Shelf
          </a>
        </div>
      </div>
      <div className="flex justify-center max-w-2xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2">
          {shelfCards.map((s) => (
            <ShelfCard shelf={s} key={s.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
