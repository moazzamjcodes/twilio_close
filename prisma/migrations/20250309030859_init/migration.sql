-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "close_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_close_id_key" ON "Member"("close_id");

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");
