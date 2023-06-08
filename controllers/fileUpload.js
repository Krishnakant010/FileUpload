const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
// local file upload handler
exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("File is her", file);
    let path =
      __dirname + "/Files/" + Date.now() + "." + `${file.name.split(".")[1]}`;
    console.log("Uploading to" + path);
    file.mv(path, (err) => {
      console.log(err);
    });
    res.json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (err) {
    console.log("Error uploading file");
    console.log(err);
  }
};

function isSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto"; //This will avodi video upload error
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload handler
exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.imageFile;
    console.log(file);
    //validate the file
    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log(fileType);
    if (!isSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file extension or it is not supported",
      });
    }
    // now here it is supported
    const response = await uploadFileToCloudinary(file, "krishnakant");

    // entry in database;
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      url: response.secure_url,
      message: "Imagage uploaded successfully",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
// video upload

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;

    const file = req.files.videoFile;
    console.log("this is file data", file);
    const supportedTypes = ["mp4", "mov", "gif"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log(fileType);
    if (!isSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file extension or it is not supported",
      });
    }
    console.log("before cloudinar");
    const response = await uploadFileToCloudinary(file, "krishnakant");
    console.log("after cloudinar");
    // entry in database;
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      url: response.secure_url,
      message: "Imagage uploaded successfully",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;

    const file = req.files.imageFile;

    //validate the file
    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file extension or it is not supported",
      });
    }
    // now here file format it is supported
    const response = await uploadFileToCloudinary(file, "krishnakant", 10);

    // entry in database;
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      url: response.secure_url,
      message: "Imagage uploaded successfully",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
