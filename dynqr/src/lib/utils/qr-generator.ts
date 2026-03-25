import QRCode from "qrcode";

export async function generatePngDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    type: "image/png",
    margin: 1,
    width: 512,
  });
}

export async function generateSvgText(text: string): Promise<string> {
  return QRCode.toString(text, {
    type: "svg",
    margin: 1,
    width: 512,
  });
}