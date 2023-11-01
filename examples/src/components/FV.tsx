import React from 'react'
/*import styles from './FV.module.css'*/

type FVProps = {
  imageUrl: string
  altText: string
  catchphrase: string
  buttonText: string
}

const FV = ({ imageUrl, altText, catchphrase, buttonText }: FVProps) => {
  return (
    <section /*className={styles.fv}*/>
      <img src={imageUrl} alt={altText} />
      <h2>{catchphrase}</h2>
      <button>{buttonText}</button>
    </section>
  )
}

export default FV