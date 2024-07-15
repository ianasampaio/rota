-- DropIndex
DROP INDEX "clients_user_id_idx";

-- DropIndex
DROP INDEX "products_user_id_idx";

-- DropIndex
DROP INDEX "sales_client_id_idx";

-- DropIndex
DROP INDEX "sales_shipment_id_idx";

-- DropIndex
DROP INDEX "sales_user_id_idx";

-- DropIndex
DROP INDEX "shipments_user_id_idx";

-- AlterTable
ALTER TABLE "shipments" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
