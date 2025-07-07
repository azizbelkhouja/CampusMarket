/* eslint-disable @typescript-eslint/no-explicit-any */
export { uploadToCloudinary };

const uploadToCloudinary = async(pics:any) => {

    const cloud_name ="dxzjfd0ak"
    const upload_preset = "campusmarket_preset"

    if(pics) {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        const res = await fetch(`https://api.cloudinary.com/v1_1/dxzjfd0ak/image/upload`, {
            method: "post",
            body: data
        })

        // store url in backend
        const fileData = await res.json();
        console.log("url : ", fileData);
        return fileData.url;
    }
    else {
        console.log("ERROR: No pics found");
    }
}