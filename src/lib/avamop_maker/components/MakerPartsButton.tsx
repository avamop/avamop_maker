interface MakerPartsButtonProps {
  item: string;
  imageSrc: string;
}

const MakerPartsButton: React.FC<MakerPartsButtonProps> = ({ item, imageSrc }) => {
  return (
    <li key={item}>
      <img src={imageSrc} /> {content}
    </li>
  )
}

export default MakerPartsButton
