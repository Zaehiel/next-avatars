/* eslint-disable react/jsx-no-comment-textnodes */
import styles from './Avatar.module.css'
import { defaultAvatarBase64 } from './constants'

type Props = {
  id: number | undefined,
  image: string,
  name: string | undefined,
}

export default function Avatar(props: Props) {
  return (
    <div className={styles.avatar}>
      <div className={styles.button}>
        <img
          alt={props.name}
          src={props.image ? props.image : defaultAvatarBase64}
          className={styles.image}
        />
        <span>{props.name}</span>
      </div>
    </div>
  )
}