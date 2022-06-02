import LikeButton from "./LikeButton";
const Band = ({ band }) => {
  return (
    <div className="band">
      <div>{band.name}</div>
      <LikeButton likes={band.likes} id={band.id} />
    </div>
  );
};

export default Band;
