import { useParams } from "react-router-dom";

function BoardPage() {
  const params = useParams<{ boardId: string }>();

  return <div>{params.boardId}</div>;
}

export default BoardPage;
