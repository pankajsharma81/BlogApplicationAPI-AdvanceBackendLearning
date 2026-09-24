import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<UploadApiResponse> => {
    return new Promise((resolve,reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image"
            },
            (error,result) => {
                if(error){
                    reject(error);
                    return;
                }

                if(!result) {
                    reject(new Error("Cloudinary Upload Failed"));
                    return;
                }
                resolve(result)
            },
        )
        uploadStream.end(buffer)
    })
}

export const deleteFromCloudinary = (imagePublicId: string): Promise<void> => {
    return new Promise ((resolve,reject) => {
        const destroyStream = cloudinary.uploader.destroy(
            imagePublicId,
            {resource_type: "image"},
            (error, result) => {
                if (error){
                    reject(error);
                    return;
                }

                if(result?.result !== "ok" && result?.result !== "not found"){
                    reject(new Error("Cloudinary delete Failed"))
                    return;
                }
            }
        )
        resolve()
    })
}