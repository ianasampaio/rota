/*
  Warnings:

  - Added the required column `quantity` to the `sale_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale_products" ADD COLUMN     "quantity" INTEGER NOT NULL;
