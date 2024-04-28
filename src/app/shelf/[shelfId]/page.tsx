const page = ({ params }: { params: { shelfId: string } }) => {
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
  return <div>My Shelf</div>;
};

export default page;
