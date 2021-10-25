import { useState } from 'react'
import styles from './Avatar.module.css'
import { defaultAvatarBase64 } from './constants'
import { ImBin } from 'react-icons/im'

type Props = {
  _id?: number | undefined,
  image: string,
  name?: string,
  onClick?: () => void,
}

export default function Avatar(props: Props) {

  const [isHovering, setIsHovering] = useState(false)

  return (
    <div>
      <div
        className={styles.avatar}
        onClick={props.onClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="p-0 m-0">
          <img
            alt={props.name}
            src={props.image ? props.image : defaultAvatarBase64}
            className={styles.image}
          />
          {
            isHovering
            ? (
            <div className="absolute opacity-70 bg-gray-100 w-full h-full flex justify-center items-center inset-0">
                <ImBin color="red" fontSize="2rem" />
            </div>
            ) : ''
          }
        </div>
      </div>
      <div className="text-center">{props.name}</div>
    </div>
  )
}