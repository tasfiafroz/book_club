import React, { useState } from "react"

function UpImage({ onUpload }) {
    const [loading, setLoading] = useState(false);
  
    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      setLoading(true);
  
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "abc1234");
      data.append("cloud_name", "dz15xegcp");
  
      const res = await fetch("https://api.cloudinary.com/v1_1/dz15xegcp/image/upload", {
        method: "POST",
        body: data,
      });
  
      const uploadedImage = await res.json();
      onUpload(uploadedImage.url);
      setLoading(false);
    };
  
    return (
      <div className="image-up">
        <input type="file" className="file-input" onChange={handleFileUpload} />
        {loading && <p>Uploading...</p>}
      </div>
    );
  }
  
  export default UpImage;
  