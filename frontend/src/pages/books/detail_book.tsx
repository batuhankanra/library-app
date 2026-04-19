import { useParams } from "react-router";

const BookDetail = () => {
  const { id } = useParams();

  console.log(id); // buradan id gelir

  return <div>Kitap ID: {id}</div>;
};

export default BookDetail;