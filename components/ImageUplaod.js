import styles from '@/styles/Form.module.css';
import {useState} from "react";
import {API_URL} from "@/config";

export default function ImageUpload({evtId, imageUploaded}) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('files', image);
    // by checking backend code, just found out that api::event.event works while just events doesn't
    formData.append('ref', 'api::event.event');
    formData.append('refId', evtId);
    formData.append('field', 'image');

    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData
    })

    if (res.ok) {
      imageUploaded();
    }
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange}/>
        </div>
        <input type="submit" value="Upload" className="btn"/>
      </form>
    </div>
  )
}
