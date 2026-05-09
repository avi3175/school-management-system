import { createStudentService, getAllStudentsService, getSingleStudentService, updateStudentService, deleteStudentService, } from "./student.service.js";
import { createStudentSchema } from "./student.validation.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../../utils/asyncHandler.js";
// ➕ Create Student
export const createStudent = async (req, res) => {
    try {
        const validated = createStudentSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(validated.password, 10);
        const student = await createStudentService({
            ...validated,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            data: student,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
// 📥 Get All Students
export const getAllStudents = asyncHandler(async (req, res) => {
    const result = await getAllStudentsService(req.query);
    res.json({
        success: true,
        data: result.students,
        meta: result.meta,
    });
});
// 📄 Get Single Student
export const getSingleStudent = asyncHandler(async (req, res) => {
    const id = typeof req.params.id === "string" ? req.params.id : null;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Invalid student id",
        });
    }
    const student = await getSingleStudentService(id);
    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found",
        });
    }
    res.json({
        success: true,
        data: student,
    });
});
// ✏️ Update Student
export const updateStudent = asyncHandler(async (req, res) => {
    const id = typeof req.params.id === "string" ? req.params.id : null;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Invalid student id",
        });
    }
    const student = await updateStudentService(id, req.body);
    res.json({
        success: true,
        data: student,
    });
});
// ❌ Delete Student
export const deleteStudent = asyncHandler(async (req, res) => {
    const id = typeof req.params.id === "string" ? req.params.id : null;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Invalid student id",
        });
    }
    const student = await deleteStudentService(id);
    res.json({
        success: true,
        message: "Student deleted successfully",
        data: student,
    });
});
//# sourceMappingURL=student.controller.js.map