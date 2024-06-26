import { redirect } from 'next/navigation';
import { verifySession } from '../../lib/dal';
import { shelfRepo } from '../../../app/_helpers/server/shelf-repo';
import { bookRepo } from '../../_helpers/server/book-repo';
import { ShelfForm } from '../../../components/organisms/Forms/ShelfForm/ShelfForm';
import { BookPicker } from '../../../components/organisms/BookPicker/BookPicker';

const getBooksForShelfForm = async (userId: string) => {
  const myBooks = await bookRepo.getByUserId(userId);

  return myBooks.map((b) => ({
    id: b._id?.toString() || '',
    title: b.title
  }));
};

const page = async ({ params }: { params: { shelfId: string } }) => {
  const session = await verifySession();
  if (!session.isAuth || session.userId == null) {
    redirect('/access-denied');
  }

  if (params.shelfId == null || params.shelfId == '') {
    return <div>No Shelf Found</div>;
  }

  // check if it's a new or existing shelf
  if (params.shelfId === 'new') {
    return (
      <>
        <ShelfForm />
      </>
    );
  }

  // get shelf by id
  const shelf = await shelfRepo.getMyShelf(params.shelfId, session.userId);

  if (shelf == null) {
    return <div>No Shelf Found</div>;
  }

  const booksInShelf = shelf.books.map((b) => ({
    id: b._id?.toString() || '',
    title: b.title
  }));

  const allMyBooks = await getBooksForShelfForm(session.userId as string);
  const booksToAdd: { id: string; title: string }[] = [];

  for (const b of allMyBooks) {
    if (
      booksInShelf.length == 0 ||
      booksInShelf.some((bis) => bis.id != b.id)
    ) {
      booksToAdd.push({
        id: b.id,
        title: b.title
      });
    }
  }

  return (
    <>
      <ShelfForm
        shelf={{
          id: shelf._id?.toString() || '',
          title: shelf.title,
          description: shelf.description,
          public: shelf.public
        }}
      />
      <hr className="my-5"></hr>
      <h1>Add Books to this shelf!</h1>
      <BookPicker
        initialBooksToAdd={booksToAdd}
        initialBooksInShelf={booksInShelf}
        shelfId={shelf._id?.toString() || ''}
      />
    </>
  );
};

export default page;
