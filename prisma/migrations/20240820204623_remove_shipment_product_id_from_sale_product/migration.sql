/*
  Warnings:

  - You are about to drop the column `shipment_product_id` on the `sale_products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sale_products" DROP CONSTRAINT "sale_products_shipment_product_id_fkey";

-- AlterTable
ALTER TABLE "sale_products" DROP COLUMN "shipment_product_id";
