/*
  Warnings:

  - Added the required column `baseValue` to the `shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saleValue` to the `shipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shipments" ADD COLUMN     "baseValue" INTEGER NOT NULL,
ADD COLUMN     "saleValue" INTEGER NOT NULL;
