interface MakerPartsButtonProps {
  item: string;
  imageSrc: string;
  onClick: () => void;
  path: string;
}

const MakerPartsButton: React.FC<MakerPartsButtonProps> = ({
  onClick,
  item,
  imageSrc,
  path
}) => {
  return (
    <li onClick={onClick}>
      <img src={path + imageSrc} /> {item}
    </li>
  );
};

export default MakerPartsButton;
