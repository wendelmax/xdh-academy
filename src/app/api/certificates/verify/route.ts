import { NextRequest, NextResponse } from "next/server";
import {
  findCertificateById,
  findCertificatesByParticipant,
} from "@/lib/certificates";

export async function GET(_request: NextRequest) {
  try {
    const { searchParams } = new URL(_request.url);
    const id = searchParams.get("id");
    const participant = searchParams.get("participant");

    if (id) {
      const cert = await findCertificateById(id);
      if (!cert) {
        return NextResponse.json(
          { valid: false, error: "Certificado não encontrado." },
          { status: 404 }
        );
      }
      return NextResponse.json({ valid: true, certificate: cert });
    }

    if (participant) {
      const certs = (await findCertificatesByParticipant(participant)).filter(
        (c) => c.passed
      );
      return NextResponse.json({
        valid: certs.length > 0,
        certificates: certs,
      });
    }

    return NextResponse.json(
      { error: "Informe id ou participant na query." },
      { status: 400 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro ao verificar certificado.";
    return NextResponse.json(
      { error: message, valid: false },
      { status: 500 }
    );
  }
}
