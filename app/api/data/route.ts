import { NextResponse } from "next/server";
import { generateData } from "@/lib/dataGenerator";

export async function GET() {
  const data = generateData(1000);
  return NextResponse.json(data);
}
