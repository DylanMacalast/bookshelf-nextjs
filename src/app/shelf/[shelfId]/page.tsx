import { shelfRepo } from '../../_helpers/server/shelf-repo';
import { CustomError } from '../../../components/molecules/Error';
import Link from 'next/link';
import { ShelfPage } from '../../../components/pages/ShelfPage';
import { verifySession } from '../../lib/dal';

import { log } from 'console';

const page = async ({ params }: { params: { shelfId: string } }) => {
  const session = await verifySession();
  const shelf = await shelfRepo.getOne(params.shelfId);

  /*
   * TODO: Check if logged in user is owner of the shelf
   * 1. Get users shelf ids, check if the current id is within the array of shelf ids,
   * if they are then show editable state, otherwise view only.
   */

  if (!shelf?.public) {
    return (
      <CustomError
        errorCode={401}
        errorMessage="This bookshelf is private"
        action={<Link href={'/'}>Go home</Link>}
      />
    );
  }

  if (params.shelfId == null) {
    return <div>No Shelf Found</div>;
  }

  // TODO: Fetch shelf by ID
  // check if we are an authenticated user and we are the owner of the shelf
  // if private and logged in show shelf
  // if public and logged in show shelf with edit button
  // if public and not logged in, show shelf
  // if private and not logged in and not owner -> redirect to access-denied

  // if public, show
  return (
    <ShelfPage
      shelf={shelf}
      isOwner={session?.userId === shelf?.userId.toString()}
    />
  );
};

export default page;
