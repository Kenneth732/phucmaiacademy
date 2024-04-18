import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const { title, categoryId, subCategoryId } = await req.json();

    const course = await db.course.create({
      data: {
        instructorId: userId,
        title,
        categoryId,
        subCategoryId
      },
    });

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log("[courses_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
