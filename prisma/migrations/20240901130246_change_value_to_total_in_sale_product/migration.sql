/*
  Warnings:

  - You are about to drop the column `value` on the `sale_products` table. All the data in the column will be lost.
  - Added the required column `total` to the `sale_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale_products" DROP COLUMN "value",
ADD COLUMN     "total" INTEGER NOT NULL;
