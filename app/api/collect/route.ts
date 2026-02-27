import { NextResponse } from "next/server";

// import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // const client = await clientPromise;
    // const db = client.db("dna-hub");

    // await db.collection("events").insertOne({
    //   ...body,
    //   received_at: Date.now()
    // });

    return NextResponse.json({ status: "ok (db disabled)" });
  } catch (error) {
    console.error("Error in /api/collect:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
