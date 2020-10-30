'use strict';

// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
// [END import]

// [START generateThumbnail]
/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 */
// 1. [START generateThumbnailTrigger]

// avatar thumbnail generate
exports.generateThumbnailAvartar = functions.region('asia-northeast1').storage.object().onFinalize(async (object) => {
// [END generateThumbnailTrigger]
// using functions.storage, make function of handling Cloud_Storage_event
// functions.storage.object(): 기본 스토리지 버킷의 객체 변경사항을 수신 대기합니다.
// onFinalize: 버킷에서 새 객체(또는 기존 객체의 새로운 세대)가 성공적으로 생성되면 발송됩니다. 여기에는 기존 객체 복사나 재작성이 포함됩니다. 실패한 업로드는 이 이벤트를 트리거하지 않습니다.
  // [START eventAttributes]
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  // [END eventAttributes]

  // [START stopConditions]
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    return console.log('This is not an image.');
  }
  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (!fileName.startsWith("avatar")) {
    return 0;
  }
  if (fileName.startsWith('thumb_')) {
    return console.log('Already a Thumbnail.');
  }
  // [END stopConditions]

  // [START thumbnailGeneration]
  // 2. Download file from bucket.
  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
  };
  await bucket.file(filePath).download({destination: tempFilePath});
  // console.log('Image downloaded locally to', tempFilePath);
  
  
  // 2. Generate a thumbnail using ImageMagick.
  
  var pixelSize = "100x100";
  await spawn('convert', [tempFilePath, '-thumbnail', pixelSize + '>', tempFilePath]);
  // console.log('Thumbnail created at', tempFilePath);
  const thumbFileName = "thumb_" + pixelSize + "_" + fileName;
  const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
  // 4. Uploading the thumbnail.
  await bucket.upload(tempFilePath, {
    destination: thumbFilePath,
    metadata: metadata
  });
  // Once the thumbnail has been uploaded delete the local file to free up disk space.
  return fs.unlinkSync(tempFilePath);
  // [END thumbnailGeneration]
});
// art thumbnail generate
exports.generateThumbnailArtHome = functions.region('asia-northeast1').storage.object().onFinalize(async (object) => {
// [END generateThumbnailTrigger]
// using functions.storage, make function of handling Cloud_Storage_event
// functions.storage.object(): 기본 스토리지 버킷의 객체 변경사항을 수신 대기합니다.
// onFinalize: 버킷에서 새 객체(또는 기존 객체의 새로운 세대)가 성공적으로 생성되면 발송됩니다. 여기에는 기존 객체 복사나 재작성이 포함됩니다. 실패한 업로드는 이 이벤트를 트리거하지 않습니다.
  // [START eventAttributes]
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  // [END eventAttributes]

  // [START stopConditions]
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    return console.log('This is not an image.');
  }

  // Get the file name.
  const fileName = path.basename(filePath);
  if (!fileName.startsWith("art")) {
    return 0;
  }
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith("thumb_150x150")) {
    return console.log("Already a Thumbnail.");
  }
  // [END stopConditions]

  // [START thumbnailGeneration]
  // 2. Download file from bucket.
  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
  };
  await bucket.file(filePath).download({destination: tempFilePath});
  // console.log('Image downloaded locally to', tempFilePath);
  // 2. Generate a thumbnail using ImageMagick.
  var pixelSizeHome = "150x150";
  await spawn('convert', [tempFilePath, '-thumbnail', pixelSizeHome + '>', tempFilePath]);
  // console.log('Thumbnail created at', tempFilePath);
  const thumbFileNameHome = "thumb_" + pixelSizeHome + "_" + fileName;
  const thumbFilePathHome = path.join(path.dirname(filePath), thumbFileNameHome);
  await bucket.upload(tempFilePath, {
    destination: thumbFilePathHome,
    metadata: metadata
  });
  return fs.unlinkSync(tempFilePath);
  // [END thumbnailGeneration]
});
exports.generateThumbnailArtArt = functions.region('asia-northeast1').storage.object().onFinalize(async (object) => {
// [END generateThumbnailTrigger]
// using functions.storage, make function of handling Cloud_Storage_event
// functions.storage.object(): 기본 스토리지 버킷의 객체 변경사항을 수신 대기합니다.
// onFinalize: 버킷에서 새 객체(또는 기존 객체의 새로운 세대)가 성공적으로 생성되면 발송됩니다. 여기에는 기존 객체 복사나 재작성이 포함됩니다. 실패한 업로드는 이 이벤트를 트리거하지 않습니다.
  // [START eventAttributes]
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  // [END eventAttributes]

  // [START stopConditions]
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    return console.log('This is not an image.');
  }

  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (!fileName.startsWith("art")) {
    return 0;
  }
  if (fileName.startsWith("thumb_300x300")) {
    return console.log("Already a Thumbnail.");
  }
  // [END stopConditions]

  // [START thumbnailGeneration]
  // 2. Download file from bucket.
  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
  };
  await bucket.file(filePath).download({destination: tempFilePath});
  // console.log('Image downloaded locally to', tempFilePath);
  // 2. Generate a thumbnail using ImageMagick.
  var pixelSizeArt = "300x300";
  // var pixelSizeCardList = "200x200";
  // var pixelSizeMyPage = "100x100";
  await spawn('convert', [tempFilePath, '-thumbnail', pixelSizeArt + '>', tempFilePath]);
  // console.log('Thumbnail created at', tempFilePath);
  const thumbFileNameArt = "thumb_" + pixelSizeArt + "_" + fileName;
  const thumbFilePathArt = path.join(path.dirname(filePath), thumbFileNameArt);
  await bucket.upload(tempFilePath, {
    destination: thumbFilePathArt,
    metadata: metadata
  });
  return fs.unlinkSync(tempFilePath);
  // [END thumbnailGeneration]
});
exports.generateThumbnailArtCardList = functions.region('asia-northeast1').storage.object().onFinalize(async (object) => {
// [END generateThumbnailTrigger]
// using functions.storage, make function of handling Cloud_Storage_event
// functions.storage.object(): 기본 스토리지 버킷의 객체 변경사항을 수신 대기합니다.
// onFinalize: 버킷에서 새 객체(또는 기존 객체의 새로운 세대)가 성공적으로 생성되면 발송됩니다. 여기에는 기존 객체 복사나 재작성이 포함됩니다. 실패한 업로드는 이 이벤트를 트리거하지 않습니다.
  // [START eventAttributes]
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  // [END eventAttributes]

  // [START stopConditions]
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    return console.log('This is not an image.');
  }

  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (!fileName.startsWith("art")) {
    return 0;
  }
  if (fileName.startsWith("thumb_200x200")) {
    return console.log("Already a Thumbnail.");
  }
  // [END stopConditions]

  // [START thumbnailGeneration]
  // 2. Download file from bucket.
  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
  };
  await bucket.file(filePath).download({destination: tempFilePath});
  // console.log('Image downloaded locally to', tempFilePath);
  // 2. Generate a thumbnail using ImageMagick.
  var pixelSizeCardList = "200x200";
  await spawn('convert', [tempFilePath, '-thumbnail', pixelSizeCardList + '>', tempFilePath]);
  // console.log('Thumbnail created at', tempFilePath);
  const thumbFileNameCardList = "thumb_" + pixelSizeCardList + "_" + fileName;
  const thumbFilePathCardList = path.join(path.dirname(filePath), thumbFileNameCardList);
  await bucket.upload(tempFilePath, {
    destination: thumbFilePathCardList,
    metadata: metadata
  });
  return fs.unlinkSync(tempFilePath);
  // [END thumbnailGeneration]
});
exports.generateThumbnailArtMyPage = functions.region("asia-northeast1").storage.object().onFinalize(async object => {
    // [END generateThumbnailTrigger]
    // using functions.storage, make function of handling Cloud_Storage_event
    // functions.storage.object(): 기본 스토리지 버킷의 객체 변경사항을 수신 대기합니다.
    // onFinalize: 버킷에서 새 객체(또는 기존 객체의 새로운 세대)가 성공적으로 생성되면 발송됩니다. 여기에는 기존 객체 복사나 재작성이 포함됩니다. 실패한 업로드는 이 이벤트를 트리거하지 않습니다.
    // [START eventAttributes]
    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name; // File path in the bucket.
    const contentType = object.contentType; // File content type.
    const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
    // [END eventAttributes]

    // [START stopConditions]
    // Exit if this is triggered on a file that is not an image.
    if (!contentType.startsWith("image/")) {
      return console.log("This is not an image.");
    }

    // Get the file name.
    const fileName = path.basename(filePath);
    // Exit if the image is already a thumbnail.
    if (!fileName.startsWith("art")) {
      return 0;
    }
    if (fileName.startsWith("thumb_100x100")) {
      return console.log("Already a Thumbnail.");
    }
    // [END stopConditions]

    // [START thumbnailGeneration]
    // 2. Download file from bucket.
    const bucket = admin.storage().bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = {
      contentType: contentType
    };
    await bucket.file(filePath).download({ destination: tempFilePath });
    // console.log("Image downloaded locally to", tempFilePath);
    // 2. Generate a thumbnail using ImageMagick.
    var pixelSizeMyPage = "100x100";
    await spawn("convert", [tempFilePath, "-thumbnail", pixelSizeMyPage + ">", tempFilePath]);
    // console.log("Thumbnail created at", tempFilePath);
    const thumbFileNameMyPage = "thumb_" + pixelSizeMyPage + "_" + fileName;
    const thumbFilePathMyPage = path.join(path.dirname(filePath),thumbFileNameMyPage);
    await bucket.upload(tempFilePath, {
      destination: thumbFilePathMyPage,
      metadata: metadata
    });
    return fs.unlinkSync(tempFilePath);
    // [END thumbnailGeneration]
});
// review thumbnail generate
exports.generateThumbnailReviewMain = functions.region("asia-northeast1").storage.object().onFinalize(async object => {
  // [END generateThumbnailTrigger]
  // using functions.storage, make function of handling Cloud_Storage_event
  // functions.storage.object(): 기본 스토리지 버킷의 객체 변경사항을 수신 대기합니다.
  // onFinalize: 버킷에서 새 객체(또는 기존 객체의 새로운 세대)가 성공적으로 생성되면 발송됩니다. 여기에는 기존 객체 복사나 재작성이 포함됩니다. 실패한 업로드는 이 이벤트를 트리거하지 않습니다.
  // [START eventAttributes]
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  // [END eventAttributes]

  // [START stopConditions]
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith("image/")) {
    return console.log("This is not an image.");
  }

  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (!fileName.startsWith("review")) {
    return 0;
  }
  if (fileName.startsWith("thumb_300x300")) {
    return console.log("Already a Thumbnail.");
  }
  // [END stopConditions]

  // [START thumbnailGeneration]
  // 2. Download file from bucket.
  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType
  };
  await bucket.file(filePath).download({ destination: tempFilePath });
  console.log("Image downloaded locally to", tempFilePath);
  // 2. Generate a thumbnail using ImageMagick.
  var pixelSizeMain = "300x300";
  await spawn("convert", [tempFilePath, "-thumbnail", pixelSizeMain + ">", tempFilePath]);
  console.log("Thumbnail created at", tempFilePath);
  const thumbFileNameMain = "thumb_" + pixelSizeMain + "_" + fileName;
  const thumbFilePathMain = path.join(path.dirname(filePath),thumbFileNameMain);
  await bucket.upload(tempFilePath, {
    destination: thumbFilePathMain,
    metadata: metadata
  });
  return fs.unlinkSync(tempFilePath);
  // [END thumbnailGeneration]
});
exports.generateThumbnailReviewCardList = functions.region("asia-northeast1").storage.object().onFinalize(async object => {
  // [END generateThumbnailTrigger]
  // using functions.storage, make function of handling Cloud_Storage_event
  // functions.storage.object(): 기본 스토리지 버킷의 객체 변경사항을 수신 대기합니다.
  // onFinalize: 버킷에서 새 객체(또는 기존 객체의 새로운 세대)가 성공적으로 생성되면 발송됩니다. 여기에는 기존 객체 복사나 재작성이 포함됩니다. 실패한 업로드는 이 이벤트를 트리거하지 않습니다.
  // [START eventAttributes]
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  // [END eventAttributes]

  // [START stopConditions]
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith("image/")) {
    return console.log("This is not an image.");
  }

  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (!fileName.startsWith("review")) {
    return 0;
  }
  if (fileName.startsWith("thumb_200x200")) {
    return console.log("Already a Thumbnail.");
  }
  // [END stopConditions]

  // [START thumbnailGeneration]
  // 2. Download file from bucket.
  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType
  };
  await bucket.file(filePath).download({ destination: tempFilePath });
  console.log("Image downloaded locally to", tempFilePath);
  // 2. Generate a thumbnail using ImageMagick.
  var pixelSizeCardList = "200x200";
  await spawn("convert", [tempFilePath,"-thumbnail",pixelSizeCardList + ">",tempFilePath]);
  console.log("Thumbnail created at", tempFilePath);
  const thumbFileNameCardList = "thumb_" + pixelSizeCardList + "_" + fileName;
  const thumbFilePathCardList = path.join(path.dirname(filePath),thumbFileNameCardList);
  await bucket.upload(tempFilePath, {
    destination: thumbFilePathCardList,
    metadata: metadata
  });
  return fs.unlinkSync(tempFilePath);
  // [END thumbnailGeneration]
});
exports.generateThumbnailReviewMyPage = functions.region("asia-northeast1").storage.object().onFinalize(async object => {
  // [END generateThumbnailTrigger]
  // using functions.storage, make function of handling Cloud_Storage_event
  // functions.storage.object(): 기본 스토리지 버킷의 객체 변경사항을 수신 대기합니다.
  // onFinalize: 버킷에서 새 객체(또는 기존 객체의 새로운 세대)가 성공적으로 생성되면 발송됩니다. 여기에는 기존 객체 복사나 재작성이 포함됩니다. 실패한 업로드는 이 이벤트를 트리거하지 않습니다.
  // [START eventAttributes]
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  // [END eventAttributes]

  // [START stopConditions]
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith("image/")) {
    return console.log("This is not an image.");
  }

  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (!fileName.startsWith("review")) {
    return 0;
  }
  if (fileName.startsWith("thumb_100x100")) {
    return console.log("Already a Thumbnail.");
  }
  // [END stopConditions]

  // [START thumbnailGeneration]
  // 2. Download file from bucket.
  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType
  };
  await bucket.file(filePath).download({ destination: tempFilePath });
  console.log("Image downloaded locally to", tempFilePath);
  // 2. Generate a thumbnail using ImageMagick.
  var pixelSizeMyPage = "100x100";
  await spawn("convert", [tempFilePath,"-thumbnail",pixelSizeMyPage + ">",tempFilePath]);
  console.log("Thumbnail created at", tempFilePath);
  const thumbFileNameMyPage = "thumb_" + pixelSizeMyPage + "_" + fileName;
  const thumbFilePathMyPage = path.join(path.dirname(filePath),thumbFileNameMyPage);
  await bucket.upload(tempFilePath, {
    destination: thumbFilePathMyPage,
    metadata: metadata
  });
  return fs.unlinkSync(tempFilePath);
  // [END thumbnailGeneration]
});


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions