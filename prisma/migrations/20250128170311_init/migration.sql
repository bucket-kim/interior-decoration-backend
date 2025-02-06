-- CreateTable
CREATE TABLE "Furnitures" (
    "id" TEXT NOT NULL,
    "modelIndex" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "positionX" DOUBLE PRECISION NOT NULL,
    "positionY" DOUBLE PRECISION NOT NULL,
    "positionZ" DOUBLE PRECISION NOT NULL,
    "rotationX" DOUBLE PRECISION NOT NULL,
    "rotationY" DOUBLE PRECISION NOT NULL,
    "rotationZ" DOUBLE PRECISION NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Furnitures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Furnitures" ADD CONSTRAINT "Furnitures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
