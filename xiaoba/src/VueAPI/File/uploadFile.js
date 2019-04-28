
import { reqUploadFile, reqRemoveUploadFile } from "../../api";
export function uploadFile(uploader){
    var form = new FormData();
    form.append("uploadFile", uploader.file);
    form.append("purpose", "COURSE_BACKGROUND");
    var config = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: progressEvent => {
        if (progressEvent.lengthComputable) {
          let percent =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            console.log(progressEvent.lengthComputable)
          uploader.onProgress({
            percent,status:"success"
          });
        }
      }
    };

    const result = reqUploadFile(form, config);
    console.log(111)
    if (result.code == 0) {
        alert(333)
        // var uploadResult = {
        //   originname: "",
        //   newname: result.data.name
        // };
        // commit(REQUEST_UPLOAD_FILE, uploadResult);
  
        //this.ruleForm.images.push(image);
      }
}