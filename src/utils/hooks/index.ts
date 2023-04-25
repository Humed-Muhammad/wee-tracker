interface IDownloadProps {
  downloadFile: string;
  name: string;
}
export const useDownload = ({ downloadFile, name }: IDownloadProps) => {
  const link = document.createElement("a");
  link.href = downloadFile;
  link.setAttribute("download", `${name}`);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};
