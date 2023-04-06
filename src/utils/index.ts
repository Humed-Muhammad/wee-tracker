import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

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

export async function exportMultipleChartsToPdf() {
  console.log("first");
  const doc = new jsPDF("p", "px"); // (1)

  const elements = document.getElementsByClassName("chart-container"); // (2)
  console.log(elements);
  await creatPdf({ doc, elements }); // (3-5)

  doc.save(`charts.pdf`); // (6)
}

async function creatPdf({
  doc,
  elements,
}: {
  doc: jsPDF;
  elements: HTMLCollectionOf<Element>;
}) {
  let top = 20;
  const padding = 10;

  for (let i = 0; i < elements.length; i++) {
    const el = elements.item(i) as HTMLElement;
    const imgData = await toPng(el);

    let elHeight = el.offsetHeight;
    let elWidth = el.offsetWidth;

    const pageWidth = doc.internal.pageSize.getWidth();

    if (elWidth > pageWidth) {
      const ratio = pageWidth / elWidth;
      elHeight = elHeight * ratio - padding;
      elWidth = elWidth * ratio - padding;
    }

    const pageHeight = doc.internal.pageSize.getHeight();

    if (top + elHeight > pageHeight) {
      doc.addPage();
      top = 20;
    }

    doc.addImage(imgData, "PNG", padding, top, elWidth, elHeight, `image${i}`);
    top += elHeight;
  }
}
