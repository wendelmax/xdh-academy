import { NextRequest, NextResponse } from "next/server";
import { buildExam, certificationLevels, type CertificationLevel } from "@/data/certification";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level") as CertificationLevel | null;

  if (!level || !certificationLevels.some((l) => l.id === level)) {
    return NextResponse.json(
      { error: "Nível inválido. Use foundation, practitioner, expert ou ai." },
      { status: 400 }
    );
  }

  const questions = buildExam(level).map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
  }));

  const levelInfo = certificationLevels.find((l) => l.id === level)!;

  return NextResponse.json({
    level: levelInfo.id,
    levelName: levelInfo.name,
    durationMinutes: levelInfo.durationMinutes,
    minScore: levelInfo.minScore,
    questions,
  });
}
