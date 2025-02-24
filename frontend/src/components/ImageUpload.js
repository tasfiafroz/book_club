import React, { useState } from "react";

function ImageUpload() {
  const[loading, setLoading] = useState(false)
  const handleFileUpload = async(event) => {
    const file = event.target.files[0]

    if(!file) return
    setLoading(true)
  const data = new FormData()
  data.append("file", file)
  data.append("upload_preset", "abc1234")
  data.append("cloud_name", "dz15xegcp")

    const res = await fetch("https://api.cloudinary.com/v1_1/dz15xegcp/image/upload",{
        method:"POST",
        body: data
    })

    const uploadedImageURL = await res.json()

    console.log(uploadedImageURL.url)
    setLoading(false)
  
  }


  return (
    <div className="image">
        <input
         type="file"
         className="file-input"
         onChange={handleFileUpload}
         >
        </input>
    </div>
  )
}

export default ImageUpload