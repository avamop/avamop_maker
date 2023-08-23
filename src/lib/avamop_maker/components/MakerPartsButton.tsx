interface MakerPartsButtonProps {
  content: string;
  imageSrc: string;
}

const MakerPartsButton: React.FC<MakerPartsButtonProps> = ({ imageSrc, content }) => {
  return (
    <li>
      <img src={imageSrc} /> {content}
    </li>
  )
}

export default MakerPartsButton
