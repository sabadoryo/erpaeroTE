import { Status } from "@prisma/client";

export default {
    title: {
        notEmpty: {
            errorMessage: "Title should be provided."
        }
    },
    status: {
        isIn: {
            options: [Object.keys(Status)],
            errorMessage: "Status should be one of: toDo, inProgress, done"
        },
    }
}