import Image from "../model/image";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "dayvwvkpm",
  api_key: "615635117163975",
  api_secret: "8X7vfCYOV-jG5d0JgNICV0iAUvg",
});

export const uploadImageFile = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);

    const imageUrl = await Image.findOne({});

    let newImage;

    if (!imageUrl) {
      const image = new Image({
        imgUrl: result.secure_url,
        publicId: result.public_id,
      });
      newImage = await image.save();
    } else {
      await cloudinary.uploader.destroy(imageUrl.publicId);

      newImage = await Image.findByIdAndUpdate(
        imageUrl._id,
        {
          $set: {
            imgUrl: result.secure_url,
            publicId: result.public_id,
          },
        },
        { new: true }
      );
    }

    res.json({
      id: newImage._id,
      url: newImage.imgUrl,
      publicId: newImage.publicId,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: "network error",
    });
  }
};
