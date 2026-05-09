import { z } from "zod";
export declare const createStudentSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodEnum<{
        STUDENT: "STUDENT";
    }>;
    classId: z.ZodString;
    sectionId: z.ZodString;
    roll: z.ZodNumber;
    parentName: z.ZodOptional<z.ZodString>;
    parentPhone: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=student.validation.d.ts.map