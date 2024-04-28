import { redirect } from 'next/navigation';
import { verifySession } from '../../lib/dal';
import { shelfRepo } from '../../../app/_helpers/server/shelf-repo';
import { bookRepo } from '../../_helpers/server/book-repo';
import { ShelfForm } from '../../../components/organisms/Forms/ShelfForm/ShelfForm';
import { BookPicker } from '../../../components/organisms/BookPicker/BookPicker';
import { title } from 'process';

const page = async ({ params }: { params: { shelfId: string } }) => {
  const session = await verifySession();
  if (!session.isAuth || session.userId == null) {
    redirect('/access-denied');
  }

  if (params.shelfId == null) {
    return <div>No Shelf Found</div>;
  }

  // check if it's a new or existing shelf
  if (params.shelfId === 'new') {
    const myBooks = await bookRepo.getByUserId(session.userId);

    const booksToAdd = myBooks.map((b) => ({
      id: b._id as string,
      title: b.title
    }));

    return (
      <>
        <ShelfForm />
        <BookPicker booksToAdd={booksToAdd} booksInShelf={[]} />
      </>
    );
  }

  // get shelf by id
  const shelf = await shelfRepo.getMyShelf(params.shelfId);

  if (shelf == null) {
    return <div>No Shelf Found</div>;
  }

  return <div>My Shelf</div>;
};

export default page;
