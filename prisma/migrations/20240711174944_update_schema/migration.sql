/*
  Warnings:

  - You are about to alter the column `value` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `sale_products` table. All the data in the column will be lost.
  - You are about to drop the column `shipment_id` on the `sale_products` table. All the data in the column will be lost.
  - You are about to alter the column `value` on the `sales` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `price` on the `shipment_products` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `user_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `sale_products` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `sales` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `value` to the `shipment_products` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `shipment_products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `user_id` to the `shipments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ShipmentProductStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('OPEN', 'PARTIALLY_PAID', 'PAID');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CASH', 'PIX', 'CARD');

-- DropForeignKey
ALTER TABLE "sale_products" DROP CONSTRAINT "sale_products_shipment_id_fkey";

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "type",
ADD COLUMN     "type" "PaymentType" NOT NULL,
ALTER COLUMN "value" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "price",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sale_products" DROP COLUMN "price",
DROP COLUMN "shipment_id",
ADD COLUMN     "shipment_product_id" UUID,
ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sales" ALTER COLUMN "shipment_id" DROP NOT NULL,
ALTER COLUMN "value" SET DATA TYPE INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" "SaleStatus" NOT NULL;

-- AlterTable
ALTER TABLE "shipment_products" DROP COLUMN "price",
ADD COLUMN     "value" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ShipmentProductStatus" NOT NULL;

-- AlterTable
ALTER TABLE "shipments" ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "clients_user_id_idx" ON "clients"("user_id");

-- CreateIndex
CREATE INDEX "products_user_id_idx" ON "products"("user_id");

-- CreateIndex
CREATE INDEX "sales_user_id_idx" ON "sales"("user_id");

-- CreateIndex
CREATE INDEX "sales_client_id_idx" ON "sales"("client_id");

-- CreateIndex
CREATE INDEX "sales_shipment_id_idx" ON "sales"("shipment_id");

-- CreateIndex
CREATE INDEX "sales_status_idx" ON "sales"("status");

-- CreateIndex
CREATE INDEX "shipments_user_id_idx" ON "shipments"("user_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_products" ADD CONSTRAINT "sale_products_shipment_product_id_fkey" FOREIGN KEY ("shipment_product_id") REFERENCES "shipment_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
