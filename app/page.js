import FilesList from "@/components/FilesList";
import UploadFile from "@/components/UploadFile";

export default function Home() {
  return (
    <div className="mt-10 mx-30">
      <UploadFile />
      <FilesList />
    </div>
  );
}
