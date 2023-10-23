interface MakerPartsButtonProps {
  item: string;
  buttonImage: string;
  onClick: () => void;
}

const MakerPartsButton: React.FC<MakerPartsButtonProps> = ({
  onClick,
  item,
  buttonImage,
}) => {
  return (
    <li onClick={onClick}>
      <img src={imageSrc} /> {item}
    </li>
  );
};

export default MakerPartsButton;
