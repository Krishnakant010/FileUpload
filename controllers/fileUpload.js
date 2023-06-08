const File = require("../models/File");
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
