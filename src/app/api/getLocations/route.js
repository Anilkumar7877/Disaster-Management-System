import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const locations = await prisma.allLocations.findMany();
        return NextResponse.json(locations, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching locations data", error: error.message },
            { status: 500 }
        );
    }
}
