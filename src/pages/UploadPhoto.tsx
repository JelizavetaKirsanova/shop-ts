
import { Button, Input, Progress } from "@chakra-ui/react"
import { useState } from "react"
import uploadFile from "../services/firebase/uploadFile"
import { getDownloadURL } from "@firebase/storage"

function UploadPhoto(){
    const[file, setFile] = useState<FileList | null>()
    const[percent, setPercent] = useState(0)
    
    const handleSubmit = async ()=>{
        if(!file){
            alert("no file")
            return
        }
        const image = file[0]

        const uploadTask = uploadFile(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
        

    }

    return(
        <div>
            <Input onChange={(event)=>{setFile(event.target.files)}} type="file"/>
            {percent>0 && <Progress value={percent}/>}
            <Button onClick={handleSubmit}>Upload file</Button>
        </div>
    )
}

export default UploadPhoto