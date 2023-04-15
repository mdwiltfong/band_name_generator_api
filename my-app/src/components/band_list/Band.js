import { Badge } from "reactstrap";
import LikeButton from "./LikeButton";
const Band = ({ band }) => {
  return (
    <Badge className="m-3">
      <div className="m-3">{band.name}</div>
      <LikeButton likes={band.likes} id={band.id} />
    </Badge>
  );
};

export default Band;
