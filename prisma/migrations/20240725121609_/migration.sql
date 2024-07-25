-- AlterTable
ALTER TABLE "AnnotationProject" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "AnnotationProject" ADD CONSTRAINT "AnnotationProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
