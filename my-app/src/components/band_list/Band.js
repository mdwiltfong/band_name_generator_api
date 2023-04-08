import { Badge } from "reactstrap";
import LikeButton from "./LikeButton";
const Band = ({ band }) => {
  return (
    <Badge>
      <div>{band.name}</div>
      <LikeButton likes={band.likes} id={band.id} />
    </Badge>
  );
};

export default Band;
