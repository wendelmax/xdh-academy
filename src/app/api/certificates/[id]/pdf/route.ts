import { NextRequest, NextResponse } from "next/server";
import { findCertificateById } from "@/lib/certificates";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import path from "path";
import fs from "fs/promises";

const LEVEL_PDF_STYLE: Record<
  string,
  { rgb: [number, number, number]; label: string }
> = {
  foundation: { rgb: [13, 148, 136], label: "FOUNDATION" },
  practitioner: { rgb: [37, 99, 235], label: "PRACTITIONER" },
  expert: { rgb: [217, 119, 6], label: "EXPERT" },
  ai: { rgb: [99, 102, 241], label: "AI" },
};

const DEFAULT_LEVEL_STYLE = LEVEL_PDF_STYLE.foundation;

function getBaseUrl(request: NextRequest): string {
  const url = request.url ? new URL(request.url) : null;
  if (url?.origin) return url.origin;
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://xgh-academy.vercel.app";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cert = await findCertificateById(id);
  if (!cert || !cert.passed) {
    return NextResponse.json(
      { error: "Certificado não encontrado ou inválido." },
      { status: 404 }
    );
  }

  const baseUrl = getBaseUrl(request);
  const certificateUrl = `${baseUrl}/validar?id=${cert.certificateId}`;

  let badgeDataUrl: string | null = null;
  try {
    const badgePath = path.join(process.cwd(), "public", "badges", `${cert.level}.png`);
    const buffer = await fs.readFile(badgePath);
    badgeDataUrl = `data:image/png;base64,${buffer.toString("base64")}`;
  } catch {
    badgeDataUrl = null;
  }

  let sealDataUrl: string | null = null;
  try {
    const sealPath = path.join(process.cwd(), "public", "xgh-certificacao-badge.png");
    const sealBuffer = await fs.readFile(sealPath);
    sealDataUrl = `data:image/png;base64,${sealBuffer.toString("base64")}`;
  } catch {
    sealDataUrl = null;
  }

  let qrDataUrl: string | null = null;
  try {
    qrDataUrl = await QRCode.toDataURL(certificateUrl, {
      width: 400,
      margin: 1,
      color: { dark: "#1a1a1a", light: "#ffffff" },
    });
  } catch {
    qrDataUrl = null;
  }

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const w = 297;
  const h = 210;
  const levelStyle = LEVEL_PDF_STYLE[cert.level] ?? DEFAULT_LEVEL_STYLE;
  const [r, g, b] = levelStyle.rgb;
  const margin = 12;

  // Background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, w, h, "F");

  // Subtle Outer Border
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.2);
  doc.rect(4, 4, w - 8, h - 8, "S");

  // Main Border Frame
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(1.5);
  doc.rect(margin, margin, w - 2 * margin, h - 2 * margin, "S");

  // Inset Decorative Border
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(0.3);
  doc.rect(margin + 1.5, margin + 1.5, w - 2 * (margin + 1.5), h - 2 * (margin + 1.5), "S");

  // Top Bar Decoration
  doc.setFillColor(r, g, b);
  doc.rect(margin, margin, w - 2 * margin, 15, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("XGH ACADEMY", margin + 10, margin + 9);
  doc.text("CERTIFICADO DE CONCLUSÃO", w - margin - 10, margin + 9, { align: "right" });

  const centerX = w / 2;

  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Certificamos que", centerX, 65, { align: "center" });

  doc.setTextColor(r, g, b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(42);
  doc.text(cert.participantName, centerX, 85, { align: "center" });

  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("concluiu com aprovação o exame de", centerX, 105, { align: "center" });

  doc.setTextColor(r, g, b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(cert.levelName, centerX, 115, { align: "center" });

  if (cert.level === "ai") {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("XGH-AI — Promptou, rodou, subiu.", centerX, 120, { align: "center" });
  }

  doc.setTextColor(80, 80, 80);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const emitidoY = cert.level === "ai" ? 130 : 128;
  doc.text("Emitido por XGH Academy — Programa Global de Certificação", centerX, emitidoY, { align: "center" });

  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.5);
  doc.line(centerX - 40, 140, centerX + 40, 140);

  const issuedDate = new Date(cert.issuedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Pontuação: ${cert.score}%  |  Emitido em ${issuedDate}`, centerX, 150, { align: "center" });

  // Bottom Elements (Badge and QR)

  // Left Bottom: Badge
  if (badgeDataUrl) {
    const badgeW = 35;
    const badgeH = 41;
    const badgeX = margin + 20;
    const badgeY = h - margin - 55;

    // Badge Container
    doc.setFillColor(252, 252, 252);
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.2);
    doc.roundedRect(badgeX - 5, badgeY - 5, badgeW + 10, badgeH + 10, 3, 3, "FD");

    doc.addImage(badgeDataUrl, "PNG", badgeX, badgeY, badgeW, badgeH);
  }

  // Right Bottom: QR Code
  if (qrDataUrl) {
    const qrSize = 30;
    const qrX = w - margin - 50;
    const qrY = h - margin - 55;

    // QR Code Container
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.2);
    doc.roundedRect(qrX - 3, qrY - 3, qrSize + 6, qrSize + 15, 2, 2, "FD");

    doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.setTextColor(r, g, b);
    doc.text("VALIDAR AUTENTICIDADE", qrX + qrSize / 2, qrY + qrSize + 6, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.text("Escaneie para validar", qrX + qrSize / 2, qrY + qrSize + 9, { align: "center" });
  }

  if (sealDataUrl) {
    const sealSize = 26;
    const sealX = margin + 8;
    const sealY = margin + 18;
    doc.addImage(sealDataUrl, "PNG", sealX, sealY, sealSize, sealSize);
  }

  doc.setFont("courier", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`${cert.certificateId}`, centerX, h - margin - 8, { align: "center" });

  const fileName =
    cert.level === "ai"
      ? `XGH-AI-Vibe-Coder-${cert.certificateId}.pdf`
      : `XGH-Academy-${cert.certificateId}.pdf`;

  const blob = doc.output("arraybuffer");
  return new NextResponse(blob, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}

