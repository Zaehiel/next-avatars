/* eslint-disable react/jsx-no-comment-textnodes */
import styles from './Avatar.module.css'
import { defaultAvatarBase64 } from './constants'

type Props = {
  _id?: number | undefined,
  image: string,
  name?: string,
  onClick: () => void,
}

export default function Avatar(props: Props) {
  return (
    <div>
      <div className={styles.avatar} onClick={props.onClick}>
        <div className={styles.button}>
          <img
            alt={props.name}
            src={props.image ? props.image : defaultAvatarBase64}
            className={styles.image}
          />
        </div>
      </div>
      <div className="text-center">{props.name}</div>
    </div>
  )
}