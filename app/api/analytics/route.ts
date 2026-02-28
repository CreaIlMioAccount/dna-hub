import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("dna_hub");

  const data = await db
    .collection("analytics")
    .find({})
    .sort({ date: -1 })
    .limit(1)
    .toArray();

  return NextResponse.json(data[0]);
}
