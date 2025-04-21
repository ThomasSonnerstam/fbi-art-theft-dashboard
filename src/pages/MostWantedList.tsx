import { useState } from "react";
import { useWantedPersons } from "../queries/useFbiData";

const MostWantedList = () => {
  const [pageSize] = useState(20);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useWantedPersons(1, pageSize);

  console.log("data", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>MostWantedList</div>;
};

export default MostWantedList;
