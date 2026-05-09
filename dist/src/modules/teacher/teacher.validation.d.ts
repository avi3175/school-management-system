import { z } from "zod";
export declare const createTeacherSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodEnum<{
        TEACHER: "TEACHER";
    }>;
    designation: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateTeacherSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    designation: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=teacher.validation.d.ts.map