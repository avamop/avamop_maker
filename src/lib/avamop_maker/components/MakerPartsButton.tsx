interface MakerPartsButtonProps {
  item: string;
  imageSrc: string;
  onClick: () => void;
}

const MakerPartsButton: React.FC<MakerPartsButtonProps> = ({
  onClick,
  item,
  imageSrc,
}) => {
  return (
    <li onClick={onClick} key={item}>
      <img src={imageSrc} /> {item}
    </li>
  );
};

export default MakerPartsButton;
