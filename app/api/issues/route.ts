import { createIssueSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { orgId } = auth();
  if (!orgId) {
    return NextResponse.json({ error: "OrgId not found" }, { status: 400 });
  }
  const body = await request.json();
  const validation = createIssueSchema.safeParse({ ...body, orgId });
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      orgId: orgId,
    },
  });

  return NextResponse.json(newIssue, { status: 200 });
}
