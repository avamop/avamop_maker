import * as React from "react";
import styles from "../../module-css/makerMenu/MakerPartsCategories.module.css";
import Swiper from 'react-id-swiper';

interface MakerPartsCategoriesProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  imageSrc: string;
}

const MakerPartsCategories: React.FC<MakerPartsCategoriesProps> = ({
  imageSrc,
  category,
  isSelected,
  onClick,
}) => {
  const params = {
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
    }
  }
  return (
    <Swiper {...params}>
      <li className={styles['menu-category']}>
        <img onClick={onClick} src={imageSrc} alt={category} />
      </li>
    </Swiper>
  );
};

export default React.memo(MakerPartsCategories);
