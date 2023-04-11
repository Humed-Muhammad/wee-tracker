/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ICreatePdf } from "@/types";
import { convertUnits, createTableForPdf } from "./baseUtils";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

/**@Pdf export */
export async function exportToPdf(args: ICreatePdf) {
  const doc = new jsPDF("p", "px");

  const elements = document.getElementsByClassName(args.classSelector);

  await creatPdf({ ...args, doc, elements });

  doc.save(`export.pdf`);
}

async function creatPdf({
  doc,
  elements,
  title,
  weeData,
  averageWee,
  chartTitle,
}: ICreatePdf) {
  let top = 300;
  const padding = 10;

  const data: Array<Array<string | number>> = createTableForPdf(weeData);

  const head = [
    [
      "Date",
      "Time",
      "Amount In ML",
      "Amount In fl. oz.",
      "Urgency",
      "Inconsistency",
    ],
  ];

  doc?.text(title, 20, 20);

  autoTable(doc, {
    head: head,
    body: data.concat([
      ["", "Average wee", `${averageWee}`, convertUnits(averageWee, "fl. oz.")],
    ]),
  });

  doc?.setLineHeightFactor(10);
  doc?.text(chartTitle, 200, top - 30, {
    align: "center",
  });

  // for (let i = 0; i < Number(elements?.length); i++) {
  const el = elements?.item(0) as HTMLElement;
  const imgData = await toPng(el);

  let elHeight = el.offsetHeight;
  let elWidth = el.offsetWidth;

  const pageWidth = doc?.internal.pageSize.getWidth();

  if (elWidth > pageWidth!) {
    const ratio = pageWidth! / elWidth;
    elHeight = elHeight * ratio - padding;
    elWidth = elWidth * ratio - padding;
  }

  const pageHeight = doc?.internal.pageSize.getHeight();

  doc?.addImage(imgData, "PNG", padding, top, elWidth, elHeight, `image`);

  if (top + elHeight > pageHeight!) {
    doc?.addPage();
    top = 20;
  }
  // }
  doc?.text("Powered By Roy&Co", 200, Number(pageHeight) - 50, {
    align: "center",
  });
}
