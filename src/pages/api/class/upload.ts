import nextConnect from "next-connect";
import multer from "multer";
import uploadConfig from "../../../config/upload";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { deleteFile } from "../../../utils/file";
import fs from "fs";
import pdf from "pdf-parse";

const upload = multer(uploadConfig);

const apiRoute = nextConnect({
  onError(error, req, res: NextApiResponse, next) {
    res.status(500).json({ error: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: req.method });
  },
});

apiRoute.use(upload.single("file"));

interface Data extends NextApiRequest {
  file: {
    path: string;
  };
}

apiRoute.post(async (req: Data, res) => {
  console.log(req.file);
  const { file } = req;
  const readFilePdf = await fs.promises.readFile(file.path);
  const data = await pdf(readFilePdf);
  const matchTotalPay = /(?<=Total a Pagar\s.*)\n.*/gi;
  const matchDateVen = /(?<=Data de Vencimento)(\n.*$)/gm;
  const matchDateEmit = /(?<=Data de Emissão:)\s.*/gi;
  const totalPay = data.text.match(matchTotalPay)?.toString().trim();
  const date = data.text.match(matchDateVen)?.find((item) => item);
  const dateEmit = data.text.match(matchDateEmit)?.find((item) => {
    return item.trim();
  });
  const f = /(?<=n)\w.+$/gm;
  const d = date?.match(f);
  console.log("d", d);
  const dataJson = {
    valorTotal: totalPay,
    Vencimento: date,
    Emissão: dateEmit,
  };
  console.log(dataJson);

  await fs.promises.unlink(file.path);
  return res.json(dataJson);
});
export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
