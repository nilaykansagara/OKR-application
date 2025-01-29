-- CreateTable
CREATE TABLE "Objective" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Objective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyResult" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "initial_value" INTEGER NOT NULL,
    "current_value" INTEGER NOT NULL,
    "target_value" INTEGER NOT NULL,
    "metrics" TEXT NOT NULL,
    "objectiveId" INTEGER NOT NULL,

    CONSTRAINT "KeyResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KeyResult" ADD CONSTRAINT "KeyResult_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "Objective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
