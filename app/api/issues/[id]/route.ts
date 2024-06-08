import { issueSchema } from "@/app/validations";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const foundIssue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!foundIssue)
    return NextResponse.json({ error: "Invalid issue id" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: foundIssue.id,
    },
    data: body,
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}
