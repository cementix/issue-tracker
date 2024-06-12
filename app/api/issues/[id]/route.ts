import { issueSchema } from "@/app/validations";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const deletedIssue = await prisma.issue.delete({
    where: {
      id: params.id,
    },
  });

  if (!deletedIssue)
    return NextResponse.json({ error: "Invalid issue id" }, { status: 404 });

  return NextResponse.json("Issue successfully deleted!", { status: 200 });
}
