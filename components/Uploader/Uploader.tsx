import React, { useState, ReactHTMLElement } from 'react';
import Avatar from '../Avatar/Avatar';
import AvatarModel from '../../lib/models/avatar'
import styles from './Uploader.module.css'

export default function Uploader() {
  const [file, setFile] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [base64, setBase64] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [size, setSize] = useState<string>('');

  const onChange = (e: React.FormEvent) => {
    if ((e.target as HTMLInputElement).type !== 'file') {
      return
    }
    
    let file = (e.target as HTMLInputElement).files![0];

    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded
      reader.readAsBinaryString(file)
    }
  }

  const _handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString))
  }

  const reset = () => {
    setFile('')
    setImagePreview('')
    setBase64('')
    setName('')
    setSize('')
  }

  const onFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const post: AvatarModel = {
      name,
      image: base64,
    }

    const response = await fetch('/api/avatars', {
        method: 'POST',
        body: JSON.stringify(post),
    });

    if (response.status === 200) {
      reset()
    }

    // todo: add error handling
  }

  const photoUpload = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setFile(file)
        setSize(file.size);
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)}>
      <div>
        <div className={styles.container}>
          <label htmlFor="file" className={styles.upload}>
            <Avatar image={imagePreview} name={name}/>
          </label>
          <input
            type="file"
            name="avatar"
            id="file"
            accept=".jpeg, .png, .jpg"
            onChange={photoUpload}
            src={imagePreview}
            className={styles.input}
          />
          <span>
            
          </span>
        </div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Player name"
            value={name}
          />
          <button type="submit">Upload</button>
      </div>
    </form>
  )
}