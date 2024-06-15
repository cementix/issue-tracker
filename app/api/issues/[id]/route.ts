import { updateIssueSchema } from "@/app/validations";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const validation = updateIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  if (body.assignedToUserId && body.assignedToUserId !== "unassigned") {
    const user = await prisma.user.findUnique({
      where: {
        id: body.assignedToUserId,
      },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  const foundIssue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!foundIssue)
    return NextResponse.json({ error: "Invalid issue id" }, { status: 404 });

  if (body.assignedToUserId !== "unassigned") {
    const updatedIssue = await prisma.issue.update({
      where: {
        id: foundIssue.id,
      },
      data: body,
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  } else {
    const { assignedToUserId, ...rest } = body;
    const updatedIssue = await prisma.issue.update({
      where: {
        id: foundIssue.id,
      },
      data: { ...rest, assignedToUserId: null },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  }
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
