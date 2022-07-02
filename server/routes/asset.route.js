const express = require("express");
const router = new express.Router();
const Asset = require("../db/models/asset_schema");
const NotApprovedAsset = require("../db/models/notapprovedAseet_scema");
const User = require("../db/models/user_schema");
const { cloudinary } = require("../utils/cloudinary");
const { isPhotoValid } = require("../utils/photoValidation");
const { checkUsersPrefrences } = require("../utils");
const { sendAssetApprovedEmail } = require("../utils/sendEmail");
const auth = require("../middlewares/auth");

// Upload asset
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const images = [];
    const imagesArr = req.body.images;
    let flag = true;
    for (let i = 0; i < imagesArr.length; i++) {
      const isValid = isPhotoValid(imagesArr[i].name);
      if (!isValid) {
        flag = false;
        res.send({
          message: `העלה רק תמונות, ${imagesArr[i].name} לא תקינה`,
        });
      } else {
        const uploadedResponse = await cloudinary.uploader.upload(
          imagesArr[i].image,

          {
            upload_preset: "ml_default",
            fetch_format: "jpg",
          }
        );
        images.push({
          image: uploadedResponse.url,
          imageName: imagesArr[i].name,
        });
      }
    }
    if (flag) {
      const asset = new NotApprovedAsset({
        ...req.body,
        roomsNumber:
          req.body.roomsNumber == 6 ? "חדר בדירת שותפים" : req.body.roomsNumber,
        images,
      });
      const doc = await asset.save();
      res.status(200).send({ asset: doc });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Error", error: err });
  }
});

// get assets by category
router.get("/category/:id", auth(), async (req, res) => {
  try {
    const { skip, limit } = req.query;
    const id = JSON.parse(req.params.id);
    if (id === 5) {
      const assetsTotalLength = await Asset.find({
        isSublet: true,
      }).countDocuments();

      const assets = await Asset.find({
        isSublet: true,
      })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
      console.log(assets);
      res.status(200).send({
        assets,
        assetsTotalLength,
      });
    } else {
      const assetsTotalLength = await Asset.find({
        isSublet: false,
      }).countDocuments();
      const assets = await Asset.find({
        isSublet: false,
      })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
      res.status(200).send({
        assets,
        assetsTotalLength,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Error", error: error });
  }
});

// add asset that has been approved to the asset db and remove it from the notapprovedAseet db
router.post("/aproveasset", auth(), async (req, res) => {
  try {
    const { id } = req.body;
    const assetToBeApproved = await NotApprovedAsset.findById(id);
    const newAsset = new Asset({ ...assetToBeApproved._doc });
    await newAsset.save();
    await NotApprovedAsset.findByIdAndDelete(id);
    const user = await User.findById(newAsset.userId);
    res.send({ success: true });
    sendAssetApprovedEmail(user.email, newAsset, user.firstname);
    checkUsersPrefrences(newAsset);
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Error", error: err });
  }
});

router.get("/notapproved", async (req, res) => {
  const notApprovedAssets = await NotApprovedAsset.find();
  res.send({ assets: notApprovedAssets });
});

router.delete("/notapproved", auth(), async (req, res) => {
  await NotApprovedAsset.findByIdAndDelete(req.body.id);
  res.send({ success: true });
});

// get not approved assets by user id
router.get("/notapproved/byuser/:id", async (req, res) => {
  const notApprovedAssets = await NotApprovedAsset.find({
    userId: req.params.id,
  });
  res.send({ notApprovedAssets: notApprovedAssets });
});

router.get("/op", async (req, res) => {
  const asset = await Asset.findById("61193652eb2fc8416c159ed5");
  checkUsersPrefrences(asset);
  res.send({ asset });
});

// Update asset
router.patch("/", async (req, res) => {
  try {
    const { id } = req.body;
    const images = JSON.parse(req.body.images);
    console.log(images);
    let newImagesArr = [];
    let isImageChanged = false;
    let flag = true;

    let asset = await Asset.findById(id);
    if (images.length !== asset.images.length) {
      isImageChanged = true;
    } else {
      images.forEach((image) => {
        if (
          !asset.images.filter((item) => item.image === image.image).length > 0
        ) {
          isImageChanged = true;
        }
      });
    }
    if (isImageChanged) {
      const imagesArr = images;
      for (let i = 0; i < imagesArr.length; i++) {
        const isValid = isPhotoValid(imagesArr[i].name);
        if (!isValid) {
          flag = false;
          res.send({
            message: `העלה רק תמונות, ${imagesArr[i].name} לא תקינה`,
          });
        } else {
          const uploadedResponse = await cloudinary.uploader.upload(
            imagesArr[i].image,
            {
              upload_preset: "ml_default",
              fetch_format: "jpg",
            }
          );
          newImagesArr.push({
            image: uploadedResponse.url,
            imageName: imagesArr[i].name,
          });
        }
      }
    } else {
      images.forEach((image) =>
        newImagesArr.push({ image: image.image, imageName: image.name })
      );
    }
    if (flag) {
      const newAsset = await Asset.findByIdAndUpdate(
        id,
        {
          ...req.body,
          roomsNumber:
            req.body.roomsNumber == 6
              ? "חדר בדירת שותפים"
              : req.body.roomsNumber,
          images: newImagesArr,
        },
        { new: true }
      );
      const doc = await newAsset.save();
      res.status(200).send({ asset: doc });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Error", error: err });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    const asset = await Asset.findByIdAndDelete(id);
    if (asset) res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false });
  }
});

// get asset by id
router.get("/:id", auth(), async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const asset = await Asset.findById(id).populate("userId");
    if (asset) res.status(200).send({ asset });
    else {
      const asset = await NotApprovedAsset.findById(id).populate("userId");
      res.status(200).send({ asset });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Error", error: error });
  }
});

// get assets by userid
router.get("/byuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const assets = await Asset.find({
      userId: id,
    });
    res.status(200).send({ assets });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Error", error: error });
  }
});

// filter assets
router.post("/filter", async (req, res) => {
  try {
    let arr = [];
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const startIndex = skip;
    const endIndex = skip + limit;
    const { roomsNumber, dates, price, area, isSublet } = req.body;

    if (!roomsNumber.includes("6")) {
      for (let i = 0; i < roomsNumber.length; i++) {
        const assets = await Asset.find({
          isSublet,
          $or: [
            { roomsNumber: roomsNumber[i] },
            { roomsNumber: `${roomsNumber[i]}.5` },
          ],
        });
        arr = [...arr, ...assets];
      }
    } else {
      const assets = await Asset.find({ isSublet });
      arr = [...assets];
    }

    // date filter
    arr = arr.filter((item) => dates.includes(item.enterDate));
    // price filter
    arr = arr.filter((item) => item.pricePerMonth <= price);
    // area filter
    if (!area.includes("הכל")) {
      arr = arr.filter((item) => area.includes(item.area));
    }
    const assetsTotalLength = arr.length;
    res
      .status(200)
      .send({ assets: arr.slice(startIndex, endIndex), assetsTotalLength });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Error", error: error });
  }
});

module.exports = router;
