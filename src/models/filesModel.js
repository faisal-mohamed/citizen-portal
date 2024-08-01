import { Storage } from "aws-amplify";
import awsmobile from "../aws-exports";
import { Warning } from "../Utilities/helpers";

const file = {
  upload: async (fileObject) => {
    try {
      const originalFileName = fileObject.name.split(".")[0].replace(/ /g, "");
      if (originalFileName.length > 100) {
        Warning("file name shouldn't exceed 100 characters!")
        return {
          err: "file name shouldn't exceed 100 characters",
        };
      }

      const ext = fileObject.name.split(".").pop();
      const newFileName = `${originalFileName}${Date.now()}.${ext}`;
      console.log("newFilename",newFileName);
      const result = await Storage.put(newFileName, fileObject, {});
      return `https://${awsmobile.aws_user_files_s3_bucket}.s3.${awsmobile.aws_user_files_s3_bucket_region}.amazonaws.com/public/${result.key}`;
    } catch (error) {
      console.error(error);
    }
  },
  // delete: async (fileName) => {
  //   try {
  //     const result = await Storage.remove(fileName);
  //     console.log("resilt", result);
  //     return result;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
};

export { file };
