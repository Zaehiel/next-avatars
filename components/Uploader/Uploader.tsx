import React, { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import AvatarModel from '../../lib/models/avatar'

export default function Uploader() {
  const [file, setFile] = useState<undefined | File>(undefined);
  const [imagePreview, setImagePreview] = useState('');
  const [base64, setBase64] = useState('');
  const [name, setName] = useState('');
  const [size, setSize] = useState(0);

  const onFormChange = (e: React.FormEvent) => {
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

  const onInputChange = (e: React.FormEvent) => {
    setName((e.target as HTMLInputElement).value);
  }

  const _handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString))
  }

  const reset = () => {
    setFile(undefined)
    setImagePreview('')
    setBase64('')
    setName('')
    setSize(0)
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

  const photoUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = (e.target as HTMLInputElement).files![0];

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
    <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onFormChange(e)}>
      <div className="flex justify-center">
        <div className="flex">
          <div className="flex flex-col">
            <label
              htmlFor="file"
              className="flex justify-center p-10 cursor-pointer border-dashed border-4 border-blue-200"
            >
              <Avatar image={imagePreview}/>
            </label>
            <input
              type="file"
              name="avatar"
              id="file"
              accept=".jpeg, .png, .jpg"
              onChange={photoUpload}
              src={imagePreview}
              className="hidden"
            />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Avatar name"
              value={name}
              onChange={onInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline my-2"
            />
            <button
              type="submit"
              className={`${size === 0 ? 'disabled disabled:opacity-50' : ''} px-3 py-2 rounded-md font-semibold bg-blue-600 text-white`}
              disabled={size === 0}
            >
              Upload 
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}