-- CreateTable
CREATE TABLE "AnnotationProject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnnotationProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnotationSituation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "AnnotationSituation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnotationFrame" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "situationId" INTEGER NOT NULL,

    CONSTRAINT "AnnotationFrame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Annotation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "posX" DOUBLE PRECISION NOT NULL,
    "posY" DOUBLE PRECISION NOT NULL,
    "frameId" INTEGER NOT NULL,

    CONSTRAINT "Annotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnotationComment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "situationId" INTEGER NOT NULL,

    CONSTRAINT "AnnotationComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnnotationSituation" ADD CONSTRAINT "AnnotationSituation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "AnnotationProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnotationFrame" ADD CONSTRAINT "AnnotationFrame_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "AnnotationSituation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annotation" ADD CONSTRAINT "Annotation_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "AnnotationFrame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnotationComment" ADD CONSTRAINT "AnnotationComment_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "AnnotationSituation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
