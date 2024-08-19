-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "shipments" ADD COLUMN     "status" "ShipmentStatus" NOT NULL DEFAULT 'OPEN';
