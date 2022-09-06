import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Routes } from "../../../constants/routes";
import { UiFileInputButton } from "src/components/ui-file-input-button/UiFileInputButton";
import {
  deleteFileRequest,
  getListFiles,
  uploadFileRequest,
} from "../../../domains/upload/upload.services";
import Image from "next/image";

const s = {
  wrapper: `flex-1 flex flex-col mx-auto container`,
  title: `text-3xl p-4 text-center`,
  fileItem: `flex flex-col justify-center mx-8`,
  fileSmallItem: `p-4 m-2 rounded border-[2px] border-[#C19A30] flex items-center justify-between hover:scale-[1.01] hover:bg-[#C19A30] hover:cursor-pointer`,
  delButton: `w-[40px] h-[40px] rounded-full bg-gray-500 flex justify-center items-center hover:bg-white`,
};

export const UploadPage: React.FC = () => {
  const [user, setUser] = useState("phongbd");
  const [fileName, setFileName] = useState("Maxillary-1.stl");
  const [data, setData] = useState([]);

  const uploadHandler = async (formData: FormData) => {
    const response = await uploadFileRequest(user, formData, (event) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total)
      );
    });

    console.log("Response::", response.data);
    getFilesInfoHandler();
  };

  const deleteHandler = async (userId: string, fileName: string) => {
    console.log("Delete File::", { userId, fileName });

    const res = await deleteFileRequest(userId, fileName, (event) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total)
      );
    });
    console.log("Response::", res);
  };

  const getFilesInfoHandler = async () => {
    const { data, error }: any = await getListFiles(user, (event) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total)
      );
    });
    if (error)
      console.log(
        "[GetFilesInfo] [UploadPage] Response::",
        JSON.stringify(error)
      );
    if (data) setData(data);
  };

  const preDeleteHandler = (dat: any) => {
    const exist =
      dat.includes("Mandibular") | dat.includes("Maxillary")
        ? dat.replace(`./public/uploads/${user}/`, "")
        : undefined;
    console.log({ exist });
    deleteHandler(user, exist);
    getFilesInfoHandler();
  };

  const fileChangedHandler = (event: any) => {
    const { files } = event.target;

    for (let i = 0; i < files.length; i++) {
      if (
        files[i].name.includes("Maxillary") ||
        files[i].name.includes("Mandibular")
      ) {
        console.log("File::", files[i]);
      }
    }
  };

  useEffect(() => {
    getFilesInfoHandler();
  }, []);

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Upload</h1>
      {/* <p>This is the Upload page</p> */}

      <div>
        <UiFileInputButton
          label="Upload Multiple Files"
          uploadFileName="theFiles"
          onChange={uploadHandler}
          allowMultipleFiles={true}
        />
      </div>
      {data &&
        Object.keys(data).map((key, index) => (
          <div key={index} className={s.fileItem}>
            {Object.keys(data[key]).map((k, i) => (
              <div key={i} className={s.fileSmallItem}>
                <p>{data[key][k]}</p>

                <button
                  className={s.delButton}
                  onClick={() => preDeleteHandler(data[key][k])}
                >
                  <Image
                    src={"/assets/icons/delete.svg"}
                    height={20}
                    width={20}
                    alt={"deleteIcon"}
                  />
                </button>
              </div>
            ))}
          </div>
        ))}
      <p>
        <Link href={Routes.Index}>
          <a>Go home</a>
        </Link>
      </p>
    </div>
  );
};

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string; // remember to make these attributes optional....
    webkitdirectory?: string;
  }
}

UploadPage.displayName = "UploadPage";
