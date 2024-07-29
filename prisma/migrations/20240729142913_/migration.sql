/*
  Warnings:

  - You are about to drop the column `description` on the `Annotation` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `AnnotationComment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Annotation" DROP CONSTRAINT "Annotation_frameId_fkey";

-- DropForeignKey
ALTER TABLE "AnnotationComment" DROP CONSTRAINT "AnnotationComment_situationId_fkey";

-- DropForeignKey
ALTER TABLE "AnnotationFrame" DROP CONSTRAINT "AnnotationFrame_situationId_fkey";

-- DropForeignKey
ALTER TABLE "AnnotationSituation" DROP CONSTRAINT "AnnotationSituation_projectId_fkey";

-- AlterTable
ALTER TABLE "Annotation" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "AnnotationComment" DROP COLUMN "description";

-- AddForeignKey
ALTER TABLE "AnnotationSituation" ADD CONSTRAINT "AnnotationSituation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "AnnotationProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnotationFrame" ADD CONSTRAINT "AnnotationFrame_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "AnnotationSituation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annotation" ADD CONSTRAINT "Annotation_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "AnnotationFrame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnotationComment" ADD CONSTRAINT "AnnotationComment_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "AnnotationSituation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
