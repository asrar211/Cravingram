import ImageKit from "imagekit"

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT!
});

export const uploadFile =async (file: string, fileName: string) => {
    try {
    const result = await imagekit.upload({
      file,      
      fileName,  
    });

    return result;
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw new Error("File upload failed");
  }
}