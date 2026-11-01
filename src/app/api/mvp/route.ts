import { handleAcademicRequest } from "@/features/investment/services/academicApi.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const GET = handleAcademicRequest;
export const POST = handleAcademicRequest;
