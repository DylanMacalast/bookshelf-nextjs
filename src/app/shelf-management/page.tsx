import { redirect } from 'next/navigation';
import { verifySession } from '../lib/dal';
import { shelfRepo } from '../_helpers/server/shelf-repo';

export default async function Page() {
  const session = await verifySession();
  if (!session.isAuth || session.userId == null) {
    redirect('/access-denied');
  }

  //   get shelfs for this user
  const shelfs = await shelfRepo.getByUserId(session.userId);

  return (
    <div>
      <div className="flex justify-center max-w-2xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2">
          <p>All My Shelves!</p>
          <a href="/shelf/new">Add Shelf</a>
        </div>
      </div>
    </div>
  );
}
